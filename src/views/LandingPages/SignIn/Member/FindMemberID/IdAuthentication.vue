<script setup>
import { onMounted, ref, computed } from "vue";
import MaterialInput from "@/components/MaterialInput.vue";
import { userLoginStore } from "@/stores/loginStore";
import { useRouter } from "vue-router";

import Modal from "../../Sections/Modal.vue";

import setMaterialInput from "@/assets/js/material-input";

onMounted(() => {
  setMaterialInput();
});

// 약관 자세히 보기 내용
const consentItems = ref([
  {
    label: '개인정보 이용 동의 (필수)',
    checked: false,
    detail: `
      본인은 EASY STAY(이하 ‘회사’라 합니다)가 제공하는 본인확인서비스(이하 ‘서비스’라 합니다)를 이용하기 위해, 다음과 같이 ‘회사’가 본인의 개인정보를 수집/이용하고, 개인정보의 취급을 위탁하는 것에 동의합니다. <br><br>
      <h5> 1. 수집항목</h5>
      <ul>
        <li>이용자의 성명, 이동전화번호, 가입한 이동전화 회사</li>
        <li>연계정보(CI), 중복가입확인정보(DI)</li>
        <li>이용자가 이용하는 웹사이트 또는 Application 정보, 이용일시</li>
        <li>가입한 이동전화회사 및 이동전화브랜드</li>
      </ul>
      <h5>2. 이용목적</h5>
      <ul>
        <li>이용자가 웹사이트 또는 Application에 입력한 본인확인정보의 정확성 여부 확인 (본인확인서비스 제공)</li>
        <li>해당 웹사이트 또는 Application에 연계정보(CI)/중복가입확인정보(DI) 전송</li>
        <li>서비스 관련 상담 및 불만 처리 등</li>
        <li>이용 웹사이트/Application 정보 등에 대한 분석 및 세분화를 통한, 이용자의 서비스 이용 선호도 분석</li>
      </ul>
      <h5>3. 개인정보의 보유 및 이용기간</h5>
      <p>이용자가 서비스를 이용하는 기간에 한하여 보유 및 이용. 다만, 아래의 경우는 제외:</p>
      <ul>
        <li>법령에서 정하는 경우 해당 기간까지 보유 (상세 사항은 회사의 개인정보취급방침에 기재된 바에 따름)</li>
      </ul>
    `,
    type: '필수',
  },
  {
    label: '고유식별 정보 처리 동의 (필수)',
    checked: false,
    detail: `
      본인은 EASY STAY(이하 ‘회사’라 합니다)가 제공하는 본인확인서비스(이하 ‘서비스’라 합니다)를 이용하기 위해, 다음과 같이 본인의 개인정보를 회사가 아래 기재된 제3자에게 제공하는 것에 동의합니다. <br><br>
      <h5>1. 고유식별정보를 제공받는 자</h5>
      <ul>
        <li>NICE평가정보(주)</li>
        <li>SCI평가정보(주)</li>
      </ul>
      <h5>2. 고유식별정보를 제공받는 자의 목적</h5>
      <ul>
        <li>연계정보(CI)/중복가입확인정보(DI) 생성 및 회사에 제공</li>
        <li>부정 이용 방지 및 민원 처리</li>
      </ul>
      <h5>3. 제공하는 개인정보 항목</h5>
      <p>회사가 보유하고 있는 고객의 주민등록번호 및 외국인등록번호</p>
      <h5>4. 고유식별정보를 제공받는 자의 보유 및 이용기간</h5>
      <p>연계정보(CI)/중복가입확인정보(DI) 생성 후 3개월</p>
      <h5>5. 위 개인정보 수집, 이용 및 취급위탁에 동의하지 않을 권리가 있으며, 동의하지 않으실 경우 서비스를 이용할 수 없습니다.</h5>
    `,
    type: '필수',
  },
  {
    label: '서비스 이용약관 동의 (필수)',
    checked: false,
    detail: `
<h5>제 1 조 (목적)</h5>
      <p>본 약관은 SCI평가정보㈜(이하 ‘회사’라 한다)가 제공하는 본인확인서비스(이하 ‘서비스’라 한다)에 관한 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.</p>
      
      <h5>제 2 조 (약관의 효력 및 변경)</h5>
      <ol>
        <li>본 약관은 ‘이용자’에게 ‘서비스’ 화면에 게시하거나, 기타의 방법으로 공지하는 것으로 효력이 발생합니다.</li>
        <li>‘회사’는 약관의 규제에 관한 법률 및 기타 관련 법령에 위배되지 않는 범위에서 본 약관의 내용을 개정할 수 있으며, 변경된 경우에는 제1항과 같은 방법으로 공지합니다. 다만 ‘이용자’의 권리와 의무에 관한 중요한 사항은 변경된 내용의 시행 15일 이전에 공지합니다.</li>
        <li>‘이용자’는 변경된 약관에 대한 내용을 알지 못하여 발생하는 손해 및 피해에 대해서는 ‘회사’가 책임을 지지 않습니다.</li>
      </ol>

      <h5>제 3 조 (약관 외 준칙)</h5>
      <p>본 약관에 명시되지 아니한 사항에 대해서는 정보통신망 이용 촉진 및 정보보호 등에 관한 법률 등 기타 관련 법령 또는 상관례에 따릅니다.</p>
    `,
    type: '필수',
  },
  {
    label: '통신사 이용약관 동의 (필수)',
    checked: false,
    detail: `
      <h5>제 1 조 (목적)</h5>
      <p>이 약관은 ‘본인확인서비스’를 제공하는 에스케이텔레콤 주식회사(이하 ‘회사’라 합니다)와 ‘본인확인서비스’ 이용자 (이하 ‘이용자’라 합니다)간에 ‘본인확인서비스’ 이용에 관한 ‘회사’와 ‘이용자’의 권리와 의무, 기타 제반 사항을 정함을 목적으로 합니다.</p>
    `,
    type: '필수',
  },
]);

// 약관 모두 동의
const toggleAll = () => {
  const isCheckedValue = isAllChecked.value; // 전체 체크 상태
  consentItems.value.forEach(item => {
    item.checked = isCheckedValue; // 모든 항목의 체크 상태를 설정
  });
};

const isAllChecked = computed({
  get() {
    // 모든 항목이 체크되어 있으면 true
    return consentItems.value.every(item => item.checked);
  },
  set(value) {
    // 전체 체크박스가 체크/해제되면 개별 항목도 업데이트
    consentItems.value.forEach(item => {
      item.checked = value;
    });
  }
});

// 전화번호
const selectedCarrier = ref('');
const selectedPhonePrefix = ref('010');
const phoneMiddle = ref('');
const phoneSuffix = ref('');

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
const isVerificationRequested = ref(false);
const isPhoneVerified = ref(false);

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

function onAuthenticationSuccess() {
  loginStore.isAuthenticated = true; // 인증 성공 시 상태 변경
  loginStore.isPhoneVerified = true;
}

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

// 자세히 보기 모달창 변수
const isModalVisible = ref(false);
const modalTitle = ref('');
const modalContent = ref('');

// 모달창 열기
const showModal = (title, content) => {
  modalTitle.value = title;
  modalContent.value = content;
  isModalVisible.value = true;
};

// 모달창 닫기
const closeModal = () => {
  isModalVisible.value = false;
};

const router = useRouter();
const userName = ref('');
const userPhone = ref('');

function goToMain() {
  router.push('/');
}

const foundEmails = ref([]); // 이메일 목록 배열

const handleFindEmail = async () => {
  console.log("인증 상태:", isPhoneVerified.value);
  if (!loginStore.isPhoneVerified) {
    alert("전화번호 인증이 필요합니다.");
    return;
  }

  try {
    const emails = await loginStore.findEmail(userName.value, userPhone.value);
    if (emails && emails.length > 0) {
      foundEmails.value = emails;
      loginStore.setFoundEmails(emails);
      router.push('/users/findId');
    } else {
      alert("이메일을 찾을 수 없습니다. 이름과 전화번호를 확인해주세요.");
    }
  } catch (error) {
    console.error('Error finding email:', error.message);
    alert("이메일 찾기 중 오류가 발생했습니다.");
  }
};



</script>

<template>
  <div class="align-items-start">
    <h4 class="text-left">동의 항목 목록</h4>
    <p class="text-left">아래 항목에 대해 동의해 주시기 바랍니다.</p>

    <table class="table text-left">
      <thead>
        <tr>
          <th scope="col" class="col-5">동의 항목</th>
          <th scope="col" class="col-2">동의</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-black-50">휴대폰 인증 전체 동의</td>
          <td>
            <input type="checkbox" v-model="isAllChecked" @change="toggleAll" />
          </td>
        </tr>
        <tr v-for="(item, index) in consentItems" :key="index">
          <td>
            {{ item.label }}
            <button @click="showModal(item.label, item.detail)" class="btn btn-link text-secondary mt-3">자세히 보기</button>
          </td>
          <td>
            <input type="checkbox" v-model="item.checked" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

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
          <div class="d-flex align-items-center col-9">
            <MaterialInput v-model="name" class="input-group-outline mb-0 custom-check-btn" id="name"
              :label="{ text: '성함', class: 'form-label' }" type="text" />
          </div>
        </td>
      </tr>

      <!-- 전화번호 -->
      <tr>
        <td class="fw-bold fs-8">전화번호</td>
        <td>
          <div class="d-flex align-items-center col-9">
            <select id="carrier" class="form-select me-2" v-model="selectedCarrier" style="width: 20%;">
              <option value="" disabled selected>통신사 선택</option>
              <option v-for="carrier in carrierOptions" :key="carrier.value" :value="carrier.value">
                {{ carrier.text }}
              </option>
            </select>

            <select id="phonePrefix" class="form-select me-2" v-model="selectedPhonePrefix" style="width: 15%;">
              <option v-for="input in phoneFields.inputs" :key="input.id" :value="input.text">
                {{ input.text }}
              </option>
            </select>

            <MaterialInput class="input-group-outline mb-0 me-2" v-model="phoneMiddle" type="text" maxlength="4"
              style="width: 25%;" />
            <MaterialInput class="input-group-outline mb-0" v-model="phoneSuffix" type="text" maxlength="4"
              style="width: 25%; margin-right: 10px;" />

            <button class="btn btn-black custom-btn mt-3" @click="authenticatePhone">
              인증 요청
            </button>
          </div>
        </td>
      </tr>
      <transition name="slide-fade">
        <tr v-if="isVerificationRequested">
          <td class="fw-bold fs-8">인증번호</td>
          <td>
            <div class="d-flex align-items-center justify-content-start col-9">
              <MaterialInput class="input-group-outline mb-0" v-model="verificationCode" type="text"
                placeholder="인증번호 입력" style="width: 25%; margin-right: 10px;" />
              <button id="verifyCode" class="btn btn-black custom-btn mt-3" @click="requestVerification"
                maxlength="8">인증</button>
            </div>
          </td>
        </tr>
      </transition>
    </tbody>
  </table>

  <hr style="border-top: 2px solid #ccc;" />

  <!-- 버튼 -->
  <div class="text-center mt-4 mb-5">
    <MaterialButton @click="goToMain" class="btn btn-secondary">
      취소
    </MaterialButton>
    <MaterialButton @click="handleFindEmail" class="btn btn-primary ms-2">
      아이디 찾기
    </MaterialButton>
  </div>

  <Modal :isVisible="isModalVisible" :title="modalTitle" :content="modalContent" @close="closeModal" />
</template>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
  padding: 0.5rem 0.75rem;
  /* 간격 조정 */
}

.text-left {
  text-align: left;
}

.table {
  width: 60%;
}

.custom-check-btn {
  padding: -10px -24px;
  /* 상하 패딩과 좌우 패딩을 줄입니다. */
  font-size: 0.875rem;
  /* 폰트 크기를 줄입니다. */
  line-height: 1;
  /* 줄 높이를 조정하여 버튼의 높이를 줄입니다. */
}
</style>