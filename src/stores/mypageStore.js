import { defineStore } from "pinia";
import apiClient from "@/api";
import { userLoginStore } from "@/stores/loginStore";

export const mypageStore = defineStore("mypageStore", {
  state: () => ({
    userData: {},

    changePW: {
      email: "",
      oldPassword: "",
      newPassword: "",
    },
  }),

  actions: {
    // 비밀번호 변경 메서드
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
  },
});
