<template>
  <navbar-default />
  <Header />
  <section class="py-6">
    <div class="container">
      <h3>Easy News</h3>

      <!-- 광고 이미지 추가 -->
      <div class="ad-banner mb-4">
        <img src="@/assets/img/003.png" alt="Ad Banner" class="img-fluid" />
      </div>

      <!-- 지점 선택 -->
      <div class="mb-4">
        <label for="resort-select" class="form-label">지점 선택</label>
        <select
          id="resort-select"
          v-model="selectedBranch"
          @change="fetchNotices"
          class="form-select"
        >
          <option
            v-for="branch in branches"
            :key="branch.id"
            :value="branch.id"
          >
            {{ branch.name }}
          </option>
        </select>
      </div>

      <!-- 검색 영역 -->
      <div class="mb-4 input-group">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="검색어 입력..."
          class="form-control search-input"
          @input="filterNotices"
        />
        <button class="btn btn-warning search-btn" @click="filterNotices">
          검색
        </button>
      </div>

      <!-- 공지사항 총 개수 -->
      <div class="mb-3">
        <p>Total notices: {{ filteredNotices.length }}</p>
      </div>

      <!-- 공지사항 리스트 -->
      <div v-if="filteredNotices.length > 0" class="notice-list">
        <div
          v-for="notice in filteredNotices"
          :key="notice.id"
          class="notice-item border p-3 mb-3"
        >
          <h5>{{ notice.title }}</h5>
          <p>{{ notice.content }}</p>
          <small class="text-muted">{{ formatDate(notice.date) }}</small>
        </div>
      </div>
      <div v-else>
        <p>공지사항이 존재하지않습니다.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

const branches = ref([
  { id: 1, name: "Seoul 리조트" },
  { id: 2, name: "Busan 리조트" },
  { id: 3, name: "Jeju 리조트" },
]);

const selectedBranch = ref(branches.value[0].id);
const notices = ref([]);
const filteredNotices = ref([]);
const searchQuery = ref("");

const fetchNotices = async () => {
  const exampleNotices = {
    1: [
      {
        id: 1,
        title: "서울리조트 휴관 안내",
        content:
          "서울리조트가 2024년 10월 23일부터 11월 23일까지 내부 사정상 휴관함을 알려드립니다. 그동안의 예약은 불가하며.....",
        date: "2024-10-20",
      },
      {
        id: 2,
        title: "서울리조트 편의시설 리모델링 안내",
        content:
          "서울리조트 CU가 리모델링함을 안내해드립니다. 2024/10/30부터 3일간 리모델링으로 인한 휴점을 안내해드립니다.",
        date: "2024-10-21",
      },
    ],
    2: [
      {
        id: 3,
        title: "부산 해운대",
        content:
          "부산 리조트를 사용하시는 고객분들께 안내해드립니다. 리조트 앞 해운대 바로국밥을 꼭 드셔보시길 바랍니다.",
        date: "2024-10-18",
      },
    ],
    3: [],
  };

  notices.value = exampleNotices[selectedBranch.value] || [];
  filterNotices();
};

const filterNotices = () => {
  const query = searchQuery.value.toLowerCase();
  filteredNotices.value = notices.value.filter(
    (notice) =>
      notice.title.toLowerCase().includes(query) ||
      notice.content.toLowerCase().includes(query)
  );
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(fetchNotices);
</script>

<style lang="scss" scoped>
.notice-list {
  .notice-item {
    background-color: #f8f9fa;
    border-radius: 4px;
  }
}

/* 검색 입력 필드 및 버튼 스타일 */
.search-input {
  border: 2px solid #ced4da; /* 테두리 추가 */
  border-radius: 4px 0 0 4px; /* 좌측 모서리 둥글게 */
  padding: 10px;
  height: 40px; /* 입력 칸 높이 설정 */
  margin-right: 50px;
  margin-top: 10px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #007bff; /* 포커스 시 파란색 테두리 */
  }
}

.search-btn {
  background-color: #007bff; /* 파란색 버튼 */
  //   border: 2px solid #007bff;
  border-radius: 0 4px 4px 0; /* 우측 모서리 둥글게 */
  color: white;
  padding: 10px 20px;
  height: 40px; /* 버튼 높이 입력 칸과 동일하게 설정 */
  margin-top: 25px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    // background-color: #0056b3; /* 호버 시 더 어두운 파란색 */
  }
}

.input-group {
  display: flex;
  align-items: center;
  width: 100%;
}

.input-group .form-control {
  flex: 1;
}
.ad-banner {
  text-align: center; /* 이미지 중앙 정렬 */

  img {
    max-width: 100%; /* 반응형으로 이미지 크기 조정 */
    height: auto; /* 높이 자동 조정 */
    border-radius: 10px; /* 모서리 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  }
}
</style>
