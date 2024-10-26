<template>
  <div class="container py-5 my-5">
    <h2 class="text-left mb-4">입장권 구매</h2>
    <p class="text-left text-muted pb-4">
      입장권 구매 후 이용하실 수 있습니다.
    </p>

    <product-info
      class="mb-4"
      v-model:adultCount="adultCount"
      v-model:childCount="childCount"
    />

    <buyer-info
      class="mb-4"
      v-model:buyerName="buyerName"
      v-model:buyerPhone="buyerPhone"
      v-model:buyerEmail="buyerEmail"
      v-model:buyerEmailDomain="buyerEmailDomain"
    />

    <usage-info
      class="mb-4"
      v-model:termsChecked1="termsChecked1"
      v-model:termsChecked2="termsChecked2"
      @openModal="handleOpenModal"
    />

    <privacy-agreement-modal
      v-if="isModalOpen"
      :type="modalType"
      @close="closeModal"
      @agree="handleAgree"
    />

    <div class="d-flex justify-content-center mt-5">
      <button class="btn btn-danger mx-2" @click="handleCancel">취소</button>
      <button
        class="btn btn-primary mx-2"
        :disabled="!isFormValid"
        @click="handleSubmit"
      >
        구매하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { useTicketStore } from "@/stores/ticketStore";
import { useAccommodationStore } from "@/stores/accommodationStore";

import ProductInfo from "@/components/TicketOrders/ProductInfo.vue";
import BuyerInfo from "@/components/TicketOrders/BuyerInfo.vue";
import UsageInfo from "@/components/TicketOrders/UsageInfo.vue";
import PrivacyAgreementModal from "@/components/TicketOrders/PrivacyAgreementModal.vue";

// 라우터
const router = useRouter();

// pinia 스토어
const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

// pinia 스토어 state, getters
const { themeParkId } = storeToRefs(themeParkStore);
const { accommodationId } = storeToRefs(accommodationStore);

const buyerName = ref("");
const buyerPhone = ref("");
const buyerEmail = ref("");
const buyerEmailDomain = ref("");
const termsChecked1 = ref(false);
const termsChecked2 = ref(false);

const adultCount = ref(0);
const childCount = ref(0);

const isModalOpen = ref(false);
const modalType = ref("");

// 페이지 이탈 방지 처리
const handleBeforeUnload = (e) => {
  const message =
    "페이지를 벗어나면 입력하신 정보가 모두 사라집니다. 계속하시겠습니까?";
  e.returnValue = message; // Chrome에서 필요
  return message; // 다른 브라우저를 위해 필요
};

onMounted(() => {
  // 페이지 이탈 방지 이벤트 등록
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
  // 이벤트 리스너 제거
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const isFormValid = computed(() => {
  const isTicketSelected = adultCount.value + childCount.value > 0;
  return (
    buyerName.value &&
    buyerPhone.value &&
    termsChecked1.value &&
    isTicketSelected
  );
});

// Cancel 버튼 핸들러도 수정
const handleCancel = () => {
  router.replace({
    name: "TicketSelection",
    query: {
      accommodationId: accommodationId.value,
      themeParkId: themeParkId.value,
    },
  });
};

const handleSubmit = async () => {
  if (isFormValid.value) {
    try {
      // 구매하기 로직 추가
    } catch (error) {
      console.error("주문 및 결제 처리 중 오류 발생:", error);
    }
  } else {
    alert("폼이 유효하지 않습니다.");
  }
};

const handleOpenModal = (type) => {
  modalType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  if (modalType.value === "필수") {
    termsChecked1.value = false;
  } else if (modalType.value === "선택") {
    termsChecked2.value = false;
  }
  isModalOpen.value = false;
};

const handleAgree = () => {
  if (modalType.value === "필수") {
    termsChecked1.value = true;
  } else if (modalType.value === "선택") {
    termsChecked2.value = true;
  }
  isModalOpen.value = false;
};
</script>

<style scoped>
.container {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn {
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
}
</style>
