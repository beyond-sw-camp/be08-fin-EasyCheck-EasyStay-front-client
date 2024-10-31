import { defineStore } from "pinia";
import apiClient from "@/api";

export const suggestionStore = defineStore("suggestionStore", {
  state: () => ({
    suggestions: [], // 제출된 제안 목록
    loading: false, // 로딩 상태
    error: null, // 오류 상태
  }),
  actions: {
    async submitSuggestion(payload) {
      // API 요청 처리 예시
      try {
        await apiClient.post("/suggestions", payload);
      } catch (error) {
        console.error("Error submitting suggestion:", error);
        throw error;
      }
    },
  },
  getters: {
    allSuggestions: (state) => state.suggestions,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
});
