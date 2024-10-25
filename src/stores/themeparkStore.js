import { defineStore } from "pinia";
import apiClient from "@/api";

export const useThemeParkStore = defineStore("themeparkStore", {
  state: () => ({
    themeParks: [],
    themePark: null,
    currentThemePark: null,
  }),

  getters: {
    allThemeParks: (state) => state.themeParks,
    currentThemeParkDetails: (state) => state.currentThemePark,
  },

  actions: {
    async fetchThemeParks(accommodationId) {
      try {
        const cachedThemeParks = localStorage.getItem(
          `themeParks_${accommodationId}`
        );
        if (cachedThemeParks) {
          this.themeParks = JSON.parse(cachedThemeParks);
          if (this.themeParks.length > 0) {
            this.currentThemePark = this.themeParks[0];
          }
        } else {
          const response = await apiClient.get(
            `/accommodations/${accommodationId}/parks`
          );
          this.themeParks = response.data.data;

          if (this.themeParks.length > 0) {
            this.currentThemePark = this.themeParks[0];
          } else {
            this.currentThemePark = null;
          }

          localStorage.setItem(
            `themeParks_${accommodationId}`,
            JSON.stringify(this.themeParks)
          );
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

    setCurrentThemeParkById(parkId) {
      const numericParkId = Number(parkId);
      const park = this.themeParks.find(
        (park) => Number(park.id) === numericParkId
      );

      if (park) {
        this.currentThemePark = park;
        localStorage.setItem(
          `themePark_${park.accommodationId}_${parkId}`,
          JSON.stringify(park)
        );
      } else {
        console.error(`Invalid theme park id: ${numericParkId}`);
      }
    },

    ensureCurrentThemePark(parkId) {
      if (!this.currentThemePark || this.currentThemePark.id !== parkId) {
        this.setCurrentThemeParkById(parkId);
      }
    },

    async fetchAndSetFirstThemePark(accommodationId) {
      await this.fetchThemeParks(accommodationId);

      if (this.themeParks.length > 0) {
        const firstParkId = this.themeParks[0].id;
        this.setCurrentThemeParkById(firstParkId);
      }
    },

    clearCache(accommodationId, parkId) {
      localStorage.removeItem(`themeParks_${accommodationId}`);
      localStorage.removeItem(`themePark_${accommodationId}_${parkId}`);
      this.themeParks = [];
      this.currentThemePark = null;
    },
  },
});
