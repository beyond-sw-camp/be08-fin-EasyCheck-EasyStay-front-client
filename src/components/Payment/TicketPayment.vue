<template>
  <div></div>
</template>

<script>
import apiClient from "@/api";

export async function processTicketPayment(orderId, totalPrice, buyerDetails) {
  const { IMP } = window;
  IMP.init("imp18668427"); // PortOne 가맹점 식별코드로 초기화

  // PortOne 결제 요청
  IMP.request_pay(
    {
      pg: "html5_inicis",
      pay_method: "card", // 결제 방법
      merchant_uid: `ORD${new Date().getTime()}`, // 주문 번호
      name: "티켓 구매 결제",
      amount: totalPrice,
      buyer_email: buyerDetails.email,
      buyer_name: buyerDetails.name,
      buyer_tel: buyerDetails.phone,
      buyer_addr: buyerDetails.address,
      buyer_postcode: buyerDetails.postcode,
    },
    async (rsp) => {
      if (rsp.success) {
        alert("결제가 성공적으로 완료되었습니다.");
        console.log("결제 성공:", rsp);

        // 결제 성공 시 결제 내역 서버에 저장
        try {
          await apiClient.post("/api/v1/tickets/payment", {
            impUid: rsp.imp_uid,
            orderId: orderId,
            amount: totalPrice,
            paymentMethod: "card",
            buyerDetails: buyerDetails,
            completionStatus: "COMPLETE",
          });
          alert("결제 내역이 데이터베이스에 저장되었습니다.");
        } catch (error) {
          console.error("결제 내역 저장 오류:", error);
          alert("결제 내역을 저장하는 중 오류가 발생했습니다.");
        }
      } else {
        alert("결제가 실패했습니다: " + rsp.error_msg);
        console.error("결제 실패:", rsp);
      }
    }
  );
}

export async function refundPayment(orderId, impUid) {

  if (!impUid) {
    alert("impUid가 누락되었습니다. 결제 정보를 확인해주세요.");
    return;
  }

  try {
    // 서버에 환불 요청
    const response = await apiClient.patch(
      `/tickets/payment/${orderId}`,
      {
        impUid: impUid,
        reason: "고객 요청으로 인한 환불",
      }
    );

    if (response.status === 200 || response.status === 204) {
      alert("환불이 완료되었습니다.");
      console.log("환불 성공:", response);
    } else {
      throw new Error(response.data.error_msg || "환불 실패");
    }
  } catch (error) {
    alert(`환불 처리 중 오류가 발생했습니다: ${error.message}`);
    if (error.response && error.response.data.errors) {
      const errorMessage = error.response.data.errors[0].errorMessage;
      alert(`환불 실패: ${errorMessage}`);
    }
  }
}
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>