<template>
  <div class="container mt-8">
    <h2 class="text-left mb-4">입장권 구매</h2>
    <p class="text-left text-muted pb-4">
      입장권 구매 후 이용하실 수 있습니다.
    </p>

    <product-info class="mb-4" v-model:adultCount="adultCount" v-model:childCount="childCount" />

    <buyer-info class="mb-4" v-model:buyerName="buyerName" v-model:buyerPhone="buyerPhone"
      v-model:buyerEmail="buyerEmail" v-model:buyerEmailDomain="buyerEmailDomain" />

    <div class="card p-4 mb-5">
      <!-- 결제 방법 선택 영역 추가 -->
      <div class="payment-methods">
        <h4 class="mb-3">결제 방법</h4>
        <div class=" d-flex gap-3">
          <button type="button" class="payment-method-btn" :class="{ active: paymentMethod === 'card' }"
            @click="selectPaymentMethod('card')">
            <div class="payment-content">
              <span class="payment-icon">💳</span>
              <span class="payment-text">카드 결제</span>
            </div>
            <div v-if="paymentMethod === 'card'" class="selected-mark">✓</div>
          </button>

          <button type="button" class="payment-method-btn" :class="{ active: paymentMethod === 'vbank' }"
            @click="selectPaymentMethod('vbank')">
            <div class="payment-content">
              <span class="payment-icon">🏦</span>
              <span class="payment-text">무통장 입금</span>
            </div>
            <div v-if="paymentMethod === 'vbank'" class="selected-mark">✓</div>
          </button>
        </div>
      </div>
    </div>

    <usage-info class="mb-4" v-model:termsChecked1="termsChecked1" v-model:termsChecked2="termsChecked2"
      @openModal="handleOpenModal" />

    <privacy-agreement-modal v-if="isModalOpen" :type="modalType" @close="closeModal" @agree="handleAgree" />

    <div class="action-buttons">
      <button class="cancel-btn" @click="handleCancel">취소</button>
      <button class="reserve-btn" @click="handleSubmit">
        결제하기
      </button>
    </div>
    <!-- <div class="d-flex justify-content-center mt-5">
      <button class="btn btn-danger mx-2" @click="handleCancel">취소</button>
      <button class="btn btn-primary mx-2" @click="handleSubmit">
        구매하기
      </button>
    </div> -->
  </div>
</template>

<script setup>
import apiClient from "@/api";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { userLoginStore } from "@/stores/loginStore";
import { useTicketStore } from "@/stores/ticketStore";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useThemeParkStore } from "@/stores/themeparkStore";
import { useAccommodationStore } from "@/stores/accommodationStore";

import UsageInfo from "@/components/TicketOrders/UsageInfo.vue";
import BuyerInfo from "@/components/TicketOrders/BuyerInfo.vue";
import ProductInfo from "@/components/TicketOrders/ProductInfo.vue";
import PrivacyAgreementModal from "@/components/TicketOrders/PrivacyAgreementModal.vue";

const router = useRouter();

const userStore = userLoginStore();
const ticketStore = useTicketStore();
const themeParkStore = useThemeParkStore();
const accommodationStore = useAccommodationStore();

const { userInfo } = storeToRefs(userStore);
const { themeParkId } = storeToRefs(themeParkStore);
const {
  adultTicket,
  childTicket,
  totalPrice,
  adultTicketAmount,
  childTicketAmount,
} = storeToRefs(ticketStore);
const { accommodationId } = storeToRefs(accommodationStore);

onMounted(async () => {
  await userStore.fetchUserInfo();
})

const buyerName = ref("");
const buyerPhone = ref("");
const buyerEmail = ref("");
const buyerEmailDomain = ref("");
const termsChecked1 = ref(false);
const termsChecked2 = ref(false);
const paymentMethod = ref(""); // 결제 방법 선택을 위한 상태 추가

const isModalOpen = ref(false);
const modalType = ref("");

// 결제 방법 선택 함수 추가
const selectPaymentMethod = (method) => {
  paymentMethod.value = method;
};

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
  const isTicketSelected =
    (adultTicket.value && adultTicketAmount.value > 0) ||
    (childTicket.value && childTicketAmount.value > 0);

  return (
    buyerName.value &&
    buyerPhone.value &&
    termsChecked1.value &&
    isTicketSelected &&
    paymentMethod.value // 결제 방법이 선택되었는지 확인
  );
});

const handleSubmit = async () => {
  console.log(`handleSubmit method = ${paymentMethod.value}`);

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
        receiptMethod: paymentMethod.value, // 결제 방법 추가
        quantity: adultTicketAmount.value + childTicketAmount.value,
      };

      console.log("handleSubmit orderData:", orderData);

      const orderResponse = await apiClient.post(`/tickets/orders`, orderData);
      const orderId = orderResponse.data.data.orderId;

      if (!orderId) {
        alert("주문 생성 중 오류가 발생했습니다.");
        return;
      }

      const { IMP } = window;
      IMP.init("imp18668427");

      const paymentData = {
        pg: "html5_inicis",
        pay_method: paymentMethod.value, // 결제 방법 반영
        merchant_uid: orderId,
        name: "입장권 구매",
        amount: totalPrice.value,
        buyer_name: buyerName.value || "",
        buyer_tel: buyerPhone.value || "",
        buyer_email: `${buyerEmail.value}@${buyerEmailDomain.value}` || "",
        // 가상계좌 선택 시 추가 정보
        vbank_due: paymentMethod.value === "vbank" ? getVbankDueDate() : undefined,
        bank: paymentMethod.value === "vbank" ? "우리은행" : undefined,
        accountHolder: paymentMethod.value === "vbank" ? (userInfo.value?.name || "이름 정보 없음") : undefined,
      };
      console.log("paymentData:", paymentData);

      IMP.request_pay(paymentData, async (response) => {
        if (response.success && response.imp_uid) {
          console.log("결제 성공: imp_uid =", response.imp_uid, "orderId =", orderId); // 확인용 로그

          const paymentRequest = {
            orderId: orderId,
            impUid: response.imp_uid,
            paymentMethod: paymentMethod.value,
            paymentAmount: response.paid_amount || totalPrice.value,
            bank: paymentMethod.value,
            accountHolder: paymentMethod.value === "vbank" ? (userInfo.value?.name || "이름 정보 없음") : null,
            depositDeadline: paymentMethod.value === "vbank" ? getVbankDueDate() : null,
            paymentStatus: "COMPLETED",
            paymentDate: new Date().toISOString(),
          };

          try {
            await apiClient.post(`/tickets/payment/${orderId}`, paymentRequest);
            alert("결제가 완료되었습니다.");
          } catch (error) {
            console.error("결제 정보 저장 중 오류:", error);
            alert("결제는 성공했으나 처리 중 오류가 발생했습니다.");
          }
        } else {
          console.error("결제 실패:", response.error_msg);
          alert(`결제 실패: ${response.error_msg}`);
        }
      });
    } catch (error) {
      console.error("주문 생성 중 오류:", error);
      alert("주문 생성 중 오류가 발생했습니다.");
    }
  } else {
    alert("폼이 유효하지 않습니다.");
  }
};

// 가상계좌 입금 기한 설정 함수
function getVbankDueDate() {
  const today = new Date();
  const dueDate = new Date(today.setDate(today.getDate() + 7)); // 7일 후로 설정
  const isoDate = dueDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS" 형식으로 자름
  console.log("vbank_due:", isoDate);
  return isoDate;
}

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
.card {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.payment-methods {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.payment-method-btn {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 80px;
  position: relative;

  &.active {
    border-color: #007bff;
    background-color: #e0f3ff;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
  }
}

.payment-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.payment-icon {
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.payment-text {
  font-size: 1rem;
}

.selected-mark {
  color: #007bff;
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin: 4rem 0;

  button {
    flex: 1;
    padding: 15px;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.cancel-btn {
      background-color: #f8f8f8;
      color: #333;
      margin-right: 10px;
    }

    &.reserve-btn {
      background-color: #e74c3c;
      color: #fff;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
}
</style>