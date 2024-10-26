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
    async updateUserData(email, phone, addr, addrDetail) {
      const loginStore = userLoginStore();
      await loginStore.getUserData();

      try {
        const response = await apiClient.put("/users", {
          email,
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
  },
});
