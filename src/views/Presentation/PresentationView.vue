<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import RoomSearchForm from "./Sections/SearchRoom/RoomSearchForm.vue";
import RoomList from "./Sections/SearchRoom/RoomList.vue";

import NavbarDefault from "../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
import KakaoMap from "../../components/map/KakaoMap.vue";
import Payment from "../../components/Payment/Payment.vue";
import AccommodationList from "./Sections/Accommodation/AccommodationList.vue";
import EventList from "./Sections/Event/EventList.vue";

import image1 from "@/assets/img/main_images/Belvedere.jpg";
import image2 from "@/assets/img/main_images/Sorano.jpg";
import image3 from "@/assets/img/main_images/SanjungLake.jpeg";
import image4 from "@/assets/img/main_images/Signiel.jpeg";
import image5 from "@/assets/img/main_images/ThePlaza.jpeg";
import image6 from "@/assets/img/main_images/ParadiseCity.jpeg";

const images = [image1, image2, image3, image4, image5, image6];
const currentImage = ref(images[0]);
const isFading = ref(false);
const isPlaying = ref(true);
const imageIndex = ref(0);
let intervalId = null;

const accommodations = ref([]);
const availableRooms = ref([]);
const selectedResort = ref(null);
let checkInDate = null; // 체크인 날짜를 문자열로 저장
let checkOutDate = null; // 체크아웃 날짜를 문자열로 저장
let roomCount = null;
const router = useRouter(); // useRouter 호출

const fetchAccommodations = async () => {
  try {
    const response = await axios.get("/api/v1/accommodations");
    accommodations.value = response.data;
  } catch (error) {
    console.error("리조트 목록을 가져오는 중 오류가 발생했습니다.", error);
  }
};

const onSearchRooms = async ({
  resort,
  checkInDate: inDate,
  checkOutDate: outDate,
  roomCount: count,
}) => {
  selectedResort.value = resort; // 선택한 리조트 저장
  checkInDate = inDate; // 체크인 날짜 저장
  checkOutDate = outDate; // 체크아웃 날짜 저장
  roomCount = count; // 객실 수 저장

  try {
    const response = await axios.get("/api/v1/reservation-room/available", {
      params: {
        accommodationId: resort,
        checkinDate: inDate,
        checkoutDate: outDate,
        roomCount: count,
      },
    });
    availableRooms.value = response.data;
  } catch (error) {
    console.error("객실 검색 중 오류가 발생했습니다.", error);
  }
};

const onRoomSelected = (room) => {
  if (!selectedResort.value || !checkInDate || !checkOutDate || !roomCount) {
    console.error(
      "리조트, 체크인 날짜, 체크아웃 날짜, 객실 수 정보가 누락되었습니다."
    );
    return;
  }

  router.push({
    name: "ReservationPage",
    query: {
      roomId: room.roomId,
      accommodationId: selectedResort.value, // 선택한 리조트 ID
      checkInDate: checkInDate, // 선택한 체크인 날짜
      checkOutDate: checkOutDate, // 선택한 체크아웃 날짜
      roomCount: roomCount, // 선택한 객실 수
    },
  });
};

onMounted(fetchAccommodations);

const changeImage = (newIndex) => {
  isFading.value = true;
  setTimeout(() => {
    imageIndex.value = newIndex;
    currentImage.value = images[imageIndex.value];
    isFading.value = false;
  }, 500);
};

const nextImage = () => {
  const nextIndex = (imageIndex.value + 1) % images.length;
  changeImage(nextIndex);
};

const prevImage = () => {
  const prevIndex = (imageIndex.value - 1 + images.length) % images.length;
  changeImage(prevIndex);
};

const togglePlayPause = () => {
  if (isPlaying.value) {
    clearInterval(intervalId);
  } else {
    intervalId = setInterval(nextImage, 5000);
  }
  isPlaying.value = !isPlaying.value;
};

const goToImage = (index) => {
  changeImage(index);
};

const body = document.getElementsByTagName("body")[0];

onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");

  intervalId = setInterval(nextImage, 5000);
});

onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");

  if (intervalId) {
    clearInterval(intervalId);
  }
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
    <div
      class="page-header min-vh-100 position-relative"
      style="overflow: hidden"
    >
      <div
        class="background-image"
        :style="`background-image: url(${currentImage}); opacity: ${
          isFading ? 0 : 1
        };`"
      ></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block ' }"
            >
              EasyStay
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              You can stay here through EasyCheck.
            </p>
          </div>
        </div>
      </div>

      <button class="btn-prev" @click="prevImage"></button>
      <button class="btn-next" @click="nextImage"></button>

      <div class="dots-container">
        <span
          v-for="(image, index) in images"
          :key="index"
          class="dot"
          :class="{ active: index === imageIndex }"
          @click="goToImage(index)"
        ></span>
        <button @click="togglePlayPause" class="play-pause-btn">
          {{ isPlaying ? "||" : "▶" }}
        </button>
      </div>
    </div>
  </Header>

  <div class="card card-body">
    <section class="row justify-content-center mb-5 pb-5 mx-3 mx-md-7">
      <div class="col-12 col-md-10">
        <RoomSearchForm
          :accommodations="accommodations"
          @search="onSearchRooms"
        />
        <RoomList :rooms="availableRooms" @select-room="onRoomSelected" />
      </div>
      <Payment />
      <EventList />
      <AccommodationList />
      <KakaoMap />
    </section>
  </div>
</template>

<style scoped>
.background-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 1s ease-in-out;
  z-index: -1;
}

.page-header {
  position: relative;
  overflow: hidden;
}

.dots-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  opacity: 0.5;
}

.dot.active {
  background-color: red;
  opacity: 1;
}

.play-pause-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  margin-left: 15px;
  cursor: pointer;
}

.btn-prev,
.btn-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
  transition: color 0.3s ease;
}

.btn-prev:hover,
.btn-next:hover {
  color: rgba(255, 255, 255, 0.8);
}

.btn-prev {
  left: 20px;
}

.btn-next {
  right: 20px;
}

.btn-prev::before,
.btn-next::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  display: inline-block;
}

.btn-prev::before {
  content: "\f104";
}

.btn-next::before {
  content: "\f105";
}
</style>
