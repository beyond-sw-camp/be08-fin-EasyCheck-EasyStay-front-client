<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header />
  <section class="py-10">
    <div class="container">
      <h3>Events</h3>
      <div class="banner-slider">
        <div class="slide">
          <img src="@/assets/img/이벤트배너 1.png" alt="Banner 1" />
        </div>
        <div class="slide">
          <img src="@/assets/img/이벤트배너 2.png" alt="Banner 2" />
        </div>
        <div class="slide">
          <img src="@/assets/img/이벤트배너 3.png" alt="Banner 3" />
        </div>
        <div class="slide">
          <img src="@/assets/img/이벤트배너 4.png" alt="Banner 3" />
        </div>
        <div class="slide">
          <img src="@/assets/img/이벤트배너 5.png" alt="Banner 3" />
        </div>
        <!-- 추가적인 배너 이미지를 여기다 넣을 수 있습니다 -->

        <!-- 좌우 화살표 -->
        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>
      </div>
      <!-- 지점 선택  -->
      <div class="branch-selection">
        <select>
          <option value="1">Seoul Branch</option>
          <option value="2">Busan Branch</option>
          <option value="3">Jeju Branch</option>
        </select>
      </div>
      <!-- 총 이벤트 건수  -->
      <div class="event-count">
        <h2>10 Events</h2>
        <p>in 서울 지점</p>
      </div>

      <!-- 이벤트 사진과 내용 -->
      <div class="event-list">
        <div class="event-card">
          <img
            src="@/assets/img/003.png"
            alt="Event 1 Image"
            class="event-image"
          />
          <div class="event-info">
            <h3>Luxury Gala Dinner</h3>
            <p>2024.12.25 - 2024.12.30</p>
            <p>
              Join us for an unforgettable experience at our exclusive gala
              dinner.
            </p>
          </div>
        </div>
        <div class="event-card">
          <img
            src="@/assets/img/006.png"
            alt="Event 2 Image"
            class="event-image"
          />
          <div class="event-info">
            <h3>Holiday Brunch</h3>
            <p>2024.12.15 - 2024.12.20</p>
            <p>Enjoy a festive brunch with special holiday-themed dishes.</p>
          </div>
        </div>
        <div class="event-card">
          <img
            src="@/assets/img/004.png"
            alt="Event 3 Image"
            class="event-image"
          />
          <div class="event-info">
            <h3>Winter Wonderland</h3>
            <p>2024.11.30 - 2024.12.05</p>
            <p>
              Experience the magic of winter with live entertainment and
              activities.
            </p>
          </div>
        </div>
      </div>
      <!-- 이벤트 사진과 내용 -->
      <div class="event-list">
        <div class="event-card">
          <img
            src="@/assets/img/003.png"
            alt="Event 1 Image"
            class="event-image"
          />
          <div class="event-info">
            <h3>Luxury Gala Dinner</h3>
            <p>2024.12.25 - 2024.12.30</p>
            <p>
              Join us for an unforgettable experience at our exclusive gala
              dinner.
            </p>
          </div>
        </div>
        <div class="event-card">
          <img
            src="@/assets/img/003.png"
            alt="Event 2 Image"
            class="event-image"
          />
          <div class="event-info">
            <h3>Holiday Brunch</h3>
            <p>2024.12.15 - 2024.12.20</p>
            <p>Enjoy a festive brunch with special holiday-themed dishes.</p>
          </div>
        </div>
        <div class="event-card">
          <img
            src="@/assets/img/003.png"
            alt="Event 3 Image"
            class="event-image"
          />
          <div class="event-info">
            <h3>Winter Wonderland</h3>
            <p>2024.11.30 - 2024.12.05</p>
            <p>
              Experience the magic of winter with live entertainment and
              activities.
            </p>
          </div>
        </div>
      </div>
      <!-- 페이지네이션 버튼 -->
      <div class="pagination">
        <button id="prevPage" class="page-btn">이전</button>
        <span id="pageNumbers" class="page-numbers"></span>
        <button id="nextPage" class="page-btn">다음</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // 버튼 클릭 이벤트 추가
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  // 자동으로 5초마다 슬라이드 넘기기
  setInterval(nextSlide, 5000);

  // 초기 슬라이드 보여주기
  showSlide(currentSlide);
});
</script>

<style lang="scss" scoped>
.branch-selection select {
  border: 1px solid gold;
  font-size: 18px;
  padding: 8px 16px;
  margin-bottom: 40px;
  color: black;
}

.event-count h2 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #333;
}

.event-count p {
  font-size: 18px;
  margin-bottom: 30px;
  color: gray;
}

.event-list {
  display: flex;
  justify-content: space-between; /* 카드 간격 조절 */
  gap: 20px; /* 카드 사이에 간격 추가 */
}

.event-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.event-card:hover {
  transform: scale(1.05);
}

.event-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid gold;
}

.event-info {
  padding: 20px;
}

.event-info h3 {
  font-size: 24px;
  color: #333;
}

.event-info p {
  font-size: 16px;
  color: #666;
  margin-top: 5px;
}
.banner-slider {
  position: relative;
  max-width: 100%;
  height: 700px;
  overflow: hidden;
  margin-top: 40px;
  margin-bottom: 20px;
}

.slide {
  display: none;
  transition: opacity 1s ease-in-out;
}

.slide img {
  width: 100%;
  height: 600px;
  object-fit: cover;
}

.slide.active {
  display: block;
  opacity: 1;
}
.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.page-btn {
  padding: 10px 20px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.page-btn:hover {
  background-color: #ddd;
}

.page-numbers {
  display: flex;
  gap: 10px;
}

.page-number {
  padding: 10px 15px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.page-number.active {
  background-color: #666;
  color: #fff;
}
</style>
