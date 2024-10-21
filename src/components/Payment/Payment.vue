<template>
  <!-- Payment.vue에는 별도의 UI가 없으므로 template는 비어있습니다. -->
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
      }
    }
  );
}
</script>