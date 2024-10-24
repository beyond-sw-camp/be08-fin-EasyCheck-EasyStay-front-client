<template>
  <navbar-default />
  <Header />
  <div class="container py-4">
    <div class="notice-header mb-4">
      <h1 class="display-4 font-weight-bold">{{ notice.title }}</h1>
      <small class="text-muted">
        <i class="fas fa-map-marker-alt"></i> {{ notice.location }} |
        {{ formatDate(notice.date) }}
      </small>
    </div>
    <hr class="my-4" />
    <div class="notice-image mb-4">
      <img
        v-if="notice.id === 1"
        src="@/assets/img/006.png"
        alt="Notice Image"
        class="img-fluid rounded"
      />
      <img
        v-else-if="notice.id === 2"
        src="@/assets/img/006.png"
        alt="Notice Image"
        class="img-fluid rounded"
      />
      <img
        v-else-if="notice.id === 3"
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

// 이미지를 동적으로 불러오기 위한 함수
// const getImagePath = (imageName) => {
//   return new URL(`@/assets/img/${imageName}`, import.meta.url).href;
// };
const notice = ref({
  title: "",
  content: "",
  date: "",
  location: "",
  image: "", // imageUrl에서 image로 변경
});
const route = useRoute();
const router = useRouter();

const fetchNoticeDetail = () => {
  const noticeId = route.params.id;

  // 예시 데이터
  const exampleNotices = {
    1: {
      id: 1,
      title: "서울리조트 휴관 안내",
      content:
        "서울리조트가 일정 기간 동안 휴관합니다. 불편을 끼쳐드려 죄송합니다.",
      date: "2024-10-20",
      location: "서울리조트",
      image: "004.png",
    },
    2: {
      id: 2,
      title: "서울리조트 리모델링 공지",
      content:
        "서울리조트가 새롭게 변신합니다! 더 나은 서비스와 환경을 제공하기 위해 리모델링을 진행합니다.",
      date: "2024-10-21",
      location: "서울리조트",
      image: "003.png",
    },
    3: {
      id: 3,
      title: "부산 해운대 맛집 소개",
      content: "부산 해운대의 전통 국밥 맛집을 소개합니다. 놓치지 마세요!",
      date: "2024-10-18",
      location: "부산 해운대",
      image: "006.png",
    },
  };

  //   const related = [
  //     {
  //       id: 1,
  //       title: "서울리조트 휴관 안내",
  //       date: "2024-10-20",
  //       image: "004.png",
  //     },
  //     {
  //       id: 2,
  //       title: "서울리조트 리모델링 공지",
  //       date: "2024-10-21",
  //       image: "003.png",
  //     },
  //     {
  //       id: 3,
  //       title: "부산 해운대 맛집 소개",
  //       date: "2024-10-18",
  //       image: "006.png",
  //     },
  //   ];

  notice.value = exampleNotices[noticeId] || {};
};

const goBack = () => {
  router.push("/noticesListView");
};

onMounted(fetchNoticeDetail);

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
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
