<template>
  <section class="py-8">
    <div class="notice-container">
      <!-- 공지사항 헤더 -->
      <div v-if="notice" class="notice-header">
        <h1 class="title">{{ notice.title }}</h1>
        <div class="notice-info">
          <span class="branch">
            <i class="fas fa-map-marker-alt me-2"></i>
            {{ notice.accommodationName }}
          </span>
          <span class="date">{{ notice.updatedAt }}</span>
        </div>
      </div>

      <hr class="divider" />

      <!-- 공지사항 내용 -->
      <div v-if="notice" class="notice-content">
        <p class="content-text">{{ notice.content }}</p>
      </div>

      <!-- 하단 버튼 -->
      <div class="notice-actions">
        <button class="back-btn" @click="goBack">
          <i class="fas fa-arrow-left"></i>
          <span>목록으로 돌아가기</span>
        </button>
      </div>

      <!-- 관련 공지사항 -->
      <div class="related-notices">
        <h5 class="related-title">관련 공지사항</h5>
        <ul class="notice-list">
          <li>
            <a href="#" class="notice-link">공지사항 1 제목</a>
          </li>
          <li>
            <a href="#" class="notice-link">공지사항 2 제목</a>
          </li>
          <li>
            <a href="#" class="notice-link">공지사항 3 제목</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNoticeStore } from "@/stores/notice";

import Header from "@/examples/Header.vue";
import { storeToRefs } from "pinia";

const noticeStore = useNoticeStore();
const route = useRoute();
const router = useRouter();

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
  router.push("/noticesListView");
};
</script>

<style lang="scss" scoped>
.notice-container {
  max-width: 1000px; // 컨테이너 너비 증가
  margin: 0 auto;
  padding: 0 20px;
}

.notice-header {
  margin-bottom: 2rem;

  .title {
    font-size: 2.5rem; // 제목 크기 증가
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
    line-height: 1.3;
  }

  .notice-info {
    display: flex;
    gap: 2rem;
    color: #666;
    font-size: 1.1rem; // 정보 텍스트 크기 증가

    .branch {
      display: flex;
      align-items: center;

      i {
        margin-right: 0.5rem;
        color: #3182ce;
        font-size: 1.2rem; // 아이콘 크기 증가
      }
    }
  }
}

.divider {
  border: none;
  height: 2px; // 구분선 두께 증가
  background-color: #e2e8f0;
  margin: 2.5rem 0;
}
.notice-content {
  padding: 2.5rem 0;

  .content-text {
    line-height: 2;
    font-size: 1.25rem;
    color: #1a1a1a;
    font-weight: 400;
    letter-spacing: -0.3px;
    margin-bottom: 2rem;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
}
.notice-actions {
  margin: 4rem 0;
  text-align: center;

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.8rem 1.8rem;
    font-size: 1rem;
    color: #fff;
    background-color: #3182ce;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    i {
      font-size: 0.9rem;
    }

    &:hover {
      background-color: #2c5282;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(49, 130, 206, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.related-notices {
  padding-top: 2.5rem;
  border-top: 2px solid #e2e8f0;

  .related-title {
    font-size: 1.4rem; // 제목 크기 증가
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 2rem;
  }

  .notice-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 1.2rem 0; // 패딩 증가
      border-bottom: 1px solid #e2e8f0;

      &:last-child {
        border-bottom: none;
      }
    }

    .notice-link {
      color: #4a5568;
      text-decoration: none;
      font-size: 1.1rem; // 링크 텍스트 크기 증가
      transition: color 0.2s;

      &:hover {
        color: #3182ce;
      }
    }
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .notice-container {
    padding: 0 16px;
  }

  .notice-header .title {
    font-size: 2rem;
  }

  .notice-content {
    font-size: 1.1rem;
  }
}
</style>
