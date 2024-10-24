import { defineStore } from "pinia";
import apiClient from "@/api";

export const useRoomStore = defineStore("roomStore", {
  state: () => ({
    rooms: [],
    room: null,
  }),

  getters: {
    compactRoomList: (state) =>
      state.rooms.map((room) => ({
        roomId: room.roomId,
        title: room.typeName,
        imgUrl: room.images[0] || null,
      })),
  },

  actions: {
    // 숙박시설에 존재하는 객실 모두 불러오기
    async fetchAccommodationRooms(accommodationId) {
      try {
        console.log(
          `[roomStore] fetchAccommodationRooms accommodationId = ${accommodationId}`
        );

        const response = await apiClient.get(`/rooms`, {
          params: {
            accommodationId,
          },
        });
        console.log(response);

        this.rooms = response.data;
      } catch (error) {
        this.rooms = [];
        console.log(error);
        console.error("Failed to fetch accommodations:", error);
      }
    },

    // 특정 시설 조회 API 호출
    async fetchRoomById(roomId) {
      try {
        const response = await apiClient.get(`/rooms/${roomId}`);
        this.room = response.data;
      } catch (error) {
        this.room = null;
        console.log(error);
      }
    },
  },
});
