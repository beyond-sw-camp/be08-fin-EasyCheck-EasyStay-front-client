<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/api";
import RoomSearchForm from "./Sections/SearchRoom/RoomSearchForm.vue";

import Header from "../../examples/Header.vue";
import KakaoMap from "../../components/map/KakaoMap.vue";
import AccommodationList from "./Sections/Accommodation/AccommodationList.vue";
import EventList from "./Sections/Event/EventList.vue";

import image1 from "@/assets/img/main_images/Belvedere.jpg";
import image2 from "@/assets/img/main_images/Sorano.jpg";
import image3 from "@/assets/img/main_images/SanjungLake.jpeg";
import image4 from "@/assets/img/main_images/Signiel.jpeg";
import image5 from "@/assets/img/main_images/ThePlaza.jpeg";
import image6 from "@/assets/img/main_images/ParadiseCity.jpeg";
import { userLoginStore } from "@/stores/loginStore";

const images = [image1, image2, image3, image4, image5, image6];
const currentImage = ref(images[0]);
const isFading = ref(false);
const isPlaying = ref(true);
const imageIndex = ref(0);
let intervalId = null;

const accommodations = ref([]);
const router = useRouter(); // useRouter 호출

// 테스트용 추가 버튼 연결하고 주석 지우겠음
const userStore = userLoginStore();
const logout = () => {
  userStore.logout();
  alert("로그아웃 되었습니다.");
  router.push("/");
};
// 여기까지

const fetchAccommodations = async () => {
  try {
    const response = await apiClient.get("/accommodations");
    accommodations.value = response.data;
  } catch (error) {
    console.error("리조트 목록을 가져오는 중 오류가 발생했습니다.", error);
  }
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

// const onSearchRooms = (searchData) => {
//   // Navigate to ReservationView with searchData as query parameters
//   router.push({
//     name: "ReservationView", // Make sure this matches your route name
//     query: {
//       resort: searchData.resort,
//       checkInDate: searchData.checkInDate,
//       checkOutDate: searchData.checkOutDate,
//       roomCount: searchData.roomCount,
//     },
//   });
// };
</script>

<template>
  <div>
    <Header>
      <div class="page-header min-vh-100 position-relative" style="overflow: hidden">
        <div class="background-image" :style="`background-image: url(${currentImage}); opacity: ${isFading ? 0 : 1
          };`"></div>
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

        <button class="btn-prev" @click="prevImage">
          <div class="icon-wrapper" data-v-3e37aaed>
            <span class="carousel-control-prev-icon" aria-hidden="true" data-v-3e37aaed></span>
          </div>
        </button>
        <button class="btn-next" @click="nextImage">
          <div class="icon-wrapper" data-v-3e37aaed>
            <span class="carousel-control-next-icon" aria-hidden="true" data-v-3e37aaed></span>
          </div>
        </button>

        <div class="dots-container">
          <span v-for="(image, index) in images" :key="index" class="dot" :class="{ active: index === imageIndex }"
            @click="goToImage(index)"></span>
          <button @click="togglePlayPause" class="play-pause-btn">
            {{ isPlaying ? "||" : "▶" }}
          </button>
        </div>
      </div>
      <div class="roomSearchForm-container">
        <div class="container p-0">
          <RoomSearchForm class="roomSearch m-auto" :accommodations="accommodations" @search="onSearchRooms" />
        </div>
      </div>
    </Header>

    <div style="background-color: white">
      <div class="container card card-body">
        <section class="row justify-content-center mb-5 pb-5">
          <EventList />
          <AccommodationList />
          <KakaoMap />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.roomSearch {
  width: 1280px;
}

@media (min-width: 1400px) {

  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm,
  .container {
    max-width: 1320px;
  }
}

@media (max-width: 1399px) {
  .roomSearchForm-container {
    display: none;
  }
}

.roomSearchForm-container {
  width: 100%;
  position: absolute;
  bottom: 0;
  border-bottom: 1px solid #ebebeb;
}

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
  bottom: 150px;
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
  transform: translateY(-80%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
  transition: color 0.3s ease;
}

.btn-prev {
  left: 20px;
}

.btn-next {
  right: 20px;
}
</style>
