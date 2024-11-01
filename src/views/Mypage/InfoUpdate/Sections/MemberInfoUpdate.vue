<script setup>
import { onMounted, ref } from "vue";
import { userLoginStore } from "@/stores/loginStore";
import { mypageStore } from '@/stores/mypageStore';

// Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import MaterialButton from "@/components/MaterialButton.vue";
import router from "@/router";

const userInfo = ref({
  email: '',
  password: '',
  name: '',
  phone: '',
  addr: '',
  addr_detail: '',
  roadAddress: '',
  jibunAddress: '',
  detailAddress: ''
});

const loginStore = userLoginStore();
const mypage = mypageStore();
const error = ref(null);
const success = ref(null);

// 사용자 정보 불러오기
const loadUserData = async () => {
  try {
    await loginStore.getUserData(); // 로그인 스토어의 사용자 정보 가져오기
    userInfo.value = { ...loginStore.userData }; // 데이터를 복사
  } catch (error) {
    error.value = error.message;
    console.error("사용자 정보 로드 오류:", error.message);
  }
};

onMounted(async () => {
  setMaterialInput();
  await loadUserData();
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
    { id: 'phonePrefix2', text: '02' },
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
      postcode.value = data.zonecode; // 우편번호
      userInfo.value.roadAddress = data.roadAddress; // 도로명주소
      userInfo.value.jibunAddress = data.jibunAddress; // 지번주소
      userInfo.value.detailAddress = ''; // 상세주소 초기화
    },
  }).open();
};


const emit = defineEmits(['update']);

// 개인정보 수정 메서드
const updateUserData = async () => {
  try {
    await mypage.updateUserData(
      userInfo.value.email,
      userInfo.value.phone,
      userInfo.value.roadAddress,
      userInfo.value.detailAddress
    );
    success.value = "정보 수정 성공";
    emit('update');
  } catch (err) {
    error.value = err.message;
  }
};

const handleButtonClick = () => {
  updateUserData();
};

function goToMain() {
  router.push('/');
}

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
              <select id="carrier" class="form-select me-2" v-model="userInfo.selectedCarrier" style="width: 120px;">
                <option value="" disabled selected>통신사 선택</option>
                <option v-for="carrier in carrierOptions" :key="carrier.value" :value="carrier.value">
                  {{ carrier.text }}
                </option>
              </select>

              <!-- 전화번호 -->
              <select id="phonePrefix" class="form-select me-2" v-model="userInfo.selectedPhonePrefix"
                style="width: 80px;">
                <option v-for="input in phoneFields.inputs" :key="input.id" :value="input.text">
                  {{ input.text }}
                </option>
              </select>

              <MaterialInput v-model="userInfo.phoneMiddle" class="input-group-outline mb-0 me-2" id="phoneMiddle"
                type="text" maxlength="4" style="width: 60px;" />
              <MaterialInput v-model="userInfo.phoneSuffix" class="input-group-outline mb-0" id="phoneSuffix"
                type="text" maxlength="4" style="width: 60px;" />
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
              <MaterialInput v-model="userInfo.roadAddress" class="input-group-outline mb-2" placeholder="도로명주소" />
              <MaterialInput v-model="userInfo.jibunAddress" class="input-group-outline mb-2" placeholder="지번주소" />
              <MaterialInput v-model="userInfo.detailAddress" class="input-group-outline mb-2" placeholder="상세주소" />
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

    <hr style="border-top: 2px solid #ccc;" />
    <!-- 버튼 -->
    <div class="text-center mt-4 mb-5">
      <MaterialButton @click="goToMain" class="btn btn-light">
        취소
      </MaterialButton>
      <MaterialButton @click="handleButtonClick" class="btn btn-dark ms-2">
        다음
      </MaterialButton>
    </div>
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