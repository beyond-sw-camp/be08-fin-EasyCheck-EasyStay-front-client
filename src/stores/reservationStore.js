import apiClient from "@/api";
import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservationStore", {
  state: () => ({
    roomCount: 1,
    roomId: null,
    checkIn: null,
    checkOut: null,
    accommodationId: null,
    accommodationName: "",

    showReservationForm: false,
    showReservationInfo: false,
    showRoomSelectionGrid: false,

    accommodationList: [],
    availableRoomList: [],
  }),

  getters: {
    accommodationTabs: (state) =>
      state.accommodationList.map((accommodation) => ({
        accommodationId: accommodation.id,
        name: accommodation.name,
      })),
    checkinDate: (state) => state.checkIn?.getDate(),
    checkinMonth: (state) => state.checkIn?.getMonth(),
    checkinDayKo: (state) => {
      const daysKo = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ];
      return daysKo[state.checkIn?.getDay()];
    },
    checkoutDate: (state) => state.checkOut?.getDate(),
    checkoutMonth: (state) => state.checkOut?.getMonth(),
    checkoutDayKo: (state) => {
      const daysKo = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ];
      return daysKo[state.checkOut?.getDay()];
    },
    stayDuration: (state) =>
      Math.floor((state.checkOut - state.checkIn) / (1000 * 60 * 60 * 24)),
  },

  actions: {
    setShowRoomSelectionGrid(isOpen) {
      this.showRoomSelectionGrid = isOpen;
    },
    setAccommodationId(accommodationId) {
      this.accommodationId = accommodationId;
    },
    setAccommodationName(name) {
      this.accommodationName = name;
    },
    setRoomId(roomId) {
      this.roomId = roomId;
    },
    setCheckinDate(checkinDate) {
      this.checkIn = checkinDate;
    },
    setCheckoutDate(checkOutDate) {
      this.checkOut = checkOutDate;
    },
    setRoomCount(count) {
      this.roomCount = count;
    },
    resetAccommodationList() {
      this.accommodationList = [];
    },
    increaseRoomCount() {
      this.roomCount += 1;
    },
    decreaseRoomCount() {
      if (this.roomCount > 1) {
        this.roomCount -= 1;
      }
    },
    initCheckInCheckOut() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      this.checkIn = today;
      this.checkOut = tomorrow;
    },
    async fetchAndInitAccommodationNavs() {
      try {
        const response = await apiClient.get("/accommodations");
        this.accommodationList = response.data;
        this.setAccommodationId(response.data[0].id);
        this.setAccommodationName(response.data[0].name);
      } catch (err) {
        console.log(err);
        this.accommodationList = [];
      }
    },

    async fetchReservationAvailableRooms() {
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      try {
        const response = await apiClient.get("/reservation-room/available", {
          params: {
            accommodationId: this.accommodationId,
            checkinDate: formatDate(this.checkIn),
            checkoutDate: formatDate(this.checkOut),
          },
        });

        this.availableRoomList = response.data;
      } catch (err) {
        this.availableRoomList = [];
        console.log(err);
      }
    },
  },
});
