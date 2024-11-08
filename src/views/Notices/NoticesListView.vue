<template>
  <Header />
  <section class="py-8">
    <div class="container">
      <h3>Easy News</h3>

      <!-- 광고 이미지 추가 -->
      <div class="ad-banner mb-4">
        <img src="@/assets/img/003.png" alt="Ad Banner" class="img-fluid" />
      </div>

      <!-- 검색 필터 영역과 Total Notice를 같은 라인에 배치 -->
      <div class="search-filters mb-4">
        <!-- Total Notice -->
        <div class="notice-stats">
          <div class="stat-card">
            <span class="stat-label">전체 소식</span>
            <span class="stat-value">{{ notices.length }}개</span>
          </div>
        </div>

        <!-- 지점 선택 -->
        <div class="select-wrapper">
          <select v-model="query.branch" class="form-select custom-select">
            <option value="" disabled selected>지점 선택</option>
            <option
              v-for="branch in accommodations"
              :key="branch.id"
              :value="branch.name"
            >
              {{ branch.name }}
            </option>
          </select>
        </div>

        <!-- 검색창 -->
        <div class="search-wrapper">
          <input
            type="text"
            v-model="query.content"
            placeholder="검색어를 입력하세요"
            class="form-control custom-input"
          />
          <button class="search-button" @click="filterNotices">검색</button>
        </div>
      </div>

      <!-- 공지사항 총 개수 -->
      <div class="mb-3">
        <p>Total notices: {{ notices.length }}</p>
      </div>

      <!-- 공지사항 리스트 -->
      <div v-if="filteredNotices.length > 0" class="notice-list">
        <div
          v-for="notice in filteredNotices"
          :key="notice.id"
          class="notice-item"
          @click="goToNoticeDetail(notice.id)"
        >
          <div class="notice-content">
            <div class="notice-header">
              <h5 class="notice-title">{{ notice.title }}</h5>
              <span class="notice-date">{{ notice.updatedAt }}</span>
            </div>
            <p class="notice-text line-clamp">{{ notice.content }}</p>
            <div class="notice-footer">
              <span class="notice-branch">{{ notice.accommodationName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>공지사항이 존재하지않습니다.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNoticeStore } from "@/stores/notice";
import Header from "@/examples/Header.vue";
import { storeToRefs } from "pinia";

const router = useRouter();

const noticeStore = useNoticeStore();

// 여기서 state 꺼내올 수 있음
// getters도 filteredNotices 이런식으로 받아올 수 있음
const { accommodations, query, filteredNotices, notices } =
  storeToRefs(noticeStore);

onMounted(async () => {
  // 지점 목록 조회하는 함수 호출 actions에서
  await noticeStore.fetchNotices();
  // 공지사항 조회하는 함수 호출 actions에서
  await noticeStore.fetchAccommodations();
});

const goToNoticeDetail = (id) => {
  console.log("전달된 공지사항 ID: ", id); // 전달된 ID를 확인
  router.push({ name: "NoticeDetail", params: { id } });
  console.log("라우팅 완료"); // 라우팅 시도 후 로그
};
</script>
<style lang="scss" scoped>
// 공지사항 리스트 스타일
.notice-list {
  .notice-item {
    background-color: white;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    margin-bottom: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .notice-content {
      padding: 20px;

      .notice-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .notice-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }

        .notice-date {
          font-size: 0.9rem;
          color: #666;
        }
      }

      .notice-text {
        color: #4a5568;
        margin-bottom: 12px;
        line-height: 1.6;
        font-size: 0.95rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 3.2em;
      }

      .notice-footer {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .notice-branch {
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }
  }
}

// 검색 필터 영역
.search-filters {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

// Total Notice 스타일
.notice-stats {
  .stat-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 16px;
    background: #f8fafc;
    border-radius: 8px;
    min-width: 140px;

    .stat-label {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #0f172a;
    }
  }
}

// Select 박스 스타일
.select-wrapper {
  min-width: 200px;
  flex: 0 0 auto;

  .custom-select {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #4a5568;
    background-color: white;
    transition: all 0.2s;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #3182ce;
      box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    }
  }
}

// 검색 영역 스타일
.search-wrapper {
  flex: 1;
  display: flex;
  gap: 8px;

  .custom-input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #4a5568;
    background-color: white;
    transition: all 0.2s;

    &::placeholder {
      color: #a0aec0;
    }

    &:focus {
      outline: none;
      border-color: #3182ce;
      box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    }
  }

  .search-button {
    padding: 10px 20px;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #2c5282;
    }

    &:active {
      transform: translateY(1px);
    }
  }
}

// 헤더와 배너 스타일
h3 {
  font-weight: 600;
  color: #2d3748;
  font-size: 1.5rem;
}

.ad-banner {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

// 컨테이너 스타일
.container {
  padding: 20px 0;
}

// 반응형 디자인
@media (max-width: 768px) {
  .search-filters {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .notice-stats {
    width: 100%;

    .stat-card {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .stat-label {
        font-size: 0.9rem;
      }

      .stat-value {
        font-size: 1.2rem;
      }
    }
  }

  .select-wrapper,
  .search-wrapper {
    width: 100%;
  }
}
</style>
