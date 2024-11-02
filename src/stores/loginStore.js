import { defineStore } from "pinia";
import apiClient from "@/api";
import router from "@/router";
import { mypageStore } from "./mypageStore";

export const userLoginStore = defineStore("userStore", {
  state: () => ({
    id: "",
    message: null,
    selectedPhonePrefix: "",
    phoneMiddle: "",
    phoneSuffix: "",
    verificationCode: "",
    roadAddress: "",
    jibunAddress: "",
    detailAddress: "",

    userData: {
      name: "",
      email: "",
      phone: "",
    },

    // 로그인 상태 저장
    isLoggedIn: false,

    // 로그인
    loginData: {
      email: "",
      password: "",
    },

    // 일반회원 - 회원가입
    signUpformData: {
      emailPrefix: "",
      emailSuffix: "",
      password: "",
      name: "",
      verificationCode: "",
      marketingConsent: "N",
    },

    // 인증 여부 저장 상태
    isAuthenticated: false,

    // 마이페이지에서 유저 정보 가져오기
    userInfo: {},
  }),

  getters: {
    isAllChecked(state) {
      // 약관동의의 필수 체크박스가 체크되었는지 확인
      return (
        state.consentItems.every((item) => item.checked) &&
        state.consentItems2.every((item) => item.checked)
      );
    },
    userRole: (state) =>
      state.userInfo?.role === "CORP_USER" ? "법인회원" : "일반회원",
    email: (state) => state.userInfo?.email.split("@")[0], // @ 앞부분 반환
    domain: (state) => state.userInfo?.email.split("@")[1], // @ 뒷부분 반환
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
  },

  actions: {
    // 로그인 상태
    async setLoginStatus(status) {
      this.isLoggedIn = status;
    },

    checkLogin() {
      if (localStorage.getItem("accessToken")) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },

    // 일반회원 - 로그인
    async login(loginData) {
      const mypageStoreInstance = mypageStore();

      try {
        const response = await apiClient.post("/users/login", loginData);
        console.log(response.data);

        if (response && response.data) {
          localStorage.setItem("accessToken", response.data.accessToken);
          this.setLoginStatus(true);
          console.log("로그인 성공, 저장된 토큰:", response.data.accessToken);

          // 사용자 ID를 로그인 스토어에 저장
          this.userData.id = response.data.userId;

          // 사용자 정보 가져오기
          if (localStorage.getItem("accessToken")) {
            await this.getUserData(); // 로그인 스토어에서 사용자 정보 가져오기
            mypageStoreInstance.userData.id = this.userData.id;
            mypageStoreInstance.userData.name = this.userData.name;
            mypageStoreInstance.userData.email = this.userData.email;
          }

          // 메인 페이지로 이동
          router.push("/");
          return response.data;
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        alert(error.message || "로그인 실패");
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

    handleAuthenticatePhone() {
      if (!this.isAllChecked) {
        alert("모든 약관에 동의해야 인증번호를 요청할 수 있습니다.");
        return;
      }

      // 약관이 모두 체크된 경우 인증 요청
      this.authenticatePhone();
    },

    // 인증번호 요청
    async requestVerificationCode() {
      const phone = `${this.selectedPhonePrefix}${this.phoneMiddle}${this.phoneSuffix}`;
      console.log("Sending phone number:", phone);

      try {
        await apiClient.post("/sms/code", {
          receivingPhoneNumber: phone,
        });
      } catch (error) {
        console.error("Error in requestVerificationCode:", error.message);
        alert("인증번호가 올바르지 않습니다. 다시 시도해주세요.");
      }
    },

    async handlePhoneAuthentication() {
      try {
        const message = await this.requestVerificationCode();
        console.log(message);
      } catch (error) {
        console.error("Error during phone authentication:", error.message);
      }
    },

    setVerificationCode(code) {
      this.verificationCode = code;
      console.log("Verification code set to:", this.verificationCode);
    },

    // 인증번호 확인
    async verifyCode(phone, verificationCode) {
      console.log("Phone Number:", phone);
      console.log("Entered verification code:", verificationCode);

      try {
        const response = await apiClient.post("/sms/verify", {
          phone,
          code: verificationCode,
        });

        console.log("인증 요청 데이터:", phone);
        console.log("인증 요청 데이터", verificationCode);

        if (response.status === 200) {
          alert("인증에 성공했습니다!");
          this.isAuthenticated = true;
          console.log("인증 후 isAuthenticated:", this.isAuthenticated);
          return true;
        }
      } catch (error) {
        console.error("Error in verifyCode:", error.message);
        alert("인증에 실패했습니다. 확인 후 다시 시도해주세요.");
      }

      return false;
    },

    // 회원가입 - 일반회원
    async registerUser() {
      const addr = `${this.roadAddress} ${this.detailAddress}`;
      const addrDetail = this.jibunAddress;

      const emailPrefix = this.signUpformData.emailPrefix;
      const emailSuffix = this.signUpformData.emailSuffix;

      // 전화번호 구성
      const phonePrefix = this.selectedPhonePrefix;
      const phoneMiddle = this.phoneMiddle;
      const phoneSuffix = this.phoneSuffix;

      const requestData = {
        email: `${emailPrefix}@${emailSuffix}`,
        password: this.signUpformData.password,
        name: this.signUpformData.name,
        phone: `${phonePrefix}${phoneMiddle}${phoneSuffix}`,
        addr,
        addrDetail,
        marketingConsent: this.signUpformData.marketingConsent,
      };

      console.log("회원가입 요청 데이터:", requestData);

      if (!this.isAuthenticated) {
        alert("휴대폰 인증이 필요합니다.");
        return false;
      }

      console.log("회원가입 시 isAuthenticated:", this.isAuthenticated);

      try {
        const response = await apiClient.post("/users", requestData);
        console.log("API 응답:", response);
        if (response.status === 201) {
          return true;
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error(
          "회원가입 실패:",
          error.response ? error.response.data : error.message
        );
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }

      return false;
    },

    // 회원가입 - 법인회원
    async registerCorporateUser() {
      const emailPrefix = this.signUpformData.emailPrefix;
      const emailSuffix = this.signUpformData.emailSuffix;

      // 전화번호 구성
      const phonePrefix = this.selectedPhonePrefix;
      const phoneMiddle = this.phoneMiddle;
      const phoneSuffix = this.phoneSuffix;

      const requestData = {
        name: this.signUpformData.name,
        phone: `${phonePrefix}${phoneMiddle}${phoneSuffix}`,
        email: `${emailPrefix}@${emailSuffix}`,
      };

      console.log("회원가입 요청 데이터:", requestData); // 요청 데이터 로그 추가

      // 인증이 실패한 경우 처리
      if (!this.isAuthenticated) {
        alert("휴대폰 인증이 필요합니다.");
        return false;
      }

      // 회원가입 요청
      try {
        const response = await apiClient.post("/corp-users", requestData);
        if (response.status === 201) {
          return true;
        }
      } catch (error) {
        console.log(error);
        console.error("회원가입 실패:", error.message, error.response?.data);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    },

    // 사용자 정보 가져오기
    async getUserData() {
      try {
        const response = await apiClient.get("/users/info"); // API 호출
        if (response.data) {
          this.userData.id = response.data.id;
          this.userData.name = response.data.name;
          this.userData.email = response.data.email;
          this.userData.phone = response.data.phone;
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        throw error;
      }
    },

    // 로그아웃
    logout() {
      // 토큰 삭제
      localStorage.removeItem("accessToken");
      this.$reset();
      this.isLoggedIn = false;
      router.push("/");
    },

    // 비밀번호 변경
    async changePW(currentPassword, newPassword) {
      try {
        const response = await apiClient.patch("/users/change-password", {
          currentPassword,
          newPassword,
        });
        this.userData = response.data;
        console.log("비밀번호 변경 성공:", this.userData);
      } catch (error) {
        console.error("비밀번호 변경 오류:", error);
        this.error =
          error.response?.data?.message || "비밀번호 변경에 실패했습니다.";
      }
    },
    // 유저 정보 불러오기
    async fetchUserInfo() {
      try {
        const response = await apiClient.get("/users/info");
        this.userInfo = response.data;
      } catch (err) {
        this.userInfo = {};
        console.log(err);
      }
    },
    // 이메일 중복 체크
    async checkEmailDuplicate(email) {
      try {
        const response = await apiClient.patch("users/check-duplicate", {
          email,
        });
        return response.status === 200;
      } catch (error) {
        if (error.response && error.response.status === 409) {
          return false;
        }
        throw new Error(
          error.response?.data?.message || "이메일 중복 확인 실패"
        );
      }
    },
  },
});
