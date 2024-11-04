import { defineStore } from "pinia";
import apiClient from "@/api";
import { userLoginStore } from "@/stores/loginStore";

export const mypageStore = defineStore("mypageStore", {
  state: () => ({
    userData: {
      name: "",
      email: "",
      id: "",
    },

    changePW: {
      email: "",
      oldPassword: "",
      newPassword: "",
    },

    // 사업장 정보를 담을 배열
    accommodations: [],
    branchQuery: "", // 선택된 지점

    isLoggedIn: false,
  }),

  actions: {
    // 로그인 상태
    async setLoginStatus(status) {
      this.isLoggedIn = status;
    },

    // 비밀번호 변경
    async changePassword(oldPassword, newPassword) {
      const loginStore = userLoginStore();
      await loginStore.getUserData();

      const email = loginStore.userData.email;
      console.log("현재 사용자 이메일:", email);

      try {
        const response = await apiClient.patch("/users/change-password", {
          email,
          oldPassword,
          newPassword,
        });
        console.log("비밀번호 변경 성공:", response.data);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "비밀번호 변경 실패");
      }
    },

    // 개인정보 수정
    async updateUserData(phone, addr, addrDetail) {
      const loginStore = userLoginStore();
      await loginStore.getUserData();
      const userData = loginStore.userData;

      console.log({
        email: userData.email,
        phone,
        addr,
        addrDetail,
      });

      try {
        const response = await apiClient.put("/users", {
          email: userData.email,
          phone,
          addr,
          addrDetail,
        });
        console.log("정보 수정 성공:", response.data);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "정보 수정 실패");
      }
    },

    // 회원 탈퇴
    async deactivateUserAction() {
      if (!this.userData.id) {
        throw new Error("사용자 ID가 없습니다.");
      }

      try {
        await apiClient.delete("/users");
        this.userData = {};
        this.isLoggedIn = false; // 로그아웃 상태로 변경
      } catch (error) {
        console.error("탈퇴 실패:", error);
        throw error;
      }
    },

    // 모든 시설 조회 API 호출
    async fetchAccommodations() {
      try {
        const response = await apiClient.get("/accommodations");
        this.accommodations = response.data;
      } catch (error) {
        console.error("Failed to fetch accommodations:", error);
      }
    },
  },
});
