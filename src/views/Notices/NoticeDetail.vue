<template>
  <div class="col-12">
    <NavbarDefault :sticky="true" />
  </div>
  <Header />
  <div class="container py-4">
    <div v-if="notice" class="notice-header mb-4">
      <h1 class="display-4 font-weight-bold">{{ notice.title }}</h1>
      <small class="text-muted">
        <i class="fas fa-map-marker-alt"></i>
        {{ notice.accommodationName }}
      </small>
    </div>
    <hr class="my-4" />
    <div v-if="notice" class="notice-image mb-4">
      <img
        src="@/assets/img/006.png"
        alt="Notice Image"
        class="img-fluid rounded"
      />
    </div>
    <div v-if="notice" class="notice-content p-4">
      <p class="lead">{{ notice.content }}</p>
    </div>
    <div class="notice-actions my-4">
      <button class="btn btn-secondary" @click="goBack">
        목록으로 돌아가기
      </button>
    </div>
    <div class="related-notices mt-4">
      <h5>관련 공지사항</h5>
      <ul class="list-unstyled">
        <li>
          <a href="#">공지사항 1 제목</a>
          <hr class="related-notice-divider" />
        </li>
        <li>
          <a href="#">공지사항 2 제목</a>
          <hr class="related-notice-divider" />
        </li>
        <li>
          <a href="#">공지사항 3 제목</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNoticeStore } from "@/stores/notice";

import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import { storeToRefs } from "pinia";

const noticeStore = useNoticeStore();
const route = useRoute();
const { notice } = storeToRefs(noticeStore);

onMounted(async () => {
  const noticeId = route.params.id;
  console.log("아이디 출력 : ", noticeId);

  try {
    await noticeStore.fetchNotices(); // 모든 공지사항 목록 불러오기
    await noticeStore.fetchNoticeById(noticeId); // ID에 맞는 공지사항 데이터 가져오기
    if (!notice.value) {
      console.error("해당 ID의 공지사항을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("공지를 불러오는 중 오류 발생:", error);
  }
});

const goBack = () => {
  route.push("/noticesListView");
};
</script>

<style scoped>
.notice-header h1 {
  color: #333;
}

.notice-content {
  line-height: 1.7;
  font-size: 1.15rem;
  color: black;
}

hr {
  border: 0;
  height: 1px;
  background-color: #ccc; /* 구분선 색상 설정 */
}

.notice-image img {
  max-width: 100%; /* 이미지가 컨테이너를 넘지 않도록 설정 */
  height: auto; /* 비율 유지 */
}

/* 버튼 스타일 추가 */
.btn-secondary {
  background-color: #6c757d; /* 회색 배경 */
  color: white; /* 흰색 글자 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 둥근 모서리 */
  padding: 10px 20px; /* 패딩 추가 */
  transition: background-color 0.3s; /* 배경 색상 변화 효과 */
}

.related-notices {
  border-top: 2px solid #ccc; /* 구분선 추가 */
  padding-top: 20px; /* 상단 패딩 */
}

.related-notice-divider {
  border: none; /* 기본 테두리 제거 */
  border-top: 1px solid #ccc; /* 구분선 추가 */
  margin: 5px 0; /* 위아래 여백 */
}
</style>
