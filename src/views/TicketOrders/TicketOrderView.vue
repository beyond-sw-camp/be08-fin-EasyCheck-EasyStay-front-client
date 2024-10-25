<template>
  <NavbarDefault :sticky="true" />
  <div class="container py-5 my-5">
    <h2 class="text-left mb-4">입장권 구매</h2>
    <p class="text-left text-muted pb-4">
      입장권 구매 후 이용하실 수 있습니다.
    </p>

    <ProductInfo
      v-if="isDataValid"
      class="mb-4"
      :adultTicket="adultTicket"
      :childTicket="childTicket"
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
import { useTicketStore } from "@/stores/ticketStore";
import ProductInfo from "@/components/TicketOrders/ProductInfo.vue";
import BuyerInfo from "@/components/TicketOrders/BuyerInfo.vue";
import UsageInfo from "@/components/TicketOrders/UsageInfo.vue";
import PrivacyAgreementModal from "@/components/TicketOrders/PrivacyAgreementModal.vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const router = useRouter();
const themeParkStore = useThemeParkStore();
const ticketStore = useTicketStore();

const adultTicket = ref({});
const childTicket = ref({});
const themeParkId = ref(Number(localStorage.getItem("selectedThemeParkId")));
const isDataValid = ref(true);

const loadTicketsFromLocalStorage = async () => {
  const adultTicketId = localStorage.getItem("selectedAdultTicketId");
  const childTicketId = localStorage.getItem("selectedChildTicketId");

  try {
    if (adultTicketId) {
      adultTicket.value = await ticketStore.fetchTicketById(
        Number(adultTicketId)
      );
    }

    if (childTicketId) {
      childTicket.value = await ticketStore.fetchTicketById(
        Number(childTicketId)
      );
    }
  } catch (error) {
    console.error("티켓 정보를 불러오는 중 오류가 발생했습니다:", error);
    isDataValid.value = false;
  }
};

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

const loadThemeParkName = async () => {
  try {
    if (themeParkId.value) {
      await themeParkStore.fetchThemeParkById(Number(themeParkId.value));

      if (
        !themeParkStore.currentThemePark?.name ||
        !adultTicket.value.price ||
        !childTicket.value.price
      ) {
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
  await loadTicketsFromLocalStorage();
  await loadThemeParkName();
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
      const reservationId = `RES${new Date().getTime()}`;
      const totalPrice =
        (adultTicket.value.price || 0) * adultCount.value +
        (childTicket.value.price || 0) * childCount.value;
      router.push({
        name: "TicketPayment",
        params: { reservationId, totalPrice },
      });
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
