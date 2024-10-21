import { defineStore } from "pinia";
import apiClient from "@/api";

export const usePaymentStore = defineStore("paymentStore", {
  state: () => ({
    payments: [], // 결제 내역 리스트
    payment: null, // 특정 결제 내역
    loading: false, // 로딩 상태
    error: null, // 에러 상태
  }),
  actions: {
    // 결제 처리 함수
    async processPayment(paymentCreateRequest) {
      this.loading = true;
      try {
        await apiClient.post("/payment", paymentCreateRequest);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
        console.error("결제 처리 실패:", error);
      }
    },

    // 결제 내역 리스트를 가져오는 함수
    async fetchAllPayments(page = 0, size = 10) {
      this.loading = true;
      try {
        const response = await apiClient.get("/payment", {
          params: { page, size },
        });
        this.payments = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
        console.error("결제 리스트 조회 실패:", error);
      }
    },

    // 특정 결제 내역을 가져오는 함수
    async fetchPaymentById(id) {
      this.loading = true;
      try {
        const response = await apiClient.get(`/payment/${id}`);
        this.payment = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
        console.error("결제 내역 조회 실패:", error);
      }
    },

    // 결제 취소 함수
    async cancelPayment(id, paymentUpdateRequest) {
      this.loading = true;
      try {
        await apiClient.put(`/payment/${id}`, paymentUpdateRequest);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
        console.error("결제 취소 실패:", error);
      }
    },
  },
});