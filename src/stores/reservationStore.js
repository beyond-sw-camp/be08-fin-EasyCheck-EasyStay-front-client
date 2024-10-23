import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservationStore", {
  state: () => ({
    checkIn: null,
    checkOut: null,
    roomCount: 1,
  }),

  getters: {
    allAccommodations: (state) => state.accommodations,
    accommodationById: (state) => state.accommodation,
  },

  actions: {
    setCheckIn(checkInDate) {
      this.checkIn = checkInDate;
    },
    setCheckOut(checkOutDate) {
      this.checkOut = checkOutDate;
    },
    setRoomCount(count) {
      this.roomCount = count;
    },
  },
});
