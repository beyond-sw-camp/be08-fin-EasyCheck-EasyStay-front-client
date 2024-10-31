<template>
  <div class="reservation-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-section">
        <h3 class="form-title">예약자 정보 입력</h3>
        <p class="form-subtitle">* 표시된 항목은 필수 입력 사항입니다.</p>

        <div class="form-group">
          <label for="reservationName" class="form-label">예약자 이름 *</label>
          <div class="input-group">
            <input :value="userInfo?.name" readonly type="text" id="reservationName" class="form-control"
              placeholder="이름" />
          </div>

          <small class="input-hint">온라인 비회원으로 예약 시 본인인증이 필요합니다.</small>
        </div>

        <div class="form-group">
          <label for="reservationPhone" class="form-label">예약자 휴대전화 번호 *</label>
          <input readonly type="tel" :value="userInfo?.phone" id="reservationPhone" class="form-control"
            placeholder="'-' 제외하고 숫자만 입력" />
        </div>
      </div>

      <div class="form-section">
        <h3 class="form-title">투숙자 정보 입력</h3>
        <div class="form-check">
          <input type="checkbox" id="sameAsReservation" v-model="sameAsReservation" @change="copyReservationInfo"
            class="form-check-input" />
          <label for="sameAsReservation" class="form-check-label">예약자 정보와 동일</label>
        </div>

        <div class="form-group">
          <label for="guestName" class="form-label">내표 투숙자 이름 *</label>
          <input type="text" id="representativeName" v-model="form.representativeName" class="form-control"
            :class="{ 'is-invalid': v$.form.representativeName.$error }" placeholder="이름" />
          <div class="error-message" v-if="v$.form.representativeName.$error">
            {{ v$.form.representativeName.$errors[0].$message }}
          </div>
        </div>

        <div class="form-group">
          <label for="guestPhone" class="form-label">내표 투숙자 휴대전화 번호 *</label>
          <input type="tel" id="representativePhone" v-model="form.representativePhone" class="form-control"
            :class="{ 'is-invalid': v$.form.representativePhone.$error }" placeholder="'-' 제외하고 숫자만 입력" />
          <div class="error-message" v-if="v$.form.representativePhone.$error">
            {{ v$.form.representativePhone.$errors[0].$message }}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">이메일 (선택)</label>
          <div class="email-group">
            <input type="text" v-model="form.emailLocal" class="form-control" placeholder="이메일" />
            <span class="email-at">@</span>
            <input type="text" v-model="form.emailDomain" class="form-control" placeholder="도메인" />
          </div>
          <small class="input-hint">이메일 주소 입력 시 '예약확인정' 메일이 발송됩니다.</small>
        </div>

        <div class="form-group">
          <label class="form-label">투숙 인원 *</label>
          <div class="guest-count-group">
            <div class="count-control">
              <button type="button" @click="decreaseAdult">-</button>
              <input type="text" v-model="adultCount" readonly />
              <button type="button" @click="increaseAdult">+</button>
              <span>성인 {{ adultCount }}명</span>
            </div>
            <div class="count-control">
              <button type="button" @click="decreaseChild">-</button>
              <input type="text" v-model="childCount" readonly />
              <button type="button" @click="increaseChild">+</button>
              <span>소인 {{ childCount }}명</span>
            </div>
          </div>
          <small class="input-hint">객실 정원은 최대 {{ selectedRoom?.maxOccupancy }}인까지
            가능합니다.</small>
          <small class="input-hint">객실 정원은 영유아 포함입니다.</small>
        </div>
      </div>
      <!-- template 안의 결제 방법 부분을 다음과 같이 수정 -->
      <div class="form-section">
        <h3 class="form-title">결제 방법</h3>
        <div class="payment-methods">
          <button type="button" class="payment-method-btn" :class="{ active: form.paymentMethod === 'card' }"
            @click="selectPaymentMethod('card')">
            <div class="payment-content">
              <span class="payment-icon">💳</span>
              <div class="payment-info">
                <span class="payment-text">카드 결제</span>
              </div>
            </div>
            <div v-if="form.paymentMethod === 'card'" class="selected-mark">
              ✓
            </div>
          </button>

          <button type="button" class="payment-method-btn" :class="{ active: form.paymentMethod === 'vbank' }"
            @click="selectPaymentMethod('vbank')">
            <div class="payment-content">
              <span class="payment-icon">🏦</span>
              <div class="payment-info">
                <span class="payment-text">무통장 입금</span>
              </div>
            </div>
            <div v-if="form.paymentMethod === 'vbank'" class="selected-mark">
              ✓
            </div>
          </button>
        </div>
      </div>
    </form>
  </div>
  <slot />
  <div class="action-buttons">
    <button class="cancel-btn" @click="handleCancel">취소</button>
    <button class="reserve-btn" :disabled="!allAgreementsChecked" @click="handleSubmit">
      결제하기
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { userLoginStore } from "@/stores/loginStore";
import { required, minLength, helpers } from "@vuelidate/validators";
import { useReservationStore } from "@/stores/reservationStore";

const router = useRouter();
const userStore = userLoginStore();
const reservationStore = useReservationStore();

const {
  selectedRoom,
  childCount,
  adultCount,
  totalGuests,
  allAgreementsChecked,
} = storeToRefs(reservationStore);
const { userInfo, email, domain } = storeToRefs(userStore);

const form = ref({
  representativeName: "",
  representativePhone: "",
  emailLocal: "",
  emailDomain: "",
  paymentMethod: "", // 추가
});

const rules = {
  form: {
    representativeName: {
      required: helpers.withMessage("투숙자 이름을 입력해주세요.", required),
      minLength: helpers.withMessage(
        "이름은 2자 이상이어야 합니다.",
        minLength(2)
      ),
    },
    representativePhone: {
      required: helpers.withMessage("휴대전화 번호를 입력해주세요.", required),
      phoneNumber: helpers.withMessage(
        "올바른 휴대전화 번호를 입력해주세요.",
        helpers.regex(/^[0-9]{11}$/)
      ),
    },
    paymentMethod: {
      required: helpers.withMessage("결제 방법을 선택해주세요.", required),
    },
  },
};

// 결제 방법 선택 함수 추가
const selectPaymentMethod = (method) => {
  form.value.paymentMethod = method;
};

// computed 속성 추가
const selectedPaymentMethod = computed(() => form.value.paymentMethod);

const v$ = useVuelidate(rules, { form });

const sameAsReservation = ref(false);

const copyReservationInfo = () => {
  if (sameAsReservation.value) {
    form.value.representativeName = userInfo.value?.name;
    form.value.representativePhone = userInfo.value?.phone;
    form.value.emailLocal = email.value;
    form.value.emailDomain = domain.value;
  } else {
    form.value.representativePhone = "";
    form.value.representativeName = "";
    form.value.emailLocal = "";
    form.value.emailDomain = "";
  }
};

const decreaseAdult = () => {
  if (adultCount.value > 1) adultCount.value--;
};

const increaseAdult = () => {
  if (totalGuests.value < selectedRoom.value?.maxOccupancy) adultCount.value++;
};

const decreaseChild = () => {
  if (childCount.value > 0) childCount.value--;
};

const increaseChild = () => {
  if (totalGuests.value < selectedRoom.value?.maxOccupancy) childCount.value++;
};

const handleCancel = () => {
  const isConfirmed = confirm(
    "지금까지 입력한 내용이 모두 삭제됩니다. 메인페이지로 이동하시겠습니까?"
  );

  if (isConfirmed) {
    // 예약 관련 상태 초기화
    reservationStore.$reset(); // store의 상태를 초기값으로 리셋
    // 메인 페이지로 이동
    router.push("/"); // 메인 페이지 경로에 맞게 수정하세요
  }
};

const handleSubmit = async () => {
  // 로그인 상태 확인
  if (!userStore.isLoggedIn) {
    alert("로그인이 필요합니다.");
    router.push({ name: "login" }); // 로그인 화면의 경로에 맞게 수정
    return;
  }

  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;

  const reservationForm = {
    ...form.value,
  };

  await reservationStore.createReservation(reservationForm);
  const isSuccess = await reservationStore.callImpRequestPay(
    form.value.paymentMethod
  );

  if (isSuccess) {
    router.replace({ name: "ReservationResult" });
  } else {
    router.replace("/");
  }
};
</script>

<style lang="scss" scoped>
.reservation-form {
  margin: 0 auto;
  background-color: #fff;

  .form-section {
    background-color: #f8f9fa;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .form-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .form-subtitle {
    color: #dc3545;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    .form-label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 14px;
    }

    .input-group {
      display: flex;
      align-items: center;

      .form-control {
        flex: 1;
        height: 40px;
        padding: 5px 10px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
      }

      .btn-verify {
        margin-left: 10px;
        padding: 0 15px;
        height: 40px;
        background-color: #6c757d;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        white-space: nowrap;
      }
    }

    .form-control {
      width: 100%;
      height: 40px;
      padding: 5px 10px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  .input-hint {
    font-size: 12px;
    color: #6c757d;
    display: block;
    margin-top: 5px;
  }

  .error-message {
    color: #dc3545;
    font-size: 12px;
    margin-top: 5px;
  }

  .is-invalid {
    border-color: #dc3545;

    &:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
  }

  .form-check {
    margin-bottom: 15px;
    display: flex;

    .form-check-input {
      margin-right: 5px;
    }
  }

  .email-group {
    display: flex;
    align-items: center;
    gap: 10px;

    .form-control {
      flex: 1;
    }

    .email-at {
      font-size: 16px;
    }
  }

  .guest-count-group {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .count-control {
      display: flex;
      align-items: center;
      border: 1px solid #ced4da;
      border-radius: 4px;

      button {
        width: 40px;
        height: 40px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
      }

      input {
        width: 40px;
        height: 40px;
        text-align: center;
        border: none;
        font-size: 14px;
      }

      span {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        background-color: #f8f9fa;
        border-left: 1px solid #ced4da;
        font-size: 14px;
      }
    }
  }

  .form-actions {
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
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

.payment-methods {
  display: flex;
  gap: 20px;
  margin-top: 15px;

  .payment-method-btn {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 100px;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #e74c3c;
      background-color: #fff8f8;
    }

    &.active {
      border-color: #e74c3c;
      background-color: #fff5f5;
      box-shadow: 0 2px 8px rgba(231, 76, 60, 0.1);

      .payment-text {
        color: #e74c3c;
      }

      .selected-mark {
        background-color: #e74c3c;
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
      width: 50px;
      height: 50px;
      background-color: #f8f9fa;
      border-radius: 10px;
    }

    .payment-info {
      display: flex;
      flex-direction: column;
    }

    .payment-text {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .bank-info {
      font-size: 13px;
      color: #666;
    }

    .selected-mark {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #e74c3c;
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
