import { defineStore } from "pinia";
import apiClient from "@/api";

export const useRoomStore = defineStore("roomStore", {
  state: () => ({
    rooms: [],
    roomTypes: [],
    roomRates: [],
    room: null,
    roomType: null,

    currentRoomId: null,
  }),

  getters: {
    compactRoomTypeList: (state) =>
      state.roomTypes.map((roomType) => ({
        roomId: roomType.roomTypeId,
        title: roomType.name,
        imgUrl: roomType.thumbnailUrl,
      })),
    // RoomTypeNav에서 선택한 방의 roomId
    currentRoom: (state) =>
      state.rooms.find((room) => room.roomId === state.currentRoomId),
    // RoomTypeNavs에서 사용하는 tab
    roomTabs: (state) =>
      state.rooms.map((room) => ({ label: room.type, roomId: room.roomId })),
    // RoomImage 썸네일
    thumbnailUrls: (state) => {
      if (state.rooms.length !== 0) {
        return state.rooms.find((room) => room.roomId === state.currentRoomId)
          ?.images;
      }
    },
  },

  actions: {
    // rooms의 첫번째 roomId로 초기화
    initDefaultRoomId() {
      this.currentRoomId = this.rooms[0]?.roomId;
    },
    // 탭에서 방 선택
    selectCurrentRoom(roomId) {
      this.currentRoomId = roomId;
    },
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

    async fetchRoomTypesByAccommodationId(accommodationId) {
      try {
        const response = await apiClient.get(`/roomtypes`, {
          params: {
            accommodationId,
          },
        });
        this.roomTypes = response.data;
      } catch (error) {
        this.roomTypes = null;
        console.log(error);
      }
    },

    async fetchRoomTypeById(roomTypeId) {
      try {
        const response = await apiClient.get(`/roomtypes/${roomTypeId}`);
        this.roomType = response.data;
      } catch (error) {
        this.roomTypes = null;
        console.log(error);
      }
    },

    async fetchRoomsByRoomTypeId(roomTypeId) {
      try {
        const response = await apiClient.get(`/rooms`, {
          params: {
            roomTypeId,
          },
        });
        this.rooms = response.data;
      } catch (error) {
        this.rooms = null;
        console.log(error);
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

    // 객실 가격 조회 API 호출
    async fetchRoomRates(roomId, seasonStartDate) {
      try {
        const response = await apiClient.get(`/roomrates`, {
          params: {
            roomId,
            startDate: seasonStartDate,
          },
        });
        this.roomRates = response.data;
      } catch (error) {
        this.roomRates = [];
        console.log(error);
      }
    },
  },
});
