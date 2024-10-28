import { defineStore } from "pinia";
import apiClient from "@/api";

export const useTicketPaymentStore = defineStore("ticketPayment", {
  state: () => ({
    paymentStatus: null,
    paymentHistory: [],
    error: null,
  }),
  
  actions: {
    // 결제 처리
    async processPayment(orderId, paymentRequest) {
      try {
        const response = await apiClient.post(`/api/v1/tickets/payment/${orderId}`, paymentRequest);
        this.paymentStatus = response.data;
        return this.paymentStatus;
      } catch (error) {
        this.error = "결제 처리 중 오류가 발생했습니다.";
        console.error(error);
        throw error;
      }
    },

    // 결제 취소
    async cancelPayment(orderId) {
      try {
        const response = await apiClient.patch(`/api/v1/tickets/payment/${orderId}/cancel`);
        this.paymentStatus = response.data;
        return this.paymentStatus;
      } catch (error) {
        this.error = "결제 취소 중 오류가 발생했습니다.";
        console.error(error);
        throw error;
      }
    },

    // 결제 상태 조회
    async getPaymentStatus(orderId) {
      try {
        const response = await apiClient.get(`/api/v1/tickets/payment/${orderId}/status`);
        this.paymentStatus = response.data;
        return this.paymentStatus;
      } catch (error) {
        this.error = "결제 상태 조회 중 오류가 발생했습니다.";
        console.error(error);
        throw error;
      }
    },

    // 결제 내역 조회
    async getPaymentHistory() {
      try {
        const response = await apiClient.get("/api/v1/tickets/payment/history");
        this.paymentHistory = response.data;
        return this.paymentHistory;
      } catch (error) {
        this.error = "결제 내역 조회 중 오류가 발생했습니다.";
        console.error(error);
        throw error;
      }
    },
  },
});