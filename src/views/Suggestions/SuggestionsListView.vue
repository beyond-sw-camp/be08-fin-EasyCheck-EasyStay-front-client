<template>
  <navbar-default />
  <Header />
  <section class="py-6">
    <div class="container">
      <h3>건의사항 작성</h3>

      <!-- 주제 선택 -->
      <div class="mb-4">
        <label for="topic-select" class="form-label">주제 선택</label>
        <select
          id="topic-select"
          v-model="selectedTopic"
          class="form-select"
          @change="updateTypes"
        >
          <option disabled value="">주제를 선택하세요</option>
          <option
            v-for="topic in topics"
            :key="topic.value"
            :value="topic.value"
          >
            {{ topic.label }}
          </option>
        </select>
      </div>

      <!-- 유형 선택 -->
      <div class="mb-4">
        <label for="type-select" class="form-label">유형 선택</label>
        <select id="type-select" v-model="selectedType" class="form-select">
          <option disabled value="">유형을 선택하세요</option>
          <option
            v-for="type in filteredTypes"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </option>
        </select>
      </div>

      <!-- 이메일 입력 (도메인 선택 추가) -->
      <div class="mb-4">
        <label class="form-label">이메일</label>
        <div class="input-group">
          <input
            v-model="emailPrefix"
            type="text"
            class="form-control bordered email-input"
            placeholder="이메일"
          />
          <select
            v-model="emailDomain"
            class="form-select bordered domain-select"
          >
            <option value="">도메인 선택</option>
            <option value="@gmail.com">@gmail.com</option>
            <option value="@naver.com">@naver.com</option>
            <option value="@daum.net">@daum.net</option>
            <option value="@yahoo.com">@yahoo.com</option>
            <option value="기타">기타</option>
          </select>
          <input
            v-if="emailDomain === '기타'"
            v-model="customDomain"
            type="text"
            class="form-control bordered custom-domain-input"
            placeholder="기타 도메인 입력"
          />
        </div>
      </div>
      <div class="mb-4">
        <input
          v-model="title"
          type="text"
          class="form-control bordered"
          placeholder="제목"
        />
      </div>
      <div class="mb-4">
        <textarea
          v-model="content"
          class="form-control bordered"
          rows="8"
          placeholder="내용 입력"
        ></textarea>
      </div>
      <div class="mb-4">
        <input
          type="file"
          @change="handleFileUpload"
          class="form-control-file"
        />
      </div>

      <!-- 약관 동의 (커스텀 체크박스) -->
      <div class="mb-4 custom-checkbox-container">
        <input
          type="checkbox"
          v-model="termsAccepted"
          id="terms-checkbox"
          class="custom-checkbox"
        />
        <label for="terms-checkbox" class="custom-checkbox-label">
          약관에 동의합니다
        </label>
      </div>

      <!-- 제출 버튼 -->
      <button class="btn btn-primary" @click="submitForm">제출</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

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

const emailPrefix = ref("");
const emailDomain = ref("");
const customDomain = ref("");
const title = ref("");
const content = ref("");
const termsAccepted = ref(false);

// 주제 선택 시 유형 업데이트
const updateTypes = () => {
  filteredTypes.value = allTypes.value.filter(
    (type) => type.topic === selectedTopic.value
  );
};

// 초기에 모든 유형을 필터링하지 않고 빈 배열로 설정
filteredTypes.value = allTypes.value;

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log(file);
};

const submitForm = () => {
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
    topic: selectedTopic.value,
    type: selectedType.value,
    email: emailAddress,
    title: title.value,
    content: content.value,
  });
};
</script>

<style scoped>
/* 스타일 정의 */
.container {
  max-width: 800px;
  margin: 0 auto;
}

.form-select {
  margin-bottom: 20px;
}

textarea {
  resize: none;
  font-size: 1rem;
}

/* 테두리 스타일 */
.bordered {
  border: 1px solid #ced4da; /* 기본 테두리 색상 */
  border-radius: 0.25rem; /* 테두리 둥글게 */
  padding: 0.375rem 0.75rem; /* 패딩 추가 */
}

/* 이메일 입력 크기 조정 */
.email-input {
  width: 60%; /* 입력란 너비 조정 */
  height: 40px;
}

.domain-select {
  width: 30%; /* 도메인 선택 너비 조정 */
  height: 40px;
}

.custom-domain-input {
  width: 60%; /* 기타 도메인 입력란 너비 조정 */
}

/* 커스텀 체크박스 스타일 */
.custom-checkbox-container {
  display: flex;
  align-items: center;
}

.custom-checkbox {
  display: none;
}

.custom-checkbox-label {
  position: relative;
  padding-left: 30px; /* 크기를 줄임 */
  font-size: 0.9rem; /* 약관 동의 텍스트 크기를 줄임 */
  cursor: pointer;
  user-select: none;
}

.custom-checkbox-label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 18px; /* 크기를 줄임 */
  height: 18px; /* 크기를 줄임 */
  border: 2px solid #007bff;
  border-radius: 4px;
  background-color: white;
  transition: background-color 0.3s ease;
}

.custom-checkbox:checked + .custom-checkbox-label:before {
  background-color: #007bff;
}

.custom-checkbox-label:after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 10px;
  height: 16px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-checkbox:checked + .custom-checkbox-label:after {
  opacity: 1;
}
</style>
