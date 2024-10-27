<script setup>
import { onMounted, ref, computed } from "vue";

import MaterialInput from "@/components/MaterialInput.vue";
import setMaterialInput from "@/assets/js/material-input";
import { userLoginStore } from "@/stores/loginStore";

onMounted(() => {
  setMaterialInput();
});

const loginStore = userLoginStore();

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

// 전체 동의 클릭 시 모두 체크
function toggleAll() {
  consentItems.value.forEach(item => {
    item.checked = isChecked.value;
  });

  consentItems2.value.forEach(item => {
    item.checked = isChecked.value;
  });
}

// 전체 약관 동의 여부 확인
const isAllChecked = computed(() => {
  return consentItems.value.every(item => item.checked) &&
    consentItems2.value.every(item => item.checked);
});

// 전화번호
const selectedPhonePrefix = ref('010');
const phoneMiddle = ref('');
const phoneSuffix = ref('');
const phoneFields = ref({
  label: '전화번호',
  inputs: [
    { id: 'phonePrefix1', text: '02' },
    { id: 'phonePrefix2', text: '010' },
    { id: 'phonePrefix3', text: '051' },
  ],
});

// 통신사
const carrierOptions = ref([
  { value: 'carrier1', text: 'SKT' },
  { value: 'carrier2', text: 'KT' },
  { value: 'carrier3', text: 'LGU+' },
  { value: 'carrier4', text: 'SKT알뜰폰' },
  { value: 'carrier5', text: 'KT알뜰폰' },
  { value: 'carrier6', text: 'LGU+알뜰폰' },
]);

// 인증번호 요청
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
  console.log('Entered verification code: ', loginStore.verificationCode); // 스토어의 값 사용

  try {
    const message = await loginStore.verifyCode(phoneNumber, loginStore.verificationCode);
    console.log(message);
  } catch (error) {
    console.error('Error during verification:', error.message);
  }
};


const selectedDomain = ref('');
const isCustomDomain = ref(false);

const onDomainChange = () => {
  if (selectedDomain.value === 'etc') {
    isCustomDomain.value = true; // "기타" 선택 시 입력 박스 활성화
  } else {
    isCustomDomain.value = false; // 다른 도메인 선택 시 드롭다운 유지
    loginStore.signUpformData.emailSuffix = selectedDomain.value; // 선택한 도메인 저장
  }
};

const updateEmailSuffix = () => {
  if (selectedDomain !== 'etc') {
    loginStore.signUpformData.emailSuffix = selectedDomain;
  }

  const email = createEmail(); // 이메일 생성
  console.log('Generated Email:', email);
  loginStore.signUpformData.email = email; // 이메일 값 저장
};

// 이메일 합치기
const createEmail = () => {
  const emailPrefix = loginStore.signUpformData.emailPrefix || '';
  const emailSuffix = loginStore.signUpformData.emailSuffix || '';

  // prefix와 suffix가 비어있는 경우에 대해 처리
  if (!emailPrefix || !emailSuffix) {
    console.error('이메일 구성 오류: prefix 또는 suffix가 비어있습니다.');
    return '이메일을 제대로 입력하세요'; // 오류 메시지
  }

  return `${emailPrefix}@${emailSuffix}`;
};
</script>

<template>
  <div class="align-items-start" loading="lazy">
    <div class="mt-0 mb-5">
      <h6 class="text-black">회원권 종류 설명</h6>
      <ul>
        <li><strong>스탠다드 회원권:</strong> 기본 숙박 혜택 및 일부 시설 이용 가능.</li>
        <li><strong>프리미엄 회원권:</strong> 모든 시설 이용 가능 및 추가 할인 혜택.</li>
      </ul>
    </div>

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

    <table class="table mt-5">
      <tbody>
        <!-- 인증정보 입력 -->
        <tr>
          <td colspan="2">
            <div class="text-start">
              <h5 class="text-black mb-2">회원 정보 입력</h5>
            </div>
          </td>
        </tr>

        <!-- 이름 -->
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
              <div class="d-flex align-items-center justify-content-start col-5">
                <MaterialInput class="input-group-outline mb-0" v-model="loginStore.verificationCode" type="text"
                  placeholder="인증번호 입력" style="width: 25%; margin-right: 10px;" />
                <button id="verifyCode" class="btn btn-black custom-btn mt-3" @click="requestVerification">인증</button>
              </div>
            </td>
          </tr>
        </transition>

        <!-- 이메일 -->
        <tr>
          <td class="fw-bold fs-8 col-1">이메일</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <MaterialInput v-model="loginStore.signUpformData.emailPrefix" required class="input-group-outline mb-0"
                id="emailPrefix" :label="{ text: '이메일', class: 'form-label' }" type="text" style="flex: 1;" />
              <span class="mx-1">@</span>

              <template v-if="isCustomDomain">
                <MaterialInput v-model="loginStore.signUpformData.emailSuffix" class="input-group-outline mb-0 ms-2"
                  id="emailSuffix" type="text" style="flex: 1;" placeholder="도메인 입력" />
              </template>

              <template v-else>
                <select v-model="selectedDomain" class="form-select ms-2" @change="onDomainChange" style="flex: 1;">
                  <option value="" disabled selected>도메인 선택</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="etc">기타</option>
                </select>
              </template>

            </div>
          </td>
        </tr>

      </tbody>
    </table>

    <hr style="border-top: 2px solid #ccc;" />


  </div>
</template>

<style>
.form-select:focus {
  border-color: #007bff !important;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
}

.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.custom-file-upload:hover {
  background-color: #0056b3;
  /* 호버 시 색상 변경 */
}

.form-control-file {
  display: none;
  /* 기본 인풋 숨김 */
}
</style>