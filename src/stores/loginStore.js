import { defineStore } from 'pinia';
import apiClient from '@/api';
import router from '@/router';
import axios from 'axios';

export const userLoginStore = defineStore("userStore", {
  state: () => ({
    id: null,
    password: null,
    message: null,
    selectedPhonePrefix: '',
    phoneMiddle: '',
    phoneSuffix: '',
    verificationCode: '',

    signUpformData: {
      email: '',
      password: '',
      name: '',
      selectedPhonePrefix: '',
      phoneMiddle: '',
      phoneSuffix: '',
      verificationCode: '',
      roadAddress: '',
      jibunAddress: '',
      detailAddress: '',
      marketingConsent: '',
    },

  }),

  getters: {
    inUserLogin(state) {
      return state.id != null;  
    },
  },

  actions: {
    generateVerificationCode() {
      const code = Math.floor(10000000 + Math.random() * 90000000);
      return code.toString();
    },

    // 일반회원 - 로그인
    async login(formData) {
      try {
        const response = await apiClient.post("/users/login", formData);
        
        if (response && response.data) {
          localStorage.setItem('jwt', response.data.accessToken);
          console.log("로그인 성공");
          return response.data;
        } else {
          throw new Error("Unexpected response format: " + JSON.stringify(response));
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

    // 인증번호 요청
    async requestVerificationCode() {
      const phoneNumber = `${this.selectedPhonePrefix}${this.phoneMiddle}${this.phoneSuffix}`;
      
      console.log('Sending phone number:', phoneNumber);
    
      try {
        const response = await fetch('http://localhost:8080/api/v1/sms/code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            receivingPhoneNumber: phoneNumber,
          }),
        });
    
        console.log('Response status:', response.status);
        const text = await response.text();
        console.log('Response body:', text);
    
        if (response.ok) {
          if (text) {
            const data = JSON.parse(text);
            return data.message;
          } else {
            throw new Error('빈 응답입니다.');
          }
        } else {
          console.error('Response status:', response.status);
          throw new Error('인증 코드 요청에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error in requestVerificationCode:', error.message);
        throw error;
      }  
    },
    
    async handlePhoneAuthentication() {
      try {
        const message = await this.requestVerificationCode();
        console.log(message); // 성공 메시지 출력
      } catch (error) {
        console.error('Error during phone authentication:', error.message);
      }
    },
    
    async verifyCode(phone, verificationCode) {
      const payload = {
        phone: phone,  // "phone" 키 사용
        code: verificationCode,  // "code" 키 사용
      };
    
      console.log('Phone Number:', phone); // 전화번호 로그
      console.log('Entered verification code:', verificationCode); // 인증 코드 로그
    
      try {
        const response = await fetch('http://localhost:8080/api/v1/sms/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (response.ok) {
          const data = await response.json(); // JSON 응답 파싱
          console.log('인증 성공:', data.message);
          return data.message;
        } else {
          const errorData = await response.json();
          console.error('인증 실패:', errorData.errors ? errorData.errors[0].errorMessage : '인증 코드 검증에 실패했습니다.');
          throw new Error(errorData.errors ? errorData.errors[0].errorMessage : '인증 코드 검증에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error in verifyCode:', error.message);
        throw error;
      }
    },

    // 일반회원 - 회원가입
    async registerUser() {
      try {
        const response = await axios.post("/users/member/info", this.signUpformData); // 수정된 부분
        return response.status === 201;
      } catch (error) {
        console.error("회원가입 실패:", error);
        throw error;
      }
    },
  }
});
