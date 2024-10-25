import { defineStore } from "pinia";
import apiClient from "@/api";

export const useTicketOrderStore = defineStore("orderStore", {
  state: () => ({
    currentOrder: null,
    orders: [],
    loading: false,
    error: null,
  }),

  actions: {
    async createOrder(orderData) {
      this.loading = true;
      try {
        const response = await apiClient.post("/tickets/orders", orderData);
        this.currentOrder = response.data;
        this.loading = false;
        return response.data;
      } catch (error) {
        this.loading = false;
        this.error = error;
        console.error("주문 생성 실패:", error);
      }
    },

    async fetchOrderById(orderId) {
      this.loading = true;
      try {
        const response = await apiClient.get(`/tickets/orders/${orderId}`);
        this.currentOrder = response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
        console.error("주문 조회 실패:", error);
      }
    },

    async completeOrder(orderId) {
      this.loading = true;
      try {
        await apiClient.patch(`/tickets/orders/${orderId}/complete`);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
        console.error("주문 완료 업데이트 실패:", error);
      }
    },
  },
});
