import { defineStore } from "pinia";
import apiClient from "@/api";

export const useThemeParkStore = defineStore("themeparkStore", {
  state: () => ({
    themeParks: [],
    themePark: null,
  }),

  getters: {
    allThemeParks: (state) => state.themeParks,
    currentThemeParkDetails: (state) => state.currentThemePark,
    themeParkId: (state) => state.themePark.id,
  },

  actions: {
    async fetchThemeParks(accommodationId) {
      try {
        const response = await apiClient.get(
          `/accommodations/${accommodationId}/parks`
        );
        this.themeParks = response.data.data;

        if (this.themeParks.length > 0) {
          this.themePark = this.themeParks[0];
        } else {
          this.themePark = null;
        }
      } catch (error) {
        console.error("Failed to fetch theme parks:", error);
      }
    },

    async fetchThemeParkById(accommodationId, parkId) {
      try {
        // Debug 로그 추가
        console.log(
          "fetchThemeParkById 호출: accommodationId =",
          accommodationId,
          "parkId =",
          parkId
        );

        if (!accommodationId || !parkId) {
          throw new Error(
            `Invalid parameters: accommodationId = ${accommodationId}, parkId = ${parkId}`
          );
        }

        console.log(
          "API 호출: /accommodations/",
          accommodationId,
          "/parks/",
          parkId
        );

        const response = await apiClient.get(
          `/accommodations/${accommodationId}/parks/${parkId}`
        );
        console.log(response.data);

        this.themePark = response.data.data;
      } catch (error) {
        console.error(
          `Failed to fetch theme park with accommodationId ${accommodationId} and parkId ${parkId}:`,
          error
        );
      }
    },
  },
});
