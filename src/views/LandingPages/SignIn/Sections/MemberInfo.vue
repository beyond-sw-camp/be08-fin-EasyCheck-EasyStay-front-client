<script setup>
import { onMounted, ref } from "vue";
import { userLoginStore } from '@/stores/loginStore';

// Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";

// Initialize MaterialInput on mount
onMounted(() => {
  setMaterialInput();
});

// 약관 동의
const isChecked = ref(false);

const consentItems = ref([
  { label: '개인정보 이용 동의 (필수)', checked: false },
  { label: '고유식별 정보 처리 동의 (필수)', checked: false },
]);

const consentItems2 = ref([
  { label: '서비스 이용약관 동의 (필수)', checked: false },
  { label: '통신사 이용약관 동의 (필수)', checked: false },
]);

function toggleAll() {
  consentItems.value.forEach(item => {
    item.checked = isChecked.value;
  });

  consentItems2.value.forEach(item => {
    item.checked = isChecked.value;
  });
}

// 전화번호
const phoneFields = ref({
  label: '전화번호',
  inputs: [
    { id: 'phonePrefix1', text: '010' },
    { id: 'phonePrefix2', text: '011' },
    { id: 'phonePrefix3', text: '02' },
    { id: 'phonePrefix4', text: '051' },
    { id: 'phonePrefix11', text: '053' },
  ],
});

// 통신사
const selectedPhonePrefix = ref('010');
const phoneMiddle = ref('');
const phoneSuffix = ref('');

const carrierOptions = ref([
  { value: 'carrier1', text: 'SKT' },
  { value: 'carrier2', text: 'KT' },
  { value: 'carrier3', text: 'LGU+' },
  { value: 'carrier4', text: 'SKT알뜰폰' },
  { value: 'carrier5', text: 'KT알뜰폰' },
  { value: 'carrier6', text: 'LGU+알뜰폰' },
]);

const selectedCarrier = ref('');

// 인증번호 요청
const loginStore = userLoginStore();

// 인증번호 클릭 시 아래로
const isVerificationRequested = ref('false');

const authenticatePhone = async () => {
  isVerificationRequested.value = true;

  // 상태 업데이트
  loginStore.setPhoneNumbers(selectedPhonePrefix.value, phoneMiddle.value, phoneSuffix.value);

  try {
    const message = await loginStore.handlePhoneAuthentication();
    console.log(message);
  } catch (error) {
    console.error('Error during phone authentication:', error.message);
  }
};

const handleInputChange = () => {
  loginStore.setPhoneNumbers(selectedPhonePrefix.value, phoneMiddle.value, phoneSuffix.value);
};

// 인증 번호 확인
const verificationCode = ref('');

const requestVerification = async () => {
  const phoneNumber = `${selectedPhonePrefix.value}${phoneMiddle.value}${phoneSuffix.value}`;
  console.log('Phone Number: ', phoneNumber);
  console.log('Entered verification code: ', verificationCode.value);

  try {
    // 인증번호 검증 요청
    const message = await loginStore.verifyCode(phoneNumber, loginStore.verificationCode);
    console.log(message);
  } catch (error) {
    console.error('Error during verification:', error.message);
  }
};

// 우편번호 검색 핸들러
const postcode = ref('');
const roadAddress = ref('');
const jibunAddress = ref('');
const detailAddress = ref('');
const extraAddress = ref('');

const searchZipCode = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      postcode.value = data.zonecode; // 올바른 키 사용
      loginStore.roadAddress = data.roadAddress; // 도로명 주소
      loginStore.jibunAddress = data.jibunAddress; // 지번 주소
      loginStore.detailAddress = ''; // 상세주소 초기화
    },
  }).open();
};

</script>

<template>
  <div class="align-items-start" loading="lazy">
    <table class="table">
      <tbody>
        <tr>
          <td colspan="2">
            <div class="text-start">
              <h5 class="text-black mb-2">회원 정보 입력</h5>
            </div>
          </td>
        </tr>

        <!-- 아이디 -->
        <tr>
          <td class="fw-bold fs-8">아이디</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <MaterialInput v-model="loginStore.signUpformData.email" required class="input-group-outline mb-0"
                id="email" :label="{ text: '아이디', class: 'form-label' }" type="text" />
            </div>
          </td>
        </tr>


        <!-- 비밀번호 -->
        <tr>
          <td class="fw-bold fs-8">비밀번호</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <MaterialInput v-model="loginStore.signUpformData.password" required class="input-group-outline mb-0"
                id="password" :label="{ text: '비밀번호', class: 'form-label' }" type="password" />
            </div>
          </td>
        </tr>

        <!-- 성함 -->
        <tr>
          <td class="fw-bold fs-8">성함</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <MaterialInput v-model="loginStore.signUpformData.name" class="input-group-outline mb-0" id="name"
                :label="{ text: '성함', class: 'form-label' }" type="text" />
            </div>
          </td>
        </tr>

        <!-- 전화번호 -->
        <tr>
          <td class="fw-bold fs-8">전화번호</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <!-- 통신사 -->
              <select id="carrier" class="form-select me-2" v-model="selectedCarrier" style="width: 20%;">
                <option value="" disabled selected>통신사 선택</option>
                <option v-for="carrier in carrierOptions" :key="carrier.value" :value="carrier.value">
                  {{ carrier.text }}
                </option>
              </select>

              <!-- 전화번호 -->
              <select id="phonePrefix" class="form-select me-2" v-model="selectedPhonePrefix"
                @change="handleInputChange" style="width: 15%;">
                <option v-for="input in phoneFields.inputs" :key="input.id" :value="input.text">
                  {{ input.text }}
                </option>
              </select>

              <MaterialInput @input="handleInputChange" class="input-group-outline mb-0 me-2" v-model="phoneMiddle"
                type="text" style="width: 25%;" />
              <MaterialInput @input="handleInputChange" class="input-group-outline mb-0" v-model="phoneSuffix"
                type="text" style="width: 25%; margin-right: 10px;" />

              <!-- 인증 요청 버튼 -->
              <button class="btn btn-black custom-btn mt-3" @click="authenticatePhone">
                인증 요청
              </button>
            </div>
          </td>
        </tr>

        <!-- 인증번호 입력란 -->
        <transition name="slide-fade">
          <tr v-if="isVerificationRequested">
            <td class="fw-bold fs-8">인증번호</td>
            <td>
              <div class="d-flex align-items-center justify-content-center col-5">
                <MaterialInput class="input-group-outline mb-0" v-model="loginStore.verificationCode" type="text"
                  placeholder="인증번호 입력" style="width: 25%; margin-right: 10px;" />
                <button id="verifyCode" class="btn btn-black custom-btn mt-3" @click="requestVerification">인증</button>
              </div>
            </td>
          </tr>
        </transition>

        <!-- 주소 -->
        <tr>
          <td class="fw-bold fs-8">주소</td>
          <td>
            <div class="d-flex align-items-stretch col-4">
              <MaterialInput v-model="postcode" class="input-group-outline mb-0 me-2" placeholder="우편번호"
                style="flex: 1;" />
              <button type="button" class="btn btn-outline-primary mb-0" @click="searchZipCode">주소 검색</button>
            </div>
            <div class="mt-2 col-5">
              <MaterialInput v-model="loginStore.roadAddress" class="input-group-outline mb-2" placeholder="도로명주소" />
              <MaterialInput v-model="loginStore.jibunAddress" class="input-group-outline mb-2" placeholder="지번주소" />
              <MaterialInput v-model="loginStore.detailAddress" class="input-group-outline mb-2" placeholder="상세주소" />
            </div>
          </td>
        </tr>

        <tr>
          <td class="fw-bold fs-8">마케팅 수신 동의 여부</td>
          <td>
            <div class="d-flex align-items-stretch col-4">
              <label class="me-2">
                <input type="radio" v-model="loginStore.signUpformData.marketingConsent" value="Y"
                  class="form-check-input" />
                예
              </label>
              <label>
                <input type="radio" v-model="loginStore.signUpformData.marketingConsent" value="N"
                  class="form-check-input" />
                아니요
              </label>
            </div>
          </td>
        </tr>



      </tbody>
    </table>
  </div>
</template>

<style>
.form-select:focus {
  border-color: #007bff !important;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
}

.custom-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  width: 80px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  /* 위로 이동 */
}
</style>