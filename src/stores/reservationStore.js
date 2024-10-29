import apiClient from "@/api";
import { defineStore } from "pinia";

// 상수 분리
const DAYS_KO = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

// 유틸리티 함수 분리
const formatDate = (date) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useReservationStore = defineStore("reservationStore", {
  state: () => ({
    roomCount: 1,
    roomId: null,
    checkIn: null,
    checkOut: null,
    accommodationId: null,
    accommodationName: "",
    adultCount: 0,
    childCount: 0,

    // 예약 하기위한 폼 토글
    showReservationForm: false,
    // 예약 요약 토글
    showReservationInfo: false,
    // 예약 가능 객실 토글
    showRoomSelectionGrid: false,
    // 숙박시설 리스트
    accommodationList: [],
    // 체크인 체크아웃 날짜에 예약 가능한 방 정보
    availableRoomList: [],

    // 모든 예약 내역 조회하기 
    reservations: [],

    // 객실 예약시 선택한 방 정보
    selectedRoom: null,

    // 예약 관련 상태 추가
    reservationStatus: null, // 'pending' | 'success' | 'error' | null
    reservationError: null,
    currentReservation: null,
  }),

  getters: {
    accommodationTabs: (state) =>
      state.accommodationList.map((accommodation) => ({
        accommodationId: accommodation.id,
        name: accommodation.name,
      })),

    totalPrice: (state) => {
      const basePrice =
        state.userInfo?.userRole === "CORP_USER"
          ? state.selectedRoom?.corpPrice
          : state.selectedRoom?.normalPrice;

      const price = basePrice * state.roomCount || 0;

      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(price);
    },

    // 날짜 포맷팅 getter 통합
    formattedCheckinDate: (state) => formatDate(state.checkIn),
    formattedCheckoutDate: (state) => formatDate(state.checkOut),

    // 체크인 관련 getter 통합
    checkinInfo: (state) => ({
      date: state.checkIn?.getDate(),
      month: state.checkIn?.getMonth(),
      dayKo: state.checkIn ? DAYS_KO[state.checkIn.getDay()] : null,
    }),

    // 체크아웃 관련 getter 통합
    checkoutInfo: (state) => ({
      date: state.checkOut?.getDate(),
      month: state.checkOut?.getMonth(),
      dayKo: state.checkOut ? DAYS_KO[state.checkOut.getDay()] : null,
    }),

    // 기존 getter들을 새로운 통합 getter를 사용하도록 수정 (하위 호환성 유지)
    checkinDate: (state) => state.checkIn?.getDate(),
    checkinMonth: (state) => state.checkIn?.getMonth(),
    checkinDayKo: (state) =>
      state.checkIn ? DAYS_KO[state.checkIn.getDay()] : null,
    checkoutDate: (state) => state.checkOut?.getDate(),
    checkoutMonth: (state) => state.checkOut?.getMonth(),
    checkoutDayKo: (state) =>
      state.checkOut ? DAYS_KO[state.checkOut.getDay()] : null,

    stayDuration: (state) =>
      Math.floor((state.checkOut - state.checkIn) / (1000 * 60 * 60 * 24)),
    // 전체 투숙 인원
    totalGuests: (state) => state.adultCount + state.childCount,
  },
  actions: {
    openReservationForm() {
      this.showReservationForm = true;
    },
    closeReservationForm() {
      this.showReservationForm = false;
    },
    selectReservationRoom(room) {
      this.selectedRoom = room;
      this.adultCount = room.standardOccupancy;
    },
    resetReservationRoom() {
      this.selectedRoom = null;
    },
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

    resetRoomSelection() {
      this.showRoomSelectionGrid = false;
      this.availableRoomList = [];
    },

    resetReservationForm() {
      this.showReservationForm = false;
      this.adultCount = 0;
      this.childCount = 0;
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

    async fetchReservationRoomLists() {
      try {
        const response = await apiClient.get("/reservation-room", {
          params: {
            page: 0,
            size: 5,
          },
        });

        this.reservations = response.data;
      } catch (error) {
        console.error("예약 내역을 가져오는 중 오류 발생:", error);
        alert("예약 내역을 불러오는 데 실패했습니다.");
      }
    },
  },
});
