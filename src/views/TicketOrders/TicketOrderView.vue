<template>
  <div class="container py-5 my-5">
    <h2 class="text-left mb-4">입장권 구매</h2>
    <p class="text-left text-muted pb-4">
      입장권 구매 후 이용하실 수 있습니다.
    </p>

    <product-info class="mb-4" v-model:adultCount="adultCount" v-model:childCount="childCount" />

    <buyer-info class="mb-4" v-model:buyerName="buyerName" v-model:buyerPhone="buyerPhone"
      v-model:buyerEmail="buyerEmail" v-model:buyerEmailDomain="buyerEmailDomain" />

    <usage-info class="mb-4" v-model:termsChecked1="termsChecked1" v-model:termsChecked2="termsChecked2"
      @openModal="handleOpenModal" />

    <privacy-agreement-modal v-if="isModalOpen" :type="modalType" @close="closeModal" @agree="handleAgree" />

    <div class="d-flex justify-content-center mt-5">
      <button class="btn btn-danger mx-2" @click="handleCancel">취소</button>
      <button class="btn btn-primary mx-2" @click="handleSubmit">
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
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useTicketStore } from "@/stores/ticketStore";
import apiClient from "@/api";
import ProductInfo from "@/components/TicketOrders/ProductInfo.vue";
import BuyerInfo from "@/components/TicketOrders/BuyerInfo.vue";
import UsageInfo from "@/components/TicketOrders/UsageInfo.vue";
import PrivacyAgreementModal from "@/components/TicketOrders/PrivacyAgreementModal.vue";

const router = useRouter();
const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();
const ticketStore = useTicketStore();
const { themeParkId } = storeToRefs(themeParkStore);
const { adultTicket, childTicket, totalPrice, adultTicketAmount, childTicketAmount } = storeToRefs(ticketStore);
const { accommodationId } = storeToRefs(accommodationStore);

const buyerName = ref("");
const buyerPhone = ref("");
const buyerEmail = ref("");
const buyerEmailDomain = ref("");
const termsChecked1 = ref(false);
const termsChecked2 = ref(false);

const isModalOpen = ref(false);
const modalType = ref("");

// 페이지 이탈 방지 처리
const handleBeforeUnload = (e) => {
  const message =
    "페이지를 벗어나면 입력하신 정보가 모두 사라집니다. 계속하시겠습니까?";
  e.returnValue = message;
  return message;
};

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const isFormValid = computed(() => {
  const isTicketSelected = (adultTicket.value && adultTicketAmount.value > 0) ||
    (childTicket.value && childTicketAmount.value > 0);
  console.log("성인/아동 티켓 선택 여부:", isTicketSelected); // 디버그 로그
  console.log("구매자 이름:", buyerName.value); // 디버그 로그
  console.log("구매자 전화번호:", buyerPhone.value); // 디버그 로그
  console.log("필수 약관 동의:", termsChecked1.value); // 디버그 로그

  return (
    buyerName.value &&
    buyerPhone.value &&
    termsChecked1.value &&
    isTicketSelected
  );
});

const handleSubmit = async () => {
  if (isFormValid.value) {
    try {
      const orderData = {
        buyerName: buyerName.value,
        buyerPhone: buyerPhone.value,
        buyerEmail: `${buyerEmail.value}@${buyerEmailDomain.value}`,
        adultTicketAmount: adultTicketAmount.value,
        childTicketAmount: childTicketAmount.value,
        totalPrice: totalPrice.value,
        themeParkId: themeParkId.value,
        collectionAgreement: termsChecked1.value ? "Y" : "N",
        ticketId: adultTicket.value?.id || childTicket.value?.id,
        receiptMethod: "EMAIL",
        quantity: adultTicketAmount.value + childTicketAmount.value,
      };

      const orderResponse = await apiClient.post(`/tickets/orders`, orderData);
      console.log("Order Response Data:", orderResponse.data.data); // 응답 데이터 확인

      // orderId 경로에 문제가 없는지 확인
      const orderId = orderResponse.data?.data?.orderId;

      if (!orderId) {
        console.error("Order ID가 생성되지 않았습니다.");
        alert("주문 생성 중 오류가 발생했습니다.");
        return;
      }

      const { IMP } = window;
      IMP.init("imp18668427");

      const paymentData = {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: orderId, // 생성된 orderId가 유효한지 확인
        name: "입장권 구매",
        amount: totalPrice.value,
        buyer_name: buyerName.value || "",
        buyer_tel: buyerPhone.value || "",
        buyer_email: `${buyerEmail.value}@${buyerEmailDomain.value}` || "",
      };
      console.log("Payment Data:", paymentData);

      IMP.request_pay(paymentData, async (response) => {
        if (response.success && response.imp_uid) { // 성공 시 imp_uid 확인
          console.log("결제 성공:", response); // 결제 성공 응답 확인

          const paymentRequest = {
            impUid: response.imp_uid,
            orderId: orderId,
            paymentAmount: response.paid_amount || totalPrice.value,
            paymentMethod: "EMAIL",
            paymentDate: new Date().toISOString(), // ISO 형식의 날짜 문자열
          };
          console.log("Payment Request Data:", paymentRequest);

          try {
            // 결제 정보 전송
            await apiClient.post(`/tickets/payment/${orderId}`, paymentRequest);
            alert("결제가 완료되었습니다.");
          } catch (error) {
            console.error("결제 정보 저장 중 오류 발생:", error);
            alert("결제는 성공했으나 처리 중 오류가 발생했습니다.");
          }
        } else {
          console.error("결제 실패 또는 imp_uid 누락:", response.error_msg);
          alert(`결제 실패: ${response.error_msg}`);
        }
      });
    } catch (error) {
      console.error("주문 생성 실패:", error);
      alert("주문 생성 중 오류가 발생했습니다.");
    }
  } else {
    alert("폼이 유효하지 않습니다.");
  }
};

const handleCancel = () => {
  router.replace({
    name: "TicketSelection",
    query: {
      accommodationId: accommodationId.value,
      themeParkId: themeParkId.value,
    },
  });
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