<template>
  <div class="room-amenities mt-5">
    <h2 class="mb-4 text-black">제공 서비스</h2>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body d-flex">
            <div class="flex-shrink-0 me-3">
              <img
                src="/path/to/bedroom-icon.svg"
                alt="침실/거실"
                width="50"
                height="50"
              />
            </div>
            <div>
              <h5 class="card-title">침실/거실</h5>
              <p class="card-text">침대, 책상, 책상 의자, TV, 라탄의자</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body d-flex">
            <div class="flex-shrink-0 me-3">
              <img
                src="/path/to/bathroom-icon.svg"
                alt="욕실"
                width="50"
                height="50"
              />
            </div>
            <div>
              <h5 class="card-title">욕실</h5>
              <p class="card-text">
                샴푸, 컨디셔너, 샤워젤, 비누, 빗, 면봉, 화장솜, 욕실컵,
                바디스펀지, 바디로션, 비데, 헤어드라이기, 페이스타올, 바스타올,
                바스로브, 발매트, 욕조
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body d-flex">
            <div class="flex-shrink-0 me-3">
              <img
                src="/path/to/dining-icon.svg"
                alt="주방"
                width="50"
                height="50"
              />
            </div>
            <div>
              <h5 class="card-title">주방</h5>
              <p class="card-text">
                아이스바스켓, 티스푼, 냉장고, 커피포트, 종이컵, 얼음 집게
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body d-flex">
            <div class="flex-shrink-0 me-3">
              <img
                src="/path/to/extras-icon.svg"
                alt="추가 제공 물품"
                width="50"
                height="50"
              />
            </div>
            <div>
              <h5 class="card-title">추가 제공 물품</h5>
              <p class="card-text">
                작설차, 생수 2병/1일, 초고속 무선인터넷(Wi-Fi), 라운더리백,
                메모지, 연필, 편지지, 편지봉투, 금고, 소화기, 슬리퍼, 구두주걱,
                커피
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.room-amenities {
  .card {
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .card-text {
    font-size: 0.9rem;
    color: #6c757d;
  }
}
</style>
