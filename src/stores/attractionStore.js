import { defineStore } from "pinia";
import apiClient from "@/api";

export const useAttractionStore = defineStore("attractionStore", {
  state: () => ({
    attractions: [],
  }),
  actions: {
    async fetchAttractions(themeParkId) {
      try {
        const response = await apiClient.get(
          `/parks/${themeParkId}/attractions`
        );
        this.attractions = response.data.data;
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
      }
    },
  },
});
