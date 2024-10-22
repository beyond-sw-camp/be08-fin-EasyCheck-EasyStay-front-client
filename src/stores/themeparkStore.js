import { defineStore } from "pinia";
import apiClient from "@/api";

export const useThemeParkStore = defineStore("themeparkStore", {
  state: () => ({
    themeParks: [],
    currentThemePark: null,
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
      } catch (error) {
        console.error(`Failed to fetch theme park with id ${parkId}:`, error);
      }
    },

    setCurrentThemeParkById(parkId) {
      const park = this.themeParks.find((park) => park.id === parkId);
      if (park) {
        this.currentThemePark = park;
      } else {
        console.error("Invalid theme park id");
      }
    },
  },
});
