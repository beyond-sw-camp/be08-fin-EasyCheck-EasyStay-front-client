import { defineStore } from "pinia";

export const useHeaderStore = defineStore("headerStore", {
  state: () => ({
    isMenuVisible: false, // 메뉴 펼침/접힘 상태
    headerHeight: 0, // 헤더 높이 (필요한 경우)
  }),

  getters: {
    // 메뉴 상태 getter
    getMenuState: (state) => state.isMenuVisible,

    // 컨텐츠 영역에 적용할 padding 계산
    getContentPadding: (state) => {
      return state.isMenuVisible ? "280px" : "0px"; // 메뉴가 펼쳐졌을 때의 여백
    },
  },

  actions: {
    // 메뉴 토글
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },

    // 메뉴 열기
    openMenu() {
      this.isMenuVisible = true;
    },

    // 메뉴 닫기
    closeMenu() {
      this.isMenuVisible = false;
    },

    // 헤더 높이 설정 (필요한 경우)
    setHeaderHeight(height) {
      this.headerHeight = height;
    },
  },
});
