<template>
  <Header />
  <section class="py-8 luxurious-section">
    <div class="container">
      <h2 class="text-gold">Easy한 소리</h2>
      <!-- 유형 선택 -->
      <div class="mb-4">
        <label for="type-select" class="form-label">지점 선택</label>
        <select id="type-select" v-model="selectedaccommodationId" class="form-select">
          <option disabled value="">지점을 선택하세요</option>
          <option v-for="accommodation in accommodations" :key="accommodation.id" :value="accommodation.id">
            {{ accommodation.name }}
          </option>
        </select>
      </div>

      <!-- 주제 선택 -->
      <div class="mb-4">
        <label for="topic-select" class="form-label">주제 선택</label>
        <select id="topic-select" v-model="selectedTopic" class="form-select" @change="updateTypes">
          <option disabled value="">주제를 선택하세요</option>
          <option v-for="topic in topics" :key="topic.value" :value="topic.value">
            {{ topic.label }}
          </option>
        </select>
      </div>

      <!-- 유형 선택 -->
      <div class="mb-4">
        <label for="type-select" class="form-label">유형 선택</label>
        <select id="type-select" v-model="selectedType" class="form-select">
          <option disabled value="">유형을 선택하세요</option>
          <option v-for="type in filteredTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>

      <!-- 이메일 입력 (도메인 선택 추가) -->
      <div class="mb-4">
        <label class="form-label">이메일</label>
        <div class="input-group">
          <input v-model="emailPrefix" type="text" class="form-control bordered email-input" placeholder="이메일" />
          <select v-model="emailDomain" class="form-select bordered domain-select">
            <option value="">도메인 선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="yahoo.com">yahoo.com</option>
            <option value="기타">기타</option>
          </select>
          <input v-if="emailDomain === '기타'" v-model="customDomain" type="text"
            class="form-control bordered custom-domain-input" placeholder="기타 도메인 입력" />
        </div>
      </div>
      <div class="mb-4">
        <input v-model="title" type="text" class="form-control bordered" placeholder="제목" />
      </div>
      <div class="mb-4">
        <textarea v-model="content" class="form-control bordered" rows="8" placeholder="내용 입력"></textarea>
      </div>
      <div class="mb-4">
        <input type="file" @change="handleFileUpload" class="form-control-file" />
      </div>

      <!-- 약관 동의 (커스텀 체크박스) 및 자세히보기 -->
      <div class="mb-4 custom-checkbox-container">
        <input type="checkbox" v-model="termsAccepted" id="terms-checkbox" class="custom-checkbox"
          @change="updateAgreeType" />
        <label for="terms-checkbox" class="custom-checkbox-label">
          개인정보 수집 동의 및 이용문의
          <span class="details-link" @click="openModal">자세히보기</span>
        </label>
      </div>

      <!-- 모달 창 -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h3>개인정보 수집 동의 및 이용문의</h3>
          <p>개인정보 처리에 관한 내용을 여기에 기재합니다...</p>
          <button @click="closeModal" class="btn-dark">닫기</button>
        </div>
      </div>

      <!-- 제출 버튼 -->
      <button class="col-12 btn btn-gold" @click="submitForm">등록</button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Header from "@/examples/Header.vue";
import { suggestionStore } from "@/stores/suggestionStore";
import { useAccommodationStore } from "@/stores";
import { storeToRefs } from "pinia";

// const suggestion = suggestionStore();

const topics = ref([
  { label: "객실", value: "객실" },
  { label: "예약", value: "예약" },
  { label: "다이닝", value: "다이닝" },
  { label: "시설", value: "시설" },
  { label: "분실물", value: "분실물" },
  { label: "기타", value: "기타" },
]);

const allTypes = ref([
  { topic: "객실", label: "칭찬", value: "칭찬" },
  { topic: "객실", label: "문의", value: "문의" },
  { topic: "객실", label: "불만", value: "불만" },
  { topic: "예약", label: "제안", value: "제안" },
  { topic: "예약", label: "문의", value: "문의" },
  { topic: "다이닝", label: "불만", value: "불만" },
  { topic: "시설", label: "칭찬", value: "칭찬" },
  { topic: "시설", label: "제안", value: "제안" },
  { topic: "분실물", label: "문의", value: "문의" },
  { topic: "기타", label: "기타", value: "기타" },
]);

const selectedTopic = ref("");
const selectedType = ref("");
const filteredTypes = ref([]);
const showModal = ref(false);

const emailPrefix = ref("");
const emailDomain = ref("");
const customDomain = ref("");
const title = ref("");
const content = ref("");
const termsAccepted = ref(false);
const agreeType = ref("Disagree");
const selectedaccommodationId = ref();

const store = useAccommodationStore();
const sStore = suggestionStore();
const { accommodations } = storeToRefs(store);

onMounted(async () => {
  // 공지사항 조회하는 함수 호출 actions에서
  await store.fetchAccommodations();
});

const submitForm = async () => {
  try {
    if (!termsAccepted.value) {
      alert("약관에 동의해야 제출 가능합니다.");
      return;
    }

    // 이메일 주소 생성
    const emailAddress =
      emailDomain.value === "기타"
        ? `${emailPrefix.value}@${customDomain.value}`
        : `${emailPrefix.value}@${emailDomain.value}`;

    // 폼 제출 로직 처리
    console.log("Form submitted", {
      accommodationId: selectedaccommodationId.value,
      subject: selectedTopic.value,
      type: selectedType.value,
      email: emailAddress,
      title: title.value,
      content: content.value,
      agreementType: agreeType.value,
    });

    // 비동기 작업 예시: API 호출
    await sStore.submitSuggestion({
      accommodationId: selectedaccommodationId.value,
      subject: selectedTopic.value,
      type: selectedType.value,
      email: emailAddress,
      title: title.value,
      content: content.value,
      agreementType: agreeType.value,
    });

    // console.log("Suggestion submitted successfully", response);
  } catch (error) {
    console.error("Error submitting suggestion:", error);
  }
};

// 주제 선택 시 유형 업데이트
const updateTypes = () => {
  filteredTypes.value = allTypes.value.filter(
    (type) => type.topic === selectedTopic.value
  );
};

// 약관 체크 시 agreeType 값 변경
const updateAgreeType = () => {
  agreeType.value = termsAccepted.value ? "Agree" : "DisAgree";
};

// 모달 열기
const openModal = () => {
  showModal.value = true;
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
};

// 초기에 모든 유형을 필터링하지 않고 빈 배열로 설정
filteredTypes.value = allTypes.value;

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log(file);
};
</script>

<style scoped>
/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  /* 다른 요소들 위에 표시되도록 높은 z-index 값 */
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.details-link {
  color: #0d0d0d;
  cursor: pointer;
  margin-left: 5px;
  text-decoration: underline;
}

.details-link:hover {
  text-decoration: underline;
}

.custom-checkbox-container {
  display: flex;
  align-items: center;
  padding: 8px;
  /* 회색 테두리 */
  background-color: #efefef;
}

.custom-checkbox-container,
.custom-checkbox {
  padding: 8px;
  border-radius: 0;
  /* 직각 테두리 */
}

.custom-checkbox {
  width: 12px;
  /* 체크박스의 너비 */
  height: 12px;
  /* 체크박스의 높이 */
  margin-top: 10px;
  margin-left: 10px;
  transform: scale(1.5);
  /* 체크박스 크기를 1.5배로 확대 */
  -webkit-transform: scale(1.5);
  /* 웹킷 브라우저용 */
  -moz-transform: scale(1.5);
  /* 파이어폭스용 */
  -ms-transform: scale(1.5);
  /* 구형 IE용 */
  -o-transform: scale(1.5);
  /* 구형 오페라용 */
}

/* 스타일 정의 */
.container {
  max-width: 700px;
  margin: 0 auto;
}

.form-select,
.form-control,
.custom-checkbox {
  border: 1px solid #ddd;
  font-size: 16px;
  padding: 8px 12px;
  margin-bottom: 20px;
  color: #333;
  border-radius: 0;
  /* 직각 테두리 */
}

textarea {
  resize: none;
  font-size: 1rem;
}

.luxurious-section {
  background-color: #f9f9f9;
  /* 배경을 밝은 색으로 */
  padding: 2rem;
  box-shadow: none;
  /* 그림자 제거 */
}

.text-dark {
  color: #333;
  /* 어두운 색 텍스트 */
}

.bordered {
  border: 1px solid #ccc;
}

.email-input,
.domain-select {
  height: 40px;
}

.custom-domain-input {
  width: 60%;
}

.btn-dark {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
}

.btn-dark:hover {
  background-color: #555;
}

.custom-checkbox-label {
  margin-left: 0.5rem;
}

.btn {
  background-color: rgb(0, 0, 0);
  color: #f9f9f9;
  font-size: medium;
}
</style>
