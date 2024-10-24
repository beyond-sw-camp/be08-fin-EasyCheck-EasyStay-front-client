import { defineStore } from "pinia";
import apiClient from "@/api";
import { useTicketOrderStore } from "@/stores/ticketOrderStore";

export const useTicketPaymentStore = defineStore("paymentStore", {
  state: () => ({
    currentPayment: null,
    paymentHistory: [],
    loading: false,
    error: null,
  }),

  actions: {
    async processPayment(orderId, totalPrice) {
      this.loading = true;
      const { IMP } = window;
      IMP.init("imp18668427");

      IMP.request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: `ORD${new Date().getTime()}`,
          name: "EasyStay",
          amount: totalPrice,
          buyer_email: "example@example.com",
          buyer_name: "테스터",
          buyer_tel: "010-1234-5678",
          buyer_addr: "서울특별시 강남구",
          buyer_postcode: "12345",
        },
        async (rsp) => {
          if (rsp.success) {
            try {
              const response = await apiClient.post(
                `/api/v1/tickets/payment/${orderId}`,
                {
                  impUid: rsp.imp_uid,
                  method: "CARD",
                  amount: totalPrice,
                }
              );

              this.currentPayment = response.data;

              const orderStore = useTicketOrderStore();
              await orderStore.completeOrder(orderId);

              alert("결제 성공!");
              this.loading = false;

              return true;
            } catch (error) {
              this.loading = false;
              this.error = error;
              console.error("결제 정보 저장 오류:", error);
              alert("결제 정보 저장 중 오류가 발생했습니다.");
            }
          } else {
            this.loading = false;
            alert("결제 실패: " + rsp.error_msg);
          }
        }
      );
    },

    async fetchUserPaymentHistory() {
      this.loading = true;
      try {
        const response = await apiClient.get("/api/v1/tickets/payment/history");
        this.paymentHistory = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
        console.error("결제 내역 조회 실패:", error);
      }
    },
  },
});
