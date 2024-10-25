<template>
  <NavbarDefault :sticky="true" />
  <div class="container py-5 my-5">
    <h2 class="text-left mb-4">입장권 구매</h2>
    <p class="text-left text-muted pb-4">
      입장권 구매 후 이용하실 수 있습니다.
    </p>

    <!-- adultTicketId와 childTicketId를 직접 ProductInfo로 전달 -->
    <ProductInfo
      v-if="isDataValid && adultTicketId && childTicketId"
      class="mb-4"
      :adultTicketId="adultTicketId"
      :childTicketId="childTicketId"
      :accommodationId="accommodationId"
      :themeParkId="themeParkId"
      v-model:adultCount="adultCount"
      v-model:childCount="childCount"
    />

    <BuyerInfo
      class="mb-4"
      v-model:buyerName="buyerName"
      v-model:buyerPhone="buyerPhone"
      v-model:buyerEmail="buyerEmail"
      v-model:buyerEmailDomain="buyerEmailDomain"
    />

    <UsageInfo
      class="mb-4"
      v-model:termsChecked1="termsChecked1"
      v-model:termsChecked2="termsChecked2"
      @openModal="handleOpenModal"
    />

    <PrivacyAgreementModal
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useThemeParkStore } from "@/stores/themeParkStore";
import ProductInfo from "@/components/TicketOrders/ProductInfo.vue";
import BuyerInfo from "@/components/TicketOrders/BuyerInfo.vue";
import UsageInfo from "@/components/TicketOrders/UsageInfo.vue";
import PrivacyAgreementModal from "@/components/TicketOrders/PrivacyAgreementModal.vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const router = useRouter();
const themeParkStore = useThemeParkStore();

// localStorage에서 adultTicketId, childTicketId, accommodationId 가져오기
const adultTicketId = ref(localStorage.getItem("selectedAdultTicketId"));
const childTicketId = ref(localStorage.getItem("selectedChildTicketId"));
const themeParkId = ref(Number(localStorage.getItem("selectedThemeParkId")));
const accommodationId = ref(
  Number(localStorage.getItem("selectedAccommodationId"))
); // 추가됨
const isDataValid = ref(true);

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

// 테마파크 이름을 로드
const loadThemeParkName = async () => {
  try {
    if (themeParkId.value) {
      await themeParkStore.fetchThemeParkById(
        accommodationId.value,
        themeParkId.value
      );

      if (!themeParkStore.currentThemePark?.name) {
        isDataValid.value = false;
      }
    } else {
      isDataValid.value = false;
    }
  } catch (error) {
    console.error("테마파크 정보를 불러오는 중 오류가 발생했습니다:", error);
    isDataValid.value = false;
  }
};

onMounted(async () => {
  try {
    console.log(
      "TicketOrderView에서 accommodationId 확인:",
      accommodationId.value
    );
    console.log("TicketOrderView에서 themeParkId 확인:", themeParkId.value);

    await loadThemeParkName();
    isDataValid.value = adultTicketId.value && childTicketId.value;
  } catch (error) {
    console.error("데이터 로드 중 오류 발생:", error);
    isDataValid.value = false;
  }
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

const handleCancel = () => {
  router.go(-1);
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
