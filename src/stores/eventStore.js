import { defineStore } from "pinia";
import apiClient from "@/api";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    events: [],
    event: null,
  }),

  getters: {
    compactEventList: (state) =>
      state.events.map((event) => ({
        eventId: event.eventId,
        imgUrl: event.images[0] || null,
      })),
  },

  actions: {
    // 숙박시설에 존재하는 객실 모두 불러오기
    async fetchAccommodationEvents(accommodationId) {
      try {
        console.log(
          `[eventStore] fetchAccommodationEvents accommodationId = ${accommodationId}`
        );

        const response = await apiClient.get(`/events`, {
          params: {
            accommodationId,
          },
        });
        console.log(response);

        this.events = response.data;
      } catch (error) {
        this.events = [];
        console.log(error);
        console.error("Failed to fetch accommodations:", error);
      }
    },

    // 특정 시설 조회 API 호출
    async fetchEventById(eventId) {
      try {
        const response = await apiClient.get(`/events/${eventId}`);
        this.event = response.data;
      } catch (error) {
        this.event = null;
        console.log(error);
      }
    },
  },
});
