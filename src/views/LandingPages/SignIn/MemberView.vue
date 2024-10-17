<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';

// example components
import Header from "@/examples/Header.vue";

// Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

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
    { id: 'phonePrefix3', text: '016' },
    { id: 'phonePrefix4', text: '017' },
    { id: 'phonePrefix5', text: '018' },
    { id: 'phonePrefix6', text: '019' },
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

const selectedCarrier = ref('');
const selectedPhonePrefix = ref('010');

// 라우터
const router = useRouter();

function goToMain() {
  router.push('/');
}

function requestVerification() {
  router.push('/joinComplete');
}

</script>

<template>
  <NavbarDefault />
  <Header>
    <div class="page-header align-items-start min-vh-100" loading="lazy">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-white shadow-succes py-3 mb-5 text-start">
              <h2 class="text-black mb-0">회원가입</h2>
              <h5 class="text-black fw-normal mt-4">회원가입을 위해 휴대폰 본인 인증을 해주세요.</h5>
            </div>
          </div>
        </div>

        <hr class="my-2" style="border-top: 3px solid #000;" />

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

        <!-- 인증정보 입력 -->
        <div class="row">
          <div class="col-12">
            <div class="text-start mt-5">
              <h6 class="text-black mb-0">인증정보 입력</h6>
              <hr class="my-2" style="border-top: 3px solid #000;" />
            </div>
          </div>
        </div>

        <!-- 이름 -->
        <div class="row mb-3">
          <div class="col-2 d-flex align-items-center">
            <label for="nameInput" class="fw-bold mb-0">이름</label>
          </div>
          <div class="col-3">
            <MaterialInput class="input-group-outline mb-0" id="name" :label="{ text: '이름', class: 'form-label' }"
              type="text" />
          </div>
        </div>

        <hr style="border-top: 2px solid #ccc;" />

        <!-- 생년월일/성별 -->
        <div class="row mb-3">
          <div class="col-2 d-flex align-items-center">
            <label for="birth" class="fw-bold mb-0">생년월일</label>
          </div>
          <div class="col-3 d-flex align-items-center">
            <div class="col-4 p-0 me-2">
              <MaterialInput class="input-group-outline mb-0" id="birth" :label="{ text: '생년월일', class: 'form-label' }"
                type="text" />
            </div>
            <span class="align-self-center fs-5">-</span>
            <div class="col-2 p-0">
              <MaterialInput class="input-group-outline mb-0" id="gender" type="text" />
            </div>
            <span class="ms-2">●●●●●●</span>
          </div>
        </div>

        <hr style="border-top: 2px solid #ccc;" />

        <!-- 전화번호 -->
        <div class="row mb-0">
          <div class="col-2 d-flex align-items-center">
            <label for="phone" class="fw-bold mb-0 pe-2">전화번호</label>
          </div>
          <div class="col-3 d-flex align-items-center mb-3">
            <!-- 통신사 -->
            <select id="carrier" class="form-select me-2" v-model="selectedCarrier">
              <option value="" disabled selected>통신사 선택</option>
              <option v-for="carrier in carrierOptions" :key="carrier.value" :value="carrier.value">
                {{ carrier.text }}
              </option>
            </select>

            <!-- 전화번호 -->
            <select id="phonePrefix" class="form-select me-2" v-model="selectedPhonePrefix">
              <option v-for="input in phoneFields.inputs" :key="input.id" :value="input.text">
                {{ input.text }}
              </option>
            </select>

            <MaterialInput class="input-group-outline mb-0 me-2" id="phoneMiddle" type="text" maxlength="4" />
            <MaterialInput class="input-group-outline mb-0" id="phoneSuffix" type="text" maxlength="4" />
          </div>
        </div>

        <hr style="border-top: 2px solid #ccc;" />

        <!-- 버튼 -->
        <div class="text-center mt-4">
          <MaterialButton @click="goToMain" class="btn btn-secondary">
            취소
          </MaterialButton>
          <MaterialButton @click="requestVerification" class="btn btn-primary ms-2">
            인증 요청
          </MaterialButton>
        </div>

      </div>
    </div>

  </Header>

  <!-- 푸터 -->
  <footer class="footer position-absolute bottom-2 py-2 w-100">
    <div class="container">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-12 col-md-6 my-auto">
          <div class="copyright text-center text-sm text-dark text-lg-start">
            © {{ new Date().getFullYear() }}, made with
            <i class="fa fa-heart" aria-hidden="true"></i> by
            <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-server.git"
              class="font-weight-bold text-dark" target="_blank">EASY CHECK</a>
            for a better web.
          </div>
        </div>
        <div class="col-12 col-md-6">
          <ul class="nav nav-footer justify-content-center justify-content-lg-end">
            <li class="nav-item">
              <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-server.git"
                class="nav-link text-dark" target="_blank">EASY CHECK</a>
            </li>
            <li class="nav-item">
              <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-front-client.git"
                class="nav-link text-dark" target="_blank">About Us</a>
            </li>
            <li class="nav-item">
              <a href="https://github.com/beyond-sw-camp/be08-fin-EasyCheck-EasyStay-front-admin.git"
                class="nav-link text-dark" target="_blank">GitHub</a>
            </li>
            <li class="nav-item">
              <a href="https://www.creative-tim.com/license" class="nav-link pe-0 text-dark" target="_blank">License</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.custom-checkbox {
  transform: scale(0.8);
}
</style>
