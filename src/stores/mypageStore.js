import { defineStore } from "pinia";
import apiClient from "@/api";
import router from "@/router";
import { userLoginStore } from "@/stores/loginStore";

export const mypageStore = defineStore("mypageStore", {
  state: () => ({
    userData: {},

    changePW: {
      oldPassword: "",
      newPassword: "",
      showNewPasswordInput: false,
    },
  }),

  actions: {
    actions: {
      async verifyOldPassword(oldPassword) {
        const response = await apiClient.post("/api/change-password", {
          email: this.userData.email, // 현재 사용자 이메일
          password: oldPassword,
        });

        return response.status === 200; // 비밀번호가 일치하는 경우
      },

      async changePassword() {
        const response = await apiClient.post("/api/change-password", {
          email: this.userData.email, // 현재 사용자 이메일
          oldPassword: this.changePW.oldPassword, // 현재 비밀번호
          newPassword: this.changePW.newPassword, // 새 비밀번호
        });

        if (response.status !== 200) {
          throw new Error("비밀번호 변경에 실패했습니다.");
        }
      },
    },
  },
});
