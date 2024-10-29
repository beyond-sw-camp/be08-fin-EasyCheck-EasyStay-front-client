<script setup>
import { onMounted, ref, computed } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";
import { userLoginStore } from "@/stores/loginStore";
import setMaterialInput from "@/assets/js/material-input";

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

const selectedCarrier = ref('');
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

// 인증번호 요청
const loginStore = userLoginStore();
const isVerificationRequested = ref(false); // 초기값을 false로 설정

const authenticatePhone = async () => {
  if (!isAllChecked.value) {
    alert("모든 약관에 동의해야 인증번호를 요청할 수 있습니다.");
    return;
  }

  isVerificationRequested.value = true;
  loginStore.setPhoneNumbers(selectedPhonePrefix.value, phoneMiddle.value, phoneSuffix.value);

  try {
    await loginStore.handlePhoneAuthentication();
    alert("인증번호 요청이 성공적으로 전송되었습니다.");
  } catch (error) {
    console.error('Error during phone authentication:', error.message);
    alert("인증번호 요청 중 오류가 발생했습니다.");
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
    const message = await loginStore.verifyCode(phoneNumber, verificationCode.value);
    console.log(message);

    // 인증 성공 시 상태 변경
    onAuthenticationSuccess();
  } catch (error) {
    console.error('Error during verification:', error.message);
  }
};

function onAuthenticationSuccess() {
  loginStore.isAuthenticated = true; // 인증 성공 시 상태 변경
  alert("인증에 성공했습니다!");
}

</script>

<template>
  <div class="align-items-start" loading="lazy">
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

    <table class="table mt-5">
      <tbody>
        <tr>
          <td colspan="2">
            <div class="text-start">
              <h5 class="text-black mb-2">회원 정보 입력</h5>
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
              <select id="phonePrefix" class="form-select me-2" v-model="selectedPhonePrefix" style="width: 15%;">
                <option v-for="input in phoneFields.inputs" :key="input.id" :value="input.text">
                  {{ input.text }}
                </option>
              </select>

              <MaterialInput class="input-group-outline mb-0 me-2" v-model="phoneMiddle" type="text"
                style="width: 25%;" />
              <MaterialInput class="input-group-outline mb-0" v-model="phoneSuffix" type="text"
                style="width: 25%; margin-right: 10px;" />

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
                <MaterialInput class="input-group-outline mb-0" v-model="verificationCode" type="text"
                  placeholder="인증번호 입력" style="width: 25%; margin-right: 10px;" />
                <button id="verifyCode" class="btn btn-black custom-btn mt-3" @click="requestVerification">인증</button>
              </div>
            </td>
          </tr>
        </transition>
      </tbody>
    </table>

    <hr style="border-top: 2px solid #ccc;" />
  </div>
</template>
