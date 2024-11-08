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
    foundEmails: [],

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
    isPhoneVerified: false,

    // 마이페이지에서 유저 정보 가져오기
    userInfo: {},

    pwData: {
      email: "",
      phone: "",
      newPassword: "",
      confirmPassword: "",
    },
  }),

  getters: {
    // 약관 동의 필수 체크박스 체크 되었는지 확인
    isAllChecked(state) {
      return state.consentItems.every((item) => item.checked);
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
    setPhoneNumbers(prefix, middle, suffix) {
      this.selectedPhonePrefix = prefix;
      this.phoneMiddle = middle;
      this.phoneSuffix = suffix;
    },
    setUserName(name) {
      this.userData.name = name;
    },
    setEmail(email) {
      this.pwData.email = email;
    },
    setNewPassword(password) {
      this.pwData.newPassword = password;
    },
    setConfirmPassword(password) {
      this.pwData.confirmPassword = password;
    },
    setPhone(prefix, middle, suffix) {
      const phoneNumber = `${prefix}${middle}${suffix}`;
      this.userData.phone = phoneNumber;
      this.pwData.phone = phoneNumber;
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
    setFoundEmails(emails) {
      this.userData.foundEmails = emails; // 이메일 배열 저장
    },
    setVerificationCode(code) {
      this.verificationCode = code;
      console.log("Verification code set to:", this.verificationCode);
    },

    async saveUserData(response) {
      this.userData.name = response.name;
      this.userData.email = response.email;
      this.userData.phone = response.phone;
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
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        throw error;
      }
    },

    // 로그인 요청
    async login(loginData) {
      const mypageStoreInstance = mypageStore();

      try {
        const response = await apiClient.post("/users/login", loginData);

        if (!response?.data) {
          throw new Error("서버 응답 형식이 올바르지 않습니다.");
        }

        const { accessToken, userId, name, email } = response.data;

        // 토큰 저장 및 로그인 상태 업데이트
        localStorage.setItem("accessToken", accessToken);
        this.setLoginStatus(true);

        // 사용자 정보 업데이트
        this.userData = {
          id: userId,
          name: name,
          email: email,
        };

        // mypage store와 동기화
        mypageStoreInstance.userData = { ...this.userData };

        return response.data;
      } catch (error) {
        console.error("로그인 실패:", error);
        throw error; // 에러를 상위로 전달하여 컴포넌트에서 처리
      }
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
          this.isPhoneVerified = true;
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

    // 아이디 찾기
    async findEmail(name, phone) {
      this.isAuthenticated = true;
      this.isPhoneVerified = true;

      try {
        const response = await apiClient.post("/users/find-email", {
          name: name,
          phone: phone,
        });

        if (response.data) {
          // 이메일 찾기 성공 시
          this.userData.email = response.data.email;
          return response.data;
        }
      } catch (error) {
        console.error("이메일 찾기 실패:", error);
        alert("이메일 찾기 실패. 정보를 확인하세요.");
      }
    },

    async resetPassword(email, phone, newPassword, confirmPassword) {
      try {
        const payload = { email, phone, newPassword, confirmPassword };
        console.log("Request payload:", payload); // 요청 본문 로그

        const response = await apiClient.post("/users/find-password", payload);

        console.log("Response from server:", response.data);
        return response;
      } catch (error) {
        console.error("Error resetting password:", error.message);
        if (error.response) {
          console.error("Error details:", error.response.data);
        }
        throw error;
      }
    },
  },
});
