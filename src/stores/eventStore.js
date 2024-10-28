import { defineStore } from "pinia";
import apiClient from "@/api";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    events: [],
    event: null,
  }),

  getters: {
    allEvents: (state) => state.events,
    eventById: (state) => state.event,
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
    // 이벤트 생성 API 호출
    async createEvent(eventCreateRequest, imageFiles) {
      const formData = new FormData();
      formData.append("description", JSON.stringify(eventCreateRequest));

      imageFiles.forEach((file, index) => {
        formData.append(`Image`, file);
      });

      try {
        const response = await apiClient.post("/events", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Failed to create event:", error);
      }
    },

    // 모든 이벤트 조회 API 호출
    async fetchEvents(accommodationId = null) {
      let queryParams = accommodationId
        ? `?accommodationId=${accommodationId}`
        : "";
      try {
        const response = await apiClient.get(`/events${queryParams}`);
        this.events = response.data;
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    },

    // 이벤트 수정 API 호출
    async updateEvent(id, eventUpdateRequest) {
      try {
        await apiClient.patch(`/events/${id}`, eventUpdateRequest);
      } catch (error) {
        console.error(`Failed to update event with id ${id}:`, error);
      }
    },

    // 이벤트 이미지 수정 API 호출
    async updateEventImage(imageId, newImageFile) {
      const formData = new FormData();
      formData.append("newImageFile", newImageFile);

      try {
        await apiClient.patch(`/events/images/${imageId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(
          `Failed to update event image with id ${imageId}:`,
          error
        );
      }
    },

    // 이벤트 삭제 API 호출
    async deleteEvent(id) {
      try {
        await apiClient.delete(`/events/${id}`);
      } catch (error) {
        console.error(`Failed to delete event with id ${id}:`, error);
      }
    },
  },
});
