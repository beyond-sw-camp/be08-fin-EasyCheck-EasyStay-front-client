import { defineStore } from "pinia";
import axios from "axios";

export const useNoticeStore = defineStore("notice", {
  state: () => ({
    notices: [],
    accommodations: [], // 리조트 정보를 저장할 배열
    loading: false,
    error: null,
  }),
  actions: {
    async fetchNotices(accommodationId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`/api/v1/notices-reply`, {
          params: { accommodation: accommodationId },
        });
        console.log("사업장 : ", response);
        this.notices = response.data; // API 응답 데이터를 notices에 저장
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchAccommodations() {
      this.loading = true;
      this.error = null;

      try {
        console.log("Fetching accommodations...");
        const response = await axios.get("/api/v1/accommodations"); // 리조트 목록 API 호출
        console.log("사업장 정보 : ", response);
        this.accommodations = response.data; // API 응답 데이터를 accommodations에 저장
      } catch (err) {
        this.error = err.message;
        console.log("Error response:", err.response);
      } finally {
        this.loading = false;
      }
    },
  },
});
