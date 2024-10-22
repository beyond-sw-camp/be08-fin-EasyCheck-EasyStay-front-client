<template>
  <div></div>
</template>

<script>
import apiClient from "@/api";

export function processPayment(reservationId, totalPrice) {
  const { IMP } = window;
  IMP.init("imp18668427");

  IMP.request_pay(
    {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `ORD${new Date().getTime()}`,
      name: `EasyStay`,
      amount: totalPrice,
      buyer_email: "bo9701@naver.com",
      buyer_name: "테스터",
      buyer_tel: "010-5182-6177",
      buyer_addr: "인천광역시 남동구 서창동",
      buyer_postcode: "07222",
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
            method: "CARD", // 결제 방법
            amount: totalPrice,
            paymentDate: new Date().toISOString(), // 결제 날짜
            completionStatus: "COMPLETE", // 완료 상태
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