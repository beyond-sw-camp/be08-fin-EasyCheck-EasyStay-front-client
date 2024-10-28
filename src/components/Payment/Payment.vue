<template>
  <div></div>
</template>

<script>
import apiClient from "@/api";
import { userLoginStore } from "@/stores/loginStore"; // loginStore의 경로에 맞게 수정

export async function processPayment(reservationId, totalPrice, paymentMethod) {
  const { IMP } = window;
  IMP.init("imp18668427");

  const userStore = userLoginStore(); // Pinia store 인스턴스 가져오기

  // 로그인한 사용자 정보 가져오기
  await userStore.getUserData(); // 필요한 경우 로그인한 사용자 정보를 새로 가져오기

  const userData = userStore.userData; // 로그인한 사용자 정보

  IMP.request_pay(
    {
      pg: "html5_inicis", // 결제 서비스 제공사
      pay_method: paymentMethod, // 선택한 결제 방법
      merchant_uid: `ORD${new Date().getTime()}`, // 고유 주문 번호
      name: `EasyStay 결제`,
      amount: totalPrice,

      // 로그인한 사용자 정보로 업데이트된 결제 정보
      buyer_email: userData.email || "이메일 정보 없음",
      buyer_name: userData.name || "이름 정보 없음",
      buyer_tel: userData.phone || "전화번호 정보 없음",
      buyer_addr: userData.addr || "주소 정보 없음",
      buyer_postcode: userData.postcode || "우편번호 정보 없음",

      // 가상계좌 선택 시 추가 정보
      vbank_due: paymentMethod === "vbank" ? getVbankDueDate() : undefined,
      bank: paymentMethod === "vbank" ? "우리은행" : undefined,
      accountHolder: paymentMethod === "vbank" ? userData.name || "이름 정보 없음" : undefined,
    },
    async (rsp) => {
      if (rsp.success) {
        alert("결제 성공!");
        console.log("결제 성공:", rsp);

        // 결제 성공 후 결제 내역을 서버에 저장
        try {
          await apiClient.post("/payment", {
            impUid: rsp.imp_uid,
            reservationId: reservationId,
            method: paymentMethod,
            amount: totalPrice,
            paymentDate: new Date().toISOString(),
            completionStatus: "COMPLETE",
            depositDeadline: paymentMethod === "vbank" ? getVbankDueDate() : null,
            bank: paymentMethod === "vbank" ? "우리은행" : null,
            accountHolder: paymentMethod === "vbank" ? userData.name || "이름 정보 없음" : null,
          });
          alert("결제 내역이 데이터베이스에 저장되었습니다.");
        } catch (error) {
          console.error("결제 내역 저장 실패:", error);
          alert("결제 내역을 저장하는 중 오류가 발생했습니다.");
        }
      } else {
        alert("결제 실패: " + rsp.error_msg);
        console.log("결제 실패:", rsp);

        // 결제가 실패한 경우 예약 상태를 CANCELED로 업데이트
        try {
          await apiClient.put(`/reservation-room/${reservationId}`, {
            reservationStatus: "CANCELED",
          });
          alert("예약 상태가 CANCELED로 업데이트되었습니다.");
        } catch (error) {
          console.error("예약 상태 업데이트 실패:", error);
          alert("예약 상태를 업데이트하는 중 오류가 발생했습니다.");
        }
      }
    }
  );
}

// 가상계좌 입금 기한 설정 함수
function getVbankDueDate() {
  const today = new Date();
  const dueDate = new Date(today.setDate(today.getDate() + 7)); // 7일 후로 설정

  // ISO-8601 형식으로 변환 (예: 2024-10-31T05:43:00)
  const isoDate = dueDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS" 형식으로 자름
  console.log("vbank_due:", isoDate); // 로그로 확인
  return isoDate;
}

export async function refundPayment(paymentId, impUid) {

  if (!impUid) {
    alert("impUid가 누락되었습니다. 결제 정보를 확인해주세요.");
    return;
  }

  try {
    // 서버에 환불 요청
    const response = await apiClient.put(`/payment/${paymentId}`, {
      impUid: impUid, // I'mport 결제 ID (필수)
      reason: "고객 요청으로 인한 환불", // 환불 사유
    });

    if (response.status === 200 || response.status === 204) {
      alert("환불이 완료되었습니다.");
      console.log("환불 성공:", response);
    } else {
      throw new Error(response.data.error_msg || "환불 실패");
    }
  } catch (error) {
    alert(`환불 처리 중 오류가 발생했습니다: ${error.message}`);
    console.error("환불 실패:", error);
  }
}
</script>
