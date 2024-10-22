<template>
  <NavbarDefault :sticky="true" />
  <div class="container my-5">
    <h2 class="text-left mb-4">입장권 구매</h2>
    <p class="text-left text-muted pb-4">
      입장권 구매 후 이용하실 수 있습니다.
    </p>

    <ProductInfo
      :adultCount="adultCount"
      :childCount="childCount"
      @incrementAdult="incrementAdult"
      @decrementAdult="decrementAdult"
      @incrementChild="incrementChild"
      @decrementChild="decrementChild"
      :formattedTotalPrice="formattedTotalPrice"
    />

    <BuyerInfo
      :buyerName="buyerName"
      :buyerPhone="buyerPhone"
      :buyerEmail="buyerEmail"
      :buyerEmailDomain="buyerEmailDomain"
      :isLoggedIn="isLoggedIn"
      v-model:buyerName="buyerName"
      v-model:buyerPhone="buyerPhone"
      v-model:buyerEmail="buyerEmail"
      v-model:buyerEmailDomain="buyerEmailDomain"
    />

    <UsageInfo
      v-model:termsChecked1="termsChecked1"
      v-model:termsChecked2="termsChecked2"
      @openModal="openModal"
    />

    <div class="d-flex justify-content-center mt-5">
      <button class="btn btn-danger mx-2" @click="handleCancel">취소</button>
      <button class="btn btn-primary mx-2" :disabled="!isFormValid">
        구매하기
      </button>
    </div>

    <PrivacyAgreementModal
      v-if="isModalVisible"
      :isVisible="isModalVisible"
      :type="modalType"
      @close="closeModal"
      @agree="agreeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import ProductInfo from "@/views/TicketOrders/ProductInfo.vue";
import BuyerInfo from "@/views/TicketOrders/BuyerInfo.vue";
import UsageInfo from "@/views/TicketOrders/UsageInfo.vue";
import PrivacyAgreementModal from "@/components/ThemePark/PrivacyAgreementModal.vue";

const adultCount = ref(0);
const childCount = ref(0);
const buyerName = ref("윤호연");
const buyerPhone = ref("01041803589");
const buyerEmail = ref("hoyer96");
const buyerEmailDomain = ref("naver.com");
const termsChecked1 = ref(false);
const termsChecked2 = ref(false);
const isModalVisible = ref(false);
const modalType = ref("");
const isLoggedIn = ref(true);

watchEffect(() => {
  if (isLoggedIn.value) {
    buyerName.value = "홍길동";
    buyerPhone.value = "01012345678";
    buyerEmail.value = "dummy";
    buyerEmailDomain.value = "example.com";
  }
});

const incrementAdult = () => {
  adultCount.value++;
};
const decrementAdult = () => {
  if (adultCount.value > 0) adultCount.value--;
};
const incrementChild = () => {
  childCount.value++;
};
const decrementChild = () => {
  if (childCount.value > 0) childCount.value--;
};

const getTotalPrice = () => adultCount.value * 30000 + childCount.value * 24000;
const formattedTotalPrice = computed(
  () => `₩ ${getTotalPrice().toLocaleString()}`
);

const openModal = (type) => {
  modalType.value = type;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const agreeModal = () => {
  if (modalType.value === "필수") {
    termsChecked1.value = true;
  } else if (modalType.value === "선택") {
    termsChecked2.value = true;
  }
  closeModal();
};

const handleCancel = () => {
  const userConfirmed = window.confirm(
    "구매를 취소하시겠습니까?\n입력된 구매정보가 초기화됩니다."
  );
  if (userConfirmed) {
    window.history.back();
  }
};
</script>
