import { defineStore } from "pinia";
import apiClient from "@/api";

export const useAccommodationStore = defineStore("accommodationStore", {
  state: () => ({
    accommodations: [],
    accommodation: null,
  }),

  getters: {
    allAccommodations: (state) => state.accommodations,
    accommodationById: (state) => state.accommodation,
  },

  actions: {
    // 시설 생성 API 호출
    async createAccommodation(formData) {
      try {
        await apiClient.post("/accommodations", formData);
      } catch (error) {
        console.error("Failed to create accommodation:", error);
      }
    },

    // 모든 시설 조회 API 호출
    async fetchAccommodations() {
      try {
        const response = await apiClient.get(`/accommodations`);
        this.accommodations = response.data;
      } catch (error) {
        console.error("Failed to fetch accommodations:", error);
      }
    },

    // 특정 시설 조회 API 호출
    async fetchAccommodationById(id) {
      try {
        const response = await apiClient.get(`/accommodations/${id}`);
        this.accommodation = response.data;
      } catch (error) {
        console.error(`Failed to fetch accommodation with id ${id}:`, error);
      }
    },

    // 시설 수정 API 호출
    async updateAccommodation(id, updateData) {
      try {
        await apiClient.put(`/accommodations/${id}`, updateData);
      } catch (error) {
        console.error(`Failed to update accommodation with id ${id}:`, error);
      }
    },

    // 시설 삭제 API 호출
    async deleteAccommodation(id) {
      try {
        await apiClient.delete(`/accommodations/${id}`);
      } catch (error) {
        console.error(`Failed to delete accommodation with id ${id}:`, error);
      }
    },
  },
});