import { defineStore } from "pinia";
import apiClient from "@/api";

export const useThemeParkStore = defineStore("themeparkStore", {
  state: () => ({
    themeParks: [],
    currentThemePark: null,
    themeParkName: "",
  }),

  getters: {
    allThemeParks: (state) => state.themeParks,
    currentThemeParkDetails: (state) => state.currentThemePark,
  },

  actions: {
    async fetchThemeParks(accommodationId) {
      try {
        const response = await apiClient.get(
          `/accommodations/${accommodationId}/parks`
        );
        this.themeParks = response.data.data;
        if (this.themeParks.length > 0) {
          this.currentThemePark = this.themeParks[0];
          this.themeParkName = this.themeParks[0].name;
        }
      } catch (error) {
        console.error("Failed to fetch theme parks:", error);
      }
    },

    async fetchThemeParkById(accommodationId, parkId) {
      try {
        const response = await apiClient.get(
          `/accommodations/${accommodationId}/parks/${parkId}`
        );
        this.currentThemePark = response.data;
        this.themeParkName = response.data.name;
      } catch (error) {
        console.error(`Failed to fetch theme park with id ${parkId}:`, error);
      }
    },

    setCurrentThemeParkById(parkId) {
      const numericParkId = Number(parkId);

      const park = this.themeParks.find(
        (park) => Number(park.id) === numericParkId
      );

      if (park) {
        this.currentThemePark = park;
        this.themeParkName = park.name;
      } else {
        console.error(`Invalid theme park id: ${numericParkId}`);
      }
    },

    ensureCurrentThemePark(parkId) {
      if (!this.currentThemePark || this.currentThemePark.id !== parkId) {
        this.setCurrentThemeParkById(parkId);
      }
    },
  },
});
