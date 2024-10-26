<template>
  <navbar-default />
  <Header />
  <div class="container py-4">
    <div class="notice-header mb-4">
      <h1 class="display-4 font-weight-bold">{{ notice.title }}</h1>
      <small class="text-muted">
        <i class="fas fa-map-marker-alt"></i>
        {{ notice.accommodationName }}
      </small>
    </div>
    <hr class="my-4" />
    <div class="notice-image mb-4">
      <img
        src="@/assets/img/006.png"
        alt="Notice Image"
        class="img-fluid rounded"
      />
    </div>
    <div class="notice-content p-4">
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
import { onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNoticeStore } from "@/stores/notice";

import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import { storeToRefs } from "pinia";

const noticeStore = useNoticeStore();
const route = useRoute();
const { notice } = storeToRefs(noticeStore);

console.log("공지사항 : ", notice.value);

onBeforeMount(() => {
  const noticeId = route.params.id;
  console.log("Before Mount - ID: ", noticeId);
});

// onMounted(() => {
//   console.log("컴포넌트가 마운트되었습니다.");
// });
// onMounted(async () => {
//   try {
//     console.log("onMounted 호출됨");
//     await noticeStore.fetchNotices();
//     console.log("공지사항 데이터 불러옴");
//   } catch (error) {
//     console.error("오류 발생:", error);
//   }
// });
onMounted(async () => {
  try {
    console.log("실행이 되나");
    const noticeId = route.params.id;
    console.log("아이디 출력 : ", noticeId);
    // await noticeStore.fetchNoticeById(noticeId);
    await noticeStore.fetchNotices(); // 공지사항 목록 불러오기
    noticeStore.notice = noticeStore.getNoticeById(noticeId); // ID에 맞는 공지사항 데이터 가져오기
    if (!noticeStore.notice) {
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
.btn-custom {
  background-color: #007bff; /* 기본 배경색 */
  color: white; /* 텍스트 색상 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 둥근 모서리 */
  padding: 10px 20px; /* 여백 */
  font-size: 1rem; /* 폰트 크기 */
  transition: background-color 0.3s, transform 0.3s; /* 부드러운 전환 효과 */
}
.btn-secondary {
  background-color: #6c757d; /* 회색 배경 */
  color: white; /* 흰색 글자 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 둥근 모서리 */
  padding: 10px 20px; /* 패딩 추가 */
  transition: background-color 0.3s; /* 배경 색상 변화 효과 */
}

.btn-custom:hover {
  background-color: #0056b3; /* 호버 시 배경색 */
  transform: scale(1.05); /* 약간 커지기 */
}

.related-notices {
  border-top: 2px solid #ccc; /* 구분선 추가 */
  padding-top: 20px; /* 상단 패딩 */
}

.card {
  border: 1px solid #ccc; /* 카드 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  overflow: hidden; /* 모서리 깔끔하게 처리 */
}

.card img {
  max-height: 200px; /* 이미지 최대 높이 */
  object-fit: cover; /* 이미지 비율 유지 */
}

.card-title {
  font-weight: bold; /* 제목 두껍게 */
}

.card-text {
  color: #777; /* 날짜 색상 */
}
.related-notice-divider {
  border: none; /* 기본 테두리 제거 */
  border-top: 1px solid #ccc; /* 구분선 추가 */
  margin: 5px 0; /* 위아래 여백 */
}
</style>
