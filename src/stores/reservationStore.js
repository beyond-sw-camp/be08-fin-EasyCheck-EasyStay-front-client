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

    agreementChecked1: false,
    agreementChecked2: false,
    agreementChecked3: false,

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

    reservationResult: null,

    // 결제 관련
    paymentMehod: "vbank",
  }),

  getters: {
    allAgreementsChecked: (state) =>
      state.agreementChecked1 && state.agreementChecked2,
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

      const price = basePrice * state.roomCount * state.stayDuration || 0;

      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(price);
    },

    // 숫자만 있는 가격 (결제 API용)
    totalPriceNumber: (state) => {
      const basePrice =
        state.userInfo?.userRole === "CORP_USER"
          ? state.selectedRoom?.corpPrice
          : state.selectedRoom?.normalPrice;

      return basePrice * state.roomCount || 0;
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
    // 예약 동의여부
    setAgreementChecked1(value) {
      this.agreementChecked1 = value;
    },
    setAgreementChecked2(value) {
      this.agreementChecked2 = value;
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
      if (this.roomCount < 4) {
        this.roomCount += 1;
      }
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
    // 예약 API 호출
    async createReservation(form) {
      console.log(`예약 호출 roomId = ${form}`);

      try {
        const response = await apiClient.post("/reservation-room", {
          roomId: this.selectedRoom.roomId,
          reservationDate: new Date().toISOString(),
          checkinDate: this.formattedCheckinDate,
          checkoutDate: this.formattedCheckoutDate,
          reservationStatus: "RESERVATION",
          totalPrice: this.totalPriceNumber,
          paymentStatus: "UNPAID",
          ...form,
          adultCount: this.adultCount,
          childCount: this.childCount,
          totalRoomCount: this.roomCount,
        });
        this.reservationResult = response.data;
        console.log("예약 결과");
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
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
    // IMP 호출
    async callImpRequestPay(method) {
      return new Promise((resolve, reject) => {
        IMP.init("imp18668427");

        const userStore = userLoginStore();

        const userData = userStore.userInfo;

        IMP.request_pay(
          {
            pg: "html5_inicis", // 결제 서비스 제공사
            pay_method: method, // 선택한 결제 방법
            merchant_uid: `ORD${new Date().getTime()}`, // 고유 주문 번호
            name: `EasyStay 결제`,
            amount: this.totalPriceNumber,

            // 로그인한 사용자 정보로 업데이트된 결제 정보
            buyer_email: userData.email || "이메일 정보 없음",
            buyer_name: userData.name || "이름 정보 없음",
            buyer_tel: userData.phone || "전화번호 정보 없음",
            buyer_addr: userData.addr || "주소 정보 없음",
            buyer_postcode: userData.postcode || "우편번호 정보 없음",

            // 가상계좌 선택 시 추가 정보
            vbank_due:
              this.paymentMethod === "vbank"
                ? this.getVbankDueDate()
                : undefined,
            bank: method === "vbank" ? "우리은행" : undefined,
            accountHolder:
              method === "vbank"
                ? userData.name || "이름 정보 없음"
                : undefined,
          },
          async (rsp) => {
            if (rsp.success) {
              alert("결제 성공!");
              console.log("결제 성공:", rsp);

              // 결제 성공 후 결제 내역을 서버에 저장
              const payRequest = {
                impUid: rsp.imp_uid,
                reservationId: this.reservationResult.id,
                method: this.paymentMehod,
                amount: this.totalPriceNumber,
                paymentDate: new Date().toISOString(),
                completionStatus: "COMPLETE",
                depositDeadline:
                  method === "vbank" ? this.getVbankDueDate() : null,
                bank: method === "vbank" ? "우리은행" : null,
                accountHolder:
                  this.paymentMethod === "vbank"
                    ? userData.name || "이름 정보 없음"
                    : null,
              };

              try {
                await apiClient.post("/payment", payRequest);
                alert("결제 내역이 데이터베이스에 저장되었습니다.");
                this.isPaymentSuccess = true;
                this.isPaymentFailed = false;
                resolve(true);
                return true;
              } catch (error) {
                console.error("결제 내역 저장 실패:", error);
                alert("결제 내역을 저장하는 중 오류가 발생했습니다.");
                this.isPaymentSuccess = false;
                this.isPaymentFailed = true;
                resolve(false);
              }
            } else {
              alert("결제 실패: " + rsp.error_msg);
              console.log("결제 실패:", rsp);

              // 결제가 실패한 경우 예약 상태를 CANCELED로 업데이트
              try {
                await apiClient.put(
                  `/reservation-room/${this.reservationResult?.id}`,
                  {
                    reservationStatus: "CANCELED",
                  }
                );
                alert("예약 상태가 CANCELED로 업데이트되었습니다.");
                resolve(false);
              } catch (error) {
                console.error("예약 상태 업데이트 실패:", error);
                reject(error);
                alert("예약 상태를 업데이트하는 중 오류가 발생했습니다.");
              }
              this.isPaymentSuccess = false;
              this.isPaymentFailed = true;
            }
          }
        );
      });
    },
    getVbankDueDate() {
      const today = new Date();
      const dueDate = new Date(today.setDate(today.getDate() + 7)); // 7일 후로 설정

      // ISO-8601 형식으로 변환 (예: 2024-10-31T05:43:00)
      const isoDate = dueDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS" 형식으로 자름
      console.log("vbank_due:", isoDate); // 로그로 확인
      return isoDate;
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
