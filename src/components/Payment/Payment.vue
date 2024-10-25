<template>
  <div></div>
</template>

<script>
import apiClient from "@/api";

export function processPayment(reservationId, totalPrice, paymentMethod) {
  const { IMP } = window;
  IMP.init("imp18668427");

  IMP.request_pay(
    {
      pg: "html5_inicis", // 결제 서비스 제공사 (예: html5_inicis, kcp, kakao 등)
      pay_method: paymentMethod, // 선택한 결제 방법 (card 또는 vbank)
      merchant_uid: `ORD${new Date().getTime()}`, // 고유 주문 번호
      name: `EasyStay 결제`,
      amount: totalPrice,
      buyer_email: "bo9701@naver.com",
      buyer_name: "테스터",
      buyer_tel: "010-5182-6177",
      buyer_addr: "인천광역시 남동구 서창동",
      buyer_postcode: "07222",

      // 가상계좌를 선택한 경우, 입금 기한 및 필수 정보 추가
      vbank_due: paymentMethod === "vbank" ? getVbankDueDate() : undefined,
      bank: paymentMethod === "vbank" ? "우리은행" : undefined, // 은행 정보 추가 (예시)
      accountHolder: paymentMethod === "vbank" ? "테스터" : undefined, // 가상계좌 입금자명 추가 (예시)
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
            method: paymentMethod, // 선택한 결제 방법
            amount: totalPrice,
            paymentDate: new Date().toISOString(),
            completionStatus: "COMPLETE",
            // 가상계좌 추가 필드들
            depositDeadline: paymentMethod === "vbank" ? getVbankDueDate() : null,
            bank: paymentMethod === "vbank" ? "우리은행" : null,
            accountHolder: paymentMethod === "vbank" ? "테스터" : null,
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
            reservationStatus: "CANCELED", // 예약 상태를 CANCELED로 변경
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
