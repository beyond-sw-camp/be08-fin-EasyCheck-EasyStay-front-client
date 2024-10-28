<!-- eslint-disable prettier/prettier -->
<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import apiClient from "@/api";
import { userLoginStore } from "@/stores/loginStore";
import { useNoticeStore } from "@/stores/notice";
import easystayImage from '@/assets/img/easystay.png';
import setMaterialInput from "@/assets/js/material-input";

// example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const error = ref(null);
const router = useRouter();
const userStore = userLoginStore();
const noticeStore = useNoticeStore();

const branchQuery = ref(noticeStore.query.branch);

onMounted(async () => {
  setMaterialInput();

  // 사용자 정보 가져오기
  const token = localStorage.getItem("accessToken");
  console.log("token: ", token);

  if (token) {
    try {
      await userStore.getUserData();
    } catch (err) {
      error.value = "사용자 정보를 가져오는 데 실패했습니다.";
      console.error("API 오류:", err);
    }
  } else {
    alert("로그인이 필요합니다.");
    router.push("/users/login");
  }

  await noticeStore.fetchAccommodations();
});

const updateBranch = () => {
  noticeStore.setQueryBranch(branchQuery.value);
};

</script>

<template>
  <div class="position-sticky z-index-sticky top-0 w-100">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>

  <Header>
    <div class="page-header align-items-start min-vh-90" loading="lazy" style="padding-top: 80px;">
      <span class="mask bg-white opacity-6"></span>
      <div class="container custom-login-container my-auto position-relative">
        <div class="row">
          <div class="col-12">
            <div class="bg-image" :style="{ backgroundImage: 'url(' + easystayImage + ')' }"
              style="background-size: cover; background-position: center; height: 230px; display: flex; align-items: center; justify-content: center; z-index: 1;">
              <div class="py-3 mb-3 text-center" style="background-color: rgba(255, 255, 255, 0.3); width: 100%;">
                <h3 class="text-black font-weight-bolder mb-0 mt-4 mb-2">테마파크 예약 내역</h3>
                <h6 class="text-black-50 mt-3">고객님의 EASY STAY 테마파크 예약 현황을 확인하실 수 있습니다.</h6>
                <div class="row text-black justify-content-center fs-4"></div>

                <!-- 검색바 추가 -->
                <div class="row mt-4">
                  <div class="col-12 text-center">

                    <div class="d-flex justify-content-center align-items-center mb-3">

                      <div class="d-flex align-items-center me-3">
                        <label for="resort-select" class="form-label me-2 mb-0" style="white-space: nowrap;">지점
                          선택</label>
                        <select id="resort-select" v-model="branchQuery" class="form-select me-2"
                          @change="updateBranch">
                          <option value="" disabled>지점을 선택하세요</option>
                          <option v-for="branch in noticeStore.accommodations" :key="branch.id" :value="branch.name">
                            {{ branch.name }}
                          </option>
                        </select>
                      </div>

                      <div class="d-flex align-items-center me-3">
                        <label for="stayDuration" class="me-2 mb-0" style="white-space: nowrap;">투숙 기간</label>
                        <MaterialInput type="date" v-model="checkInDate" id="checkIn"
                          class="form-control me-2 input-group-outline" />
                        <span class="mx-2">~</span>
                        <MaterialInput type="date" v-model="checkOutDate" id="checkOut"
                          class="form-control input-group-outline" />
                      </div>

                      <MaterialButton @click="searchReservations" class="btn btn-primary ms-2 mt-2">검색
                      </MaterialButton>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-center text-black fs-6 mb-4">
            <div class="text-center mt-3">
              <h5 class="custom-font">EASY STAY's membership offers special value.</h5>
              <div v-if="error" class="text-danger">{{ error }}</div>
              <div v-else>
                <!-- 사용자 정보 표시 -->
                <div>환영합니다, {{ userStore.userData.name }}님!</div>
                <div>회원 ID: {{ userStore.userData.email }}</div>
              </div>
            </div>
          </div>

          <!-- 테마파크 예약 내역 -->
          <div class="col-12 mt-4">
            <h4 class="text-start ms-3">예약 내역</h4>
            <div style="border-top: 1px solid #000; width: 100%; margin: 10px auto;"></div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>예약 ID</th>
                  <th>지점</th>
                  <th>투숙 시작일</th>
                  <th>투숙 종료일</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reservation in reservations" :key="reservation.id">
                  <td>{{ reservation.id }}</td>
                  <td>{{ reservation.branch }}</td>
                  <td>{{ reservation.checkInDate }}</td>
                  <td>{{ reservation.checkOutDate }}</td>
                  <td>{{ reservation.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </Header>
</template>

<style>
.custom-font {
  font-family: 'Caveat', cursive;
}
</style>