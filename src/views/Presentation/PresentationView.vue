<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
import KakaoMap from "../../components/map/KakaoMap.vue";
//Vue Material Kit 2 components

// sections
import PresentationExample from "./Sections/PresentationExample.vue";
import data from "./Sections/Data/designBlocksData";

//images
import vueMkHeader from "@/assets/img/HanWhaResort.jpg";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div class="page-header min-vh-100" :style="`background-image: url(${vueMkHeader})`" loading="lazy">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1 class="text-white pt-3 mt-n5 me-2" :style="{ display: 'inline-block ' }">
              EasyStay
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              You can stay here through EasyCheck.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body mx-3 mx-md-7">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10">
        <div class="card p-4">
          <form class="row g-3 align-items-center">
            <div class="col-md-4">
              <label for="resortSelect" class="form-label">방문리조트 선택</label>
              <select v-model="selectedResort" id="resortSelect" class="form-select">
                <option value="" disabled>지점선택</option>
                <option value="resort1">리조트 1</option>
                <option value="resort2">리조트 2</option>
              </select>
            </div>

            <div class="col-md-4">
              <label for="checkIn" class="form-label">체크인</label>
              <input type="date" v-model="checkInDate" id="checkIn" class="form-control" />
            </div>

            <div class="col-md-4">
              <label for="checkOut" class="form-label">체크아웃</label>
              <input type="date" v-model="checkOutDate" id="checkOut" class="form-control" />
            </div>

            <div class="col-md-4">
              <label for="roomCount" class="form-label">객실 수</label>
              <input type="number" v-model="roomCount" min="1" id="roomCount" class="form-control" />
            </div>

            <div class="col-md-4">
              <button type="button" @click="searchRooms" class="btn btn-primary w-100">객실 검색</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <PresentationCounter /> -->
    <PresentationExample :data="data" />
    <KakaoMap />
  </div>
  <DefaultFooter />
</template>
