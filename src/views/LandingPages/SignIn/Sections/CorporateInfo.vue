<script setup>
import { onMounted, ref } from "vue";

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
    { id: 'phonePrefix1', text: '02' },
    { id: 'phonePrefix2', text: '031' },
    { id: 'phonePrefix3', text: '032' },
    { id: 'phonePrefix4', text: '033' },
    { id: 'phonePrefix5', text: '041' },
    { id: 'phonePrefix6', text: '042' },
    { id: 'phonePrefix7', text: '043' },
    { id: 'phonePrefix8', text: '044' },
    { id: 'phonePrefix9', text: '051' },
    { id: 'phonePrefix10', text: '052' },
    { id: 'phonePrefix11', text: '053' },
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

// 우편번호 검색 핸들러
const postcode = ref('');
const roadAddress = ref('');
const jibunAddress = ref('');
const detailAddress = ref('');
const extraAddress = ref('');

const searchZipCode = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      postcode.value = data.zonecode; // 올바른 키를 사용
      roadAddress.value = data.roadAddress; // 도로명주소
      jibunAddress.value = data.jibunAddress; // 지번주소
      detailAddress.value = ''; // 상세주소 초기화
      extraAddress.value = ''; // 참고항목 초기화
    },
  }).open();
};

const fileName = ref(''); // 선택된 파일 이름을 저장할 변수

const updateFileName = (event) => {
  if (event.target.files.length > 0) {
    fileName.value = event.target.files[0].name; // 선택된 파일 이름 저장
  } else {
    fileName.value = ''; // 파일이 선택되지 않았을 때 초기화
  }
};
</script>


<template>
  <div class="align-items-start" loading="lazy">

    <table class="table">
      <tbody>
        <!-- 인증정보 입력 -->
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
              <MaterialInput class="input-group-outline mb-0" id="username"
                :label="{ text: '아이디', class: 'form-label' }" type="text" />
            </div>
          </td>
        </tr>

        <!-- 비밀번호 -->
        <tr>
          <td class="fw-bold fs-8">비밀번호</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <MaterialInput class="input-group-outline mb-0" id="password"
                :label="{ text: '비밀번호', class: 'form-label' }" type="password" />
            </div>
          </td>
        </tr>

        <!-- 법인명 -->
        <tr>
          <td class="fw-bold fs-8">법인명</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <MaterialInput class="input-group-outline mb-0" id="name" :label="{ text: '법인명', class: 'form-label' }"
                type="text" />
            </div>
          </td>
        </tr>

        <!-- 사업자 번호 -->
        <tr>
          <td class="fw-bold fs-8">사업자 번호</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <MaterialInput class="input-group-outline mb-0 me-2" id="birth"
                :label="{ text: '사업자 번호', class: 'form-label' }" type="text" />
              <span class="align-self-center fs-5">- </span>
              <MaterialInput class="input-group-outline mb-0 me-2" id="gender" type="text" />
            </div>
          </td>
        </tr>

        <!-- 전화번호 -->
        <tr>
          <td class="fw-bold fs-8">전화번호</td>
          <td>
            <div class="d-flex align-items-center col-5">
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
          </td>
        </tr>

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
              <MaterialInput v-model="roadAddress" class="input-group-outline mb-2" placeholder="도로명주소" />
              <MaterialInput v-model="jibunAddress" class="input-group-outline mb-2" placeholder="지번주소" />
              <MaterialInput v-model="detailAddress" class="input-group-outline mb-2" placeholder="상세주소" />
            </div>
          </td>
        </tr>

        <!-- 인증 서류 -->
        <tr>
          <td class="fw-bold fs-8">인증 서류</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <label for="fileUpload" class="custom-file-upload">
                <i class="fas fa-upload"></i> 파일 선택
              </label>
              <input type="file" id="fileUpload" class="form-control-file d-none"
                accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" @change="updateFileName" />
              <span v-if="fileName" class="ms-2">{{ fileName }}</span> <!-- 파일 이름 표시 -->
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
  background-color: #0056b3; /* 호버 시 색상 변경 */
}

.form-control-file {
  display: none; /* 기본 인풋 숨김 */
}
</style>