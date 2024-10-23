import { defineStore } from "pinia";
import apiClient from "@/api";
import router from "@/router";
export const userLoginStore = defineStore("userStore", {
  state: () => ({
    id: null,
    password: null,
    message: null,
    selectedPhonePrefix: "",
    phoneMiddle: "",
    phoneSuffix: "",
    verificationCode: "",
    roadAddress: "",
    jibunAddress: "",
    detailAddress: "",

    signUpformData: {
      email: "",
      password: "",
      name: "",
      verificationCode: "",
      marketingConsent: "N",
    },
  }),

  getters: {
    inUserLogin(state) {
      return state.id != null;
    },
  },

  actions: {
    // 일반회원 - 로그인
    async login(formData) {
      try {
        const response = await apiClient.post("/users/login", formData);

        if (response && response.data) {
          localStorage.setItem("jwt", response.data.accessToken);
          console.log("로그인 성공");
          return response.data;
        } else {
          throw new Error(
            "Unexpected response format: " + JSON.stringify(response)
          );
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        throw new Error(error.response?.data?.message || "로그인 실패");
      }
    },

    setPhoneNumbers(prefix, middle, suffix) {
      this.selectedPhonePrefix = prefix;
      this.phoneMiddle = middle;
      this.phoneSuffix = suffix;
    },

    // 인증번호 생성
    generateVerificationCode() {
      const code = Math.floor(10000000 + Math.random() * 90000000);
      return code.toString();
    },

    async requestVerificationCode() {
      const phone = `${this.selectedPhonePrefix}${this.phoneMiddle}${this.phoneSuffix}`;
      console.log("Sending phone number:", phone);

      try {
        await apiClient.post("/sms/code", {
          receivingPhoneNumber: phone,
        });
      } catch (error) {
        console.error("Error in requestVerificationCode:", error.message);
        throw error;
      }
    },

    async handlePhoneAuthentication() {
      try {
        const message = await this.requestVerificationCode();
        console.log(message); // 성공 메시지 출력
      } catch (error) {
        console.error("Error during phone authentication:", error.message);
      }
    },

    // 인증번호 인증
    async verifyCode(phone, verificationCode) {
      console.log("Phone Number:", phone);
      console.log("Entered verification code:", verificationCode);

      try {
        await apiClient.post("/sms/verify", {
          phone,
          code: verificationCode,
        });
      } catch (error) {
        console.log(error);

        console.error("Error in verifyCode:", error.message);
      }
    },

    // 일반회원 - 회원가입
    async registerUser() {
      const addr = `${this.roadAddress} ${this.detailAddress}`;
      const addrDetail = this.jibunAddress;

      // 전화번호 구성
      const phonePrefix = this.selectedPhonePrefix;
      const phoneMiddle = this.phoneMiddle;
      const phoneSuffix = this.phoneSuffix;

      const requestData = {
        email: this.signUpformData.email,
        password: this.signUpformData.password,
        name: this.signUpformData.name,
        phone: `${phonePrefix}${phoneMiddle}${phoneSuffix}`,
        addr,
        addrDetail,
        marketingConsent: this.signUpformData.marketingConsent,
      };

      console.log(requestData);

      try {
        const response = await apiClient.post("/users", requestData);
        if (response.status === 201) {
          router.push("/joinComplete");
        }
      } catch (error) {
        console.error("회원가입 실패:", error);
        throw error; // 에러를 상위로 던지기
      }
    },
  },
});
