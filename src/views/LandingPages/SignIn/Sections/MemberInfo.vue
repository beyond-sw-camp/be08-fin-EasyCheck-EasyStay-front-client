<script setup>
import { onMounted, ref, computed, watch } from "vue";
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

const toggleAll = () => {
  const isCheckedValue = isChecked.value;
  consentItems.value.forEach(item => {
    item.checked = isCheckedValue;
  });

  consentItems2.value.forEach(item => {
    item.checked = isCheckedValue;
  });
};

// 전체 약관 동의 여부 확인
const isAllChecked = computed(() => {
  return consentItems.value.every(item => item.checked) &&
    consentItems2.value.every(item => item.checked);
});

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
  // 약관 동의 여부 체크
  if (!isAllChecked.value) {
    alert("모든 약관에 동의해야 인증번호를 요청할 수 있습니다.");
    return; // 약관 동의가 안 되면 요청하지 않음
  }

  isVerificationRequested.value = true;

  // 상태 업데이트
  loginStore.setPhoneNumbers(selectedPhonePrefix.value, phoneMiddle.value, phoneSuffix.value);

  try {
    await loginStore.handlePhoneAuthentication();
    alert("인증번호 요청이 성공적으로 전송되었습니다."); // 성공 메시지
  } catch (error) {
    console.error('Error during phone authentication:', error.message);
    alert("인증번호 요청 중 오류가 발생했습니다."); // 오류 메시지
  }
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
const selectedDomain = ref('');

const updateEmailSuffix = () => {
  if (selectedDomain !== 'etc') {
    loginStore.signUpformData.emailSuffix = selectedDomain;
  } else {
    // 기타 선택 시, 입력된 값을 이메일 suffix로 설정
    loginStore.signUpformData.emailSuffix = loginStore.signUpformData.emailSuffix;
  };
}

// 이메일 중복 체크
const checkDuplicateId = async () => {
  const email = `${loginStore.signUpformData.emailPrefix}@${selectedDomain.value === 'etc' ? loginStore.signUpformData.emailSuffix : selectedDomain.value}`;

  // 이메일 중복 체크 액션 호출
  const isDuplicated = await loginStore.checkEmailIsDuplicated(email);
  if (isDuplicated) {
    alert('사용 가능한 이메일입니다.');
  } else {
    alert('이미 사용 중인 이메일입니다.');
  }
};

// 비밀번호 유효성 검사
const password = ref("");
const passwordError = ref(false);

const isPasswordValid = computed(() => {
  // 비밀번호 유효성 검사: 최소 8자, 최대 16자, 대문자, 숫자 포함
  const minLength = password.value.length >= 8;
  const maxLength = password.value.length <= 16;
  const hasUpperCase = /[A-Z]/.test(password.value);
  const hasNumber = /\d/.test(password.value);

  return minLength && maxLength && hasUpperCase && hasNumber;
});
// 비밀번호 입력 시 오류 여부 업데이트
watch(password, (newVal) => {
  passwordError.value = !isPasswordValid.value;
});

</script>

<template>

  <!-- 약관 동의 -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="form-check text-start mt-2">
        <input class="form-check-input custom-checkbox" type="checkbox" id="privacyConsent" v-model="isChecked"
          @change="toggleAll" />
        <label class="form-check-label fw-bold text-black fs-7 mb-0" for="privacyConsent">
          휴대폰 본인확인 전체동의
        </label>
      </div>
    </div>
  </div>

  <hr style="border-top: 2px solid #ccc;" />

  <div class="row mb-3">
    <div class="col-5" v-for="(item, index) in consentItems" :key="index">
      <div class="form-check text-start">
        <input class="form-check-input custom-checkbox" type="checkbox" :id="'privacyConsent1_' + index"
          v-model="item.checked" />
        <label class="form-check-label fw-bold text-muted fs-7" :for="'privacyConsent1_' + index">
          {{ item.label }}
        </label>
      </div>
    </div>
  </div>

  <hr style="border-top: 2px solid #ccc;" />

  <div class="row mb-4">
    <div class="col-5" v-for="(item, index) in consentItems2" :key="index">
      <div class="form-check text-start">
        <input class="form-check-input custom-checkbox" type="checkbox" :id="'privacyConsent2_' + index"
          v-model="item.checked" />
        <label class="form-check-label fw-bold text-muted fs-7" :for="'privacyConsent2_' + index">
          {{ item.label }}
        </label>
      </div>
    </div>
  </div>
  <hr style="border-top: 2px solid #ccc;" />
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
          <td class="fw-bold fs-8 col-1">아이디</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <MaterialInput v-model="loginStore.signUpformData.emailPrefix" required class="input-group-outline mb-0"
                id="emailPrefix" :label="{ text: '이메일', class: 'form-label' }" type="text" style="flex: 1;" />
              <span class="mx-1">@</span>

              <template v-if="selectedDomain === 'etc'">
                <MaterialInput v-model="loginStore.signUpformData.emailSuffix" class="input-group-outline mb-0 ms-2"
                  id="emailSuffix" type="text" style="flex: 1;" placeholder="도메인 입력" />
              </template>

              <template v-else>
                <select v-model="selectedDomain" class="form-select ms-2" @change="updateEmailSuffix" style="flex: 1;">
                  <option value="" disabled selected>도메인 선택</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="etc">기타</option>
                </select>
              </template>

              <button class="btn custom-btn ms-2 mt-3" @click="checkDuplicateId">
                중복 체크
              </button>
            </div>
          </td>
        </tr>

        <!-- 비밀번호 -->
        <tr>
          <td class="fw-bold fs-8">비밀번호</td>
          <td>
            <div class="d-flex flex-column align-items-start col-5">
              <MaterialInput v-model="password" required class="input-group-outline mb-0" id="password"
                :label="{ text: '비밀번호', class: 'form-label' }" type="password" />
              <div v-if="passwordError" class="text-danger small mt-1">
                비밀번호는 최소 8자 이상, 최대 16자 이하와 대문자와 숫자를 포함해야 합니다.
              </div>
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
              <button type="button" class="btn btn-outline-primary mb-0 custom-btn" @click="searchZipCode">주소
                검색</button>
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

<style scoped>
.table td {
  vertical-align: middle;
}

.form-select:focus {
  border-color: #007bff !important;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
}

.custom-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  width: 80px;
  font-size: 15px;
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
