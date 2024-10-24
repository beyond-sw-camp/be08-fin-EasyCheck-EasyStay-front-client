<script setup>
import { onMounted, ref } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import apiClient from "@/api";

// Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import MaterialButton from "@/components/MaterialButton.vue";

const store = userLoginStore();
const userInfo = ref({
  email: '',
  password: '',
  name: '',
  phone: '',
  addr: '',
  addr_detail: '',
});
const error = ref(null);

// Initialize MaterialInput on mount
onMounted(async () => {
  setMaterialInput();
  try {
    const response = await apiClient.get("/users/info");
    console.log(response.data); // 응답 데이터 확인
    userInfo.value = response.data; // 사용자 정보 저장
  } catch (error) {
    console.error("사용자 정보 로드 오류:", error.response?.data?.message || "정보를 가져오는 데 실패했습니다.");
  }
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

const searchZipCode = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      postcode.value = data.zonecode; // 올바른 키를 사용
      roadAddress.value = data.roadAddress; // 도로명주소
      jibunAddress.value = data.jibunAddress; // 지번주소
      detailAddress.value = ''; // 상세주소 초기화
    },
  }).open();
};

const showNewPasswordInput = ref(false); // 새 비밀번호 입력박스를 보여줄지 여부

// 새로운 비밀번호를 저장할 ref
const oldPassword = ref(''); // 현재 비밀번호
const newPassword = ref(''); // 새 비밀번호

// 비밀번호 변경 메소드
const changePW = async () => {
  try {
    // 값 로그 찍기
    console.log("비밀번호 변경 요청 데이터:", {
      email: userInfo.value.email,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    const response = await apiClient.patch("/users/change-password", {
      email: userInfo.value.email, // 이메일 추가
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    console.log("비밀번호 변경 성공:", response.data);
  } catch (error) {
    console.error("비밀번호 변경 오류:", error.response?.data?.message || "비밀번호 변경에 실패했습니다.");
  }
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
            <div class="d-flex align-items-ceneter col-5">
              <span>{{ userInfo.email }}</span>
            </div>
          </td>
        </tr>

        <tr>
          <td class="fw-bold fs-8">비밀번호</td>
          <td>
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center mb-2 col-5">
                <MaterialInput v-model="oldPassword" class="input-group-outline mb-0" id="current-password"
                  :label="{ text: '현재 비밀번호', class: 'form-label' }" type="password" style="width: 150px;" />
                <MaterialButton @click="showNewPasswordInput = !showNewPasswordInput" class="btn btn-light ms-2"
                  style="width: 80px; padding: 5px;">
                  변경
                </MaterialButton>
              </div>

              <transition name="slide-fade">
                <div v-if="showNewPasswordInput" class="d-flex align-items-center col-5">
                  <MaterialInput v-model="newPassword" class="input-group-outline mb-0" id="new-password"
                    :label="{ text: '새 비밀번호', class: 'form-label' }" type="password" style="width: 150px;" />
                  <MaterialButton @click="changePW" class="btn ms-2 btn-dark" style="width: 80px; padding: 5px;">
                    변경 완료
                  </MaterialButton>
                </div>
              </transition>
            </div>
          </td>
        </tr>


        <!-- 성함 -->
        <tr>
          <td class="fw-bold fs-8">성함</td>
          <td>
            <div class="d-flex align-items-ceneter col-5">
              <span>{{ userInfo.name }}</span>
            </div>
          </td>
        </tr>

        <!-- 전화번호 -->
        <tr>
          <td class="fw-bold fs-8">전화번호</td>
          <td>
            <div class="d-flex align-items-center col-5">
              <!-- 통신사 -->
              <select id="carrier" class="form-select me-2" v-model="selectedCarrier" style="width: 120px;">
                <option value="" disabled selected>통신사 선택</option>
                <option v-for="carrier in carrierOptions" :key="carrier.value" :value="carrier.value">
                  {{ carrier.text }}
                </option>
              </select>

              <!-- 전화번호 -->
              <select id="phonePrefix" class="form-select me-2" v-model="selectedPhonePrefix" style="width: 80px;">
                <option v-for="input in phoneFields.inputs" :key="input.id" :value="input.text">
                  {{ input.text }}
                </option>
              </select>

              <MaterialInput class="input-group-outline mb-0 me-2" id="phoneMiddle" type="text" maxlength="4"
                style="width: 60px;" />
              <MaterialInput class="input-group-outline mb-0" id="phoneSuffix" type="text" maxlength="4"
                style="width: 60px;" />
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
              <button type="button" class="btn btn-light mb-0" @click="searchZipCode">주소 검색</button>
            </div>
            <div class="mt-2 col-5">
              <MaterialInput v-model="roadAddress" class="input-group-outline mb-2" placeholder="도로명주소" />
              <MaterialInput v-model="jibunAddress" class="input-group-outline mb-2" placeholder="지번주소" />
              <MaterialInput v-model="detailAddress" class="input-group-outline mb-2" placeholder="상세주소" />
            </div>
          </td>
        </tr>

      </tbody>
    </table>

    <hr style="border-top: 2px solid #ccc;" />

  </div>
</template>

<style scoped>
.form-select:focus {
  border-color: #007bff !important;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active in <2.1.8 */
  {
  opacity: 0;
  transform: translateY(-10px);
  /* 위로 살짝 이동 */
  height: 0;
  /* 높이를 0으로 설정 */
}

.input-group-outline {
  /* 두 개의 입력박스가 같은 너비를 차지하도록 */
  flex: 1;
}

.table td {
  vertical-align: middle;
}
</style>