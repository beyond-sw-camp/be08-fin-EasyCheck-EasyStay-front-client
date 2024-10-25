<template>
  <NavbarDefault :sticky="true" />
  <div class="container py-5 my-5">
    <h2 class="text-left mb-4">입장권 구매</h2>
    <p class="text-left text-muted pb-4">
      입장권 구매 후 이용하실 수 있습니다.
    </p>

    <ProductInfo
      v-if="adultTicket && childTicket"
      class="mb-4"
      :adultTicket="adultTicket"
      :childTicket="childTicket"
      :themeParkName="themeParkName"
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
    />

    <PrivacyAgreementModal
      v-if="isModalOpen"
      :type="modalType"
      @close="closeModal"
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
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThemeParkStore } from "@/stores/themeParkStore";
import { useTicketStore } from "@/stores/ticketStore";
import ProductInfo from "@/components/TicketOrders/ProductInfo.vue";
import BuyerInfo from "@/components/TicketOrders/BuyerInfo.vue";
import UsageInfo from "@/components/TicketOrders/UsageInfo.vue";
import PrivacyAgreementModal from "@/components/TicketOrders/PrivacyAgreementModal.vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";

const parseSafeJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return null;
  }
};

const route = useRoute();
const router = useRouter();
const themeParkStore = useThemeParkStore();
const ticketStore = useTicketStore();

const adultTicket = ref(parseSafeJSON(route.params.adultTicket) || {});
const childTicket = ref(parseSafeJSON(route.params.childTicket) || {});
const themeParkName = themeParkStore.currentThemePark?.name || "";

const buyerName = ref("");
const buyerPhone = ref("");
const buyerEmail = ref("");
const buyerEmailDomain = ref("");
const termsChecked1 = ref(false);
const termsChecked2 = ref(false);

const isFormValid = computed(() => {
  return buyerName.value && buyerPhone.value && termsChecked1.value;
});

const handleCancel = () => {
  router.go(-1);
};

const handleSubmit = async () => {
  if (isFormValid.value) {
    try {
      const reservationId = `RES${new Date().getTime()}`;
      const totalPrice = adultTicket.value.price + childTicket.value.price;
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
</script>


<style scoped>
.order-summary {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
}

.form-group {
  margin-bottom: 1.5rem;
}
</style>
