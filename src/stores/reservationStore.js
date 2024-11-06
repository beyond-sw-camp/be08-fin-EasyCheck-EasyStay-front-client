import apiClient from "@/api";
import { defineStore } from "pinia";
import { userLoginStore } from "./loginStore";

const { IMP } = window;

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

// 상태 타입별로 그룹화
export const useReservationStore = defineStore("reservationStore", {
  state: () => ({
    // 숙박시설 관련 상태
    accommodation: null, // 현재 선택된 숙박시설
    accommodations: [], // 모든 숙박시설 목록

    // 날짜 관련 상태
    checkIn: null,
    checkOut: null,

    // 객실 관련 상태
    roomCount: 1,
    selectedRoom: null,
    availableRooms: [],

    // 투숙객 관련 상태
    adultCount: 0,
    childCount: 0,

    // UI 상태
    showReservationForm: false,
    showReservationInfo: false,
    showRoomSelectionGrid: false,

    // 예약/결제 관련 상태
    reservationResult: null,
    reservationStatus: null, // 'pending' | 'success' | 'error' | null
    paymentMethod: "vbank",
    isPaymentSuccess: false,
    isPaymentFailed: false,

    // 약관 동의 상태
    agreementChecked1: false,
    agreementChecked2: false,
    agreementChecked3: false,
  }),

  getters: {
    // 숙박시설 관련 getter
    currentAccommodationId: (state) => state.accommodation?.id,
    currentAccommodationName: (state) => state.accommodation?.name,
    accommodationTabs: (state) =>
      state.accommodations.map((acc) => ({
        accommodationId: acc.id,
        name: acc.name,
      })),

    // 날짜 관련 getter
    formattedCheckinDate: (state) => formatDate(state.checkIn),
    formattedCheckoutDate: (state) => formatDate(state.checkOut),
    stayDuration: (state) =>
      state.checkIn && state.checkOut
        ? Math.floor((state.checkOut - state.checkIn) / (1000 * 60 * 60 * 24))
        : 0,

    // 체크인 정보
    checkinInfo: (state) => ({
      date: state.checkIn?.getDate(),
      month: state.checkIn?.getMonth() + 1,
      dayKo: state.checkIn ? DAYS_KO[state.checkIn.getDay()] : null,
    }),

    // 체크아웃 정보
    checkoutInfo: (state) => ({
      date: state.checkOut?.getDate(),
      month: state.checkOut?.getMonth() + 1,
      dayKo: state.checkOut ? DAYS_KO[state.checkOut.getDay()] : null,
    }),

    // 가격 관련 getter
    totalPrice: (state) => {
      const price =
        state.selectedRoom?.currentSeasonPrice *
          state.roomCount *
          state.stayDuration || 0;

      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(price);
    },

    totalPriceNumber: (state) => {
      const basePrice =
        state.selectedRoom?.currentSeasonPrice *
          state.roomCount *
          state.stayDuration || 0;

      return basePrice * state.roomCount * state.stayDuration || 0;
    },

    // 기타 getter
    totalGuests: (state) => state.adultCount + state.childCount,
    allAgreementsChecked: (state) =>
      state.agreementChecked1 && state.agreementChecked2,
  },

  actions: {
    // 초기화 관련 액션
    initializeReservation(checkInDate = null, checkOutDate = null) {
      // 날짜 초기화
      if (!checkInDate && !checkOutDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        this.checkIn = today;
        this.checkOut = tomorrow;
      } else {
        this.checkIn = new Date(checkInDate);
        this.checkOut = new Date(checkOutDate);
      }

      // 기본값 초기화
      this.roomCount = 1;
      this.adultCount = 0;
      this.childCount = 0;
    },

    async initializeReservationWithQuery({
      accommodationId,
      checkInDate,
      checkOutDate,
    }) {
      try {
        if (accommodationId) {
          await this.fetchAccommodationById(accommodationId);
        } else {
          this.initCurrentAccommodation();
        }

        this.initializeReservation(checkInDate, checkOutDate);
      } catch (error) {
        console.error("예약 초기화 실패:", error);
        // 기본값으로 폴백
        this.initCurrentAccommodation();
        this.initializeReservation();
      }
    },

    decreaseRoomCount() {
      if (this.roomCount > 1) {
        this.roomCount -= 1;
      }
    },

    increaseRoomCount() {
      if (this.roomCount < 4) {
        this.roomCount += 1;
      }
    },

    updateDateRange({ checkIn, checkOut }) {
      this.checkIn = checkIn;
      this.checkOut = checkOut;

      // UI 상태 초기화
      this.setShowRoomSelectionGrid(false);
      this.resetReservationRoom();
    },

    // UI 상태 관리 액션
    setUIState({ showForm = false, showInfo = false, showGrid = false }) {
      this.showReservationForm = showForm;
      this.showReservationInfo = showInfo;
      this.showRoomSelectionGrid = showGrid;
    },

    // 객실 선택 관련 액션
    selectRoom(room) {
      this.selectedRoom = room;
      this.adultCount = room.standardOccupancy;
      this.setUIState({ showForm: true, showInfo: true });
    },

    // 날짜 관련 액션들
    setCheckinDate(date) {
      this.checkIn = new Date(date);
    },

    setCheckoutDate(date) {
      this.checkOut = new Date(date);
    },

    // ReservationCalendar에서 사용할 수 있도록 setShowRoomSelectionGrid 액션 추가
    setShowRoomSelectionGrid(show) {
      this.showRoomSelectionGrid = show;
    },

    // 객실 초기화를 위한 resetReservationRoom 액션 추가
    resetReservationRoom() {
      this.selectedRoom = null;
    },

    // 초기화 관련
    initCurrentAccommodation() {
      if (this.accommodations.length > 0) {
        this.accommodation = this.accommodations[0];
      }
    },

    // 인원 관리 액션
    updateGuestCount({ type, increment }) {
      const count = type === "adult" ? "adultCount" : "childCount";
      const currentTotal = this.totalGuests;
      const maxOccupancy = this.selectedRoom?.maxOccupancy || 0;

      if (increment) {
        if (currentTotal < maxOccupancy) {
          this[count]++;
        }
      } else {
        if (this[count] > (type === "adult" ? 1 : 0)) {
          this[count]--;
        }
      }
    },

    // API 호출 액션들
    async fetchAccommodationById(id) {
      try {
        const response = await apiClient.get(`/accommodations/${id}`);
        this.accommodation = response.data;
      } catch (error) {
        console.error("숙박시설 조회 실패:", error);
        this.accommodation = null;
      }
    },
    async fetchAccommodations() {
      try {
        const response = await apiClient.get("/accommodations");
        this.accommodations = response.data;
        if (response.data.length > 0) {
          this.accommodation = response.data[0];
        }
      } catch (error) {
        console.error("숙박시설 조회 실패:", error);
        this.accommodations = [];
      }
    },

    async fetchAvailableRooms() {
      if (!this.accommodation?.id || !this.checkIn || !this.checkOut) {
        return;
      }

      try {
        const response = await apiClient.get("/reservation-room/available", {
          params: {
            accommodationId: this.accommodation.id,
            checkinDate: this.formattedCheckinDate,
            checkoutDate: this.formattedCheckoutDate,
          },
        });
        this.availableRooms = response.data;
      } catch (error) {
        console.error("객실 조회 실패:", error);
        this.availableRooms = [];
      }
    },
    // 예약 생성 및 결제 관련 액션
    async createReservation(reservationForm) {
      if (!this.selectedRoom?.roomId) {
        throw new Error("객실이 선택되지 않았습니다.");
      }

      try {
        const reservationData = {
          roomId: this.selectedRoom.roomId,
          reservationDate: new Date().toISOString(),
          checkinDate: this.formattedCheckinDate,
          checkoutDate: this.formattedCheckoutDate,
          reservationStatus: "RESERVATION",
          totalPrice: this.totalPriceNumber,
          paymentStatus: "UNPAID",
          adultCount: this.adultCount,
          childCount: this.childCount,
          totalRoomCount: this.roomCount,
          ...reservationForm,
        };

        const response = await apiClient.post(
          "/reservation-room",
          reservationData
        );
        console.log("예약 성공");
        console.log(response.data);

        this.reservationResult = response.data;
        return response.data;
      } catch (error) {
        console.error("예약 생성 실패:", error);
        throw error;
      }
    },

    async processPayment(paymentMethod) {
      const userStore = userLoginStore();
      const userData = userStore.userInfo;

      const paymentConfig = this.getPaymentConfig(paymentMethod, userData);

      try {
        return await this.executePayment(paymentConfig);
      } catch (error) {
        console.error("결제 처리 실패:", error);
        await this.handlePaymentFailure();
        throw error;
      }
    },

    getPaymentConfig(method, userData) {
      const baseConfig = {
        pg: "html5_inicis",
        pay_method: method,
        merchant_uid: `ORD${new Date().getTime()}`,
        name: `EasyStay 결제`,
        amount: this.totalPriceNumber,
        buyer_email: userData?.email || "이메일 정보 없음",
        buyer_name: userData?.name || "이름 정보 없음",
        buyer_tel: userData?.phone || "전화번호 정보 없음",
        buyer_addr: userData?.addr || "주소 정보 없음",
        buyer_postcode: userData?.postcode || "우편번호 정보 없음",
      };

      if (method === "vbank") {
        return {
          ...baseConfig,
          vbank_due: this.getVbankDueDate(),
          bank: "우리은행",
          accountHolder: userData?.name || "이름 정보 없음",
        };
      }

      return baseConfig;
    },

    async executePayment(paymentConfig) {
      return new Promise((resolve, reject) => {
        IMP.init("imp18668427");

        IMP.request_pay(paymentConfig, async (response) => {
          if (response.success) {
            try {
              await this.handlePaymentSuccess(response, paymentConfig);
              resolve(true);
            } catch (error) {
              reject(error);
            }
          } else {
            await this.handlePaymentFailure();
            resolve(false);
          }
        });
      });
    },

    async handlePaymentSuccess(response, paymentConfig) {
      const paymentData = {
        impUid: response.imp_uid,
        reservationId: this.reservationResult.id,
        method: paymentConfig.pay_method,
        amount: this.totalPriceNumber,
        paymentDate: new Date().toISOString(),
        completionStatus: "COMPLETE",
        ...(this.paymentMethod === "vbank" && {
          depositDeadline: this.getVbankDueDate(),
          bank: "우리은행",
          accountHolder: userLoginStore().userInfo?.name || "이름 정보 없음",
        }),
      };

      await apiClient.post("/payment", paymentData);
      this.isPaymentSuccess = true;
      this.isPaymentFailed = false;
    },

    async handlePaymentFailure() {
      if (this.reservationResult?.id) {
        await apiClient.put(`/reservation-room/${this.reservationResult.id}`, {
          reservationStatus: "CANCELED",
        });
      }
      this.isPaymentSuccess = false;
      this.isPaymentFailed = true;
    },

    getVbankDueDate() {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      return dueDate.toISOString().slice(0, 19);
    },

    // 리셋 관련 액션들
    resetReservation() {
      this.selectedRoom = null;
      this.showReservationForm = false;
      this.showReservationInfo = false;
      this.showRoomSelectionGrid = false;
      this.adultCount = 0;
      this.childCount = 0;
      this.agreementChecked1 = false;
      this.agreementChecked2 = false;
      this.agreementChecked3 = false;
    },

    // 동의 관련 액션
    updateAgreements({
      agreement1 = null,
      agreement2 = null,
      agreement3 = null,
    }) {
      if (agreement1 !== null) this.agreementChecked1 = agreement1;
      if (agreement2 !== null) this.agreementChecked2 = agreement2;
      if (agreement3 !== null) this.agreementChecked3 = agreement3;
    },

    // 예약 취소
    async cancelReservation(id) {
      const reservationRoomUpdateRequest = {
        reservationStatus: "CANCELED",
      };

      try {
        await apiClient.put(
          `/reservation-room/${id}`,
          reservationRoomUpdateRequest
        );
        alert("예약이 취소되었습니다.");
        await this.fetchReservationRoomLists();
      } catch (error) {
        console.error("예약 취소 실패:", error);
        this.reservationError =
          error.response?.data || "예약 취소 중 오류 발생";
        alert(this.reservationError);
      }
    },

    async fetchAllReservationRoomLists() {
      let allReservations = [];
      let page = 0;
      let size = 10;
      let response;

      do {
        response = await apiClient.get(`/reservation-room`, {
          params: { page, size },
        });
        allReservations = [...allReservations, ...response.data];
        page++;
      } while (response.data.length === size); // 더 이상 데이터가 없을 때까지 반복

      this.reservations = allReservations;
    },
  },
});
