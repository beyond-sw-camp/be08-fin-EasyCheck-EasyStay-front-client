import { defineStore } from "pinia";
// 1번
import axios from "axios";

export const useNoticeStore = defineStore("notice", {
  state: () => ({
    notices: [],
    accommodations: [], // 리조트 정보를 저장할 배열
    loading: false,
    error: null,

    query: {
      branch: null,
      content: null,
    },
  }),
  getters: {
    filteredNotices: (state) => {
      return (
        state.notices.filter((notice) => {
          // 지점(branch) 조건 체크 - 정확히 일치
          const branchMatch =
            !state.query.branch ||
            notice.accommodationName === state.query.branch;

          // title 또는 content 조건 체크 (둘 중 하나라도 일치하면 OK)
          const searchMatch =
            !state.query.content ||
            (state.query.content &&
              notice.title.includes(state.query.content)) ||
            (state.query.content &&
              notice.content.includes(state.query.content));

          // branch 조건과 (title OR content) 조건을 모두 만족해야 함
          return branchMatch && searchMatch;
        }) || []
      );
    },
  },
  actions: {
    setQueryBranch(branch) {
      this.query.branch = branch;
    },
    setQueryContent(content) {
      this.query.content = content;
    },
    async fetchNotices() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`/api/v1/notices-reply`);
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
