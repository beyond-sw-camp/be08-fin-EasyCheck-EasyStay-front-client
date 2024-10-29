<template>
  <div class="reservation-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-section">
        <h3 class="form-title">예약자 정보 입력</h3>
        <p class="form-subtitle">* 표시된 항목은 필수 입력 사항입니다.</p>

        <div class="form-group">
          <label for="reservationName" class="form-label">예약자 이름 *</label>
          <div class="input-group">
            <input
              :value="userInfo?.name"
              readonly
              type="text"
              id="reservationName"
              class="form-control"
              :class="{ 'is-invalid': v$.form.reservationName.$error }"
              placeholder="이름"
            />
          </div>
          <div class="error-message" v-if="v$.form.reservationName.$error">
            {{ v$.form.reservationName.$errors[0].$message }}
          </div>
          <small class="input-hint"
            >온라인 비회원으로 예약 시 본인인증이 필요합니다.</small
          >
        </div>

        <div class="form-group">
          <label for="reservationPhone" class="form-label"
            >예약자 휴대전화 번호 *</label
          >
          <input
            readonly
            type="tel"
            :value="userInfo?.phone"
            id="reservationPhone"
            class="form-control"
            :class="{ 'is-invalid': v$.form.reservationPhone.$error }"
            placeholder="'-' 제외하고 숫자만 입력"
          />
          <div class="error-message" v-if="v$.form.reservationPhone.$error">
            {{ v$.form.reservationPhone.$errors[0].$message }}
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3 class="form-title">투숙자 정보 입력</h3>
        <div class="form-check">
          <input
            type="checkbox"
            id="sameAsReservation"
            v-model="sameAsReservation"
            @change="copyReservationInfo"
            class="form-check-input"
          />
          <label for="sameAsReservation" class="form-check-label"
            >예약자 정보와 동일</label
          >
        </div>

        <div class="form-group">
          <label for="guestName" class="form-label">내표 투숙자 이름 *</label>
          <input
            type="text"
            id="guestName"
            v-model="form.guestName"
            class="form-control"
            :class="{ 'is-invalid': v$.form.guestName.$error }"
            placeholder="이름"
          />
          <div class="error-message" v-if="v$.form.guestName.$error">
            {{ v$.form.guestName.$errors[0].$message }}
          </div>
        </div>

        <div class="form-group">
          <label for="guestPhone" class="form-label"
            >내표 투숙자 휴대전화 번호 *</label
          >
          <input
            type="tel"
            id="guestPhone"
            v-model="form.guestPhone"
            class="form-control"
            :class="{ 'is-invalid': v$.form.guestPhone.$error }"
            placeholder="'-' 제외하고 숫자만 입력"
          />
          <div class="error-message" v-if="v$.form.guestPhone.$error">
            {{ v$.form.guestPhone.$errors[0].$message }}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">이메일 (선택)</label>
          <div class="email-group">
            <input
              type="text"
              v-model="form.emailLocal"
              class="form-control"
              placeholder="이메일"
            />
            <span class="email-at">@</span>
            <input
              type="text"
              v-model="form.emailDomain"
              class="form-control"
              placeholder="도메인"
            />
          </div>
          <small class="input-hint"
            >이메일 주소 입력 시 '예약확인정' 메일이 발송됩니다.</small
          >
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
          <small class="input-hint"
            >객실 정원은 최대 {{ selectedRoom?.maxOccupancy }}인까지
            가능합니다.</small
          >
          <small class="input-hint">객실 정원은 영유아 포함입니다.</small>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary w-100">예약하기</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { userLoginStore } from "@/stores/loginStore";
import { required, minLength, helpers } from "@vuelidate/validators";
import { useReservationStore } from "@/stores/reservationStore";

const userStore = userLoginStore();
const reservationStore = useReservationStore();

const { selectedRoom, childCount, adultCount, totalGuests } =
  storeToRefs(reservationStore);
const { userInfo, email, domain } = storeToRefs(userStore);

const form = ref({
  reservationName: "",
  reservationPhone: "",
  guestName: "",
  guestPhone: "",
  emailLocal: "",
  emailDomain: "",
});

const rules = {
  form: {
    reservationName: {
      required: helpers.withMessage("예약자 이름을 입력해주세요.", required),
      minLength: helpers.withMessage(
        "이름은 2자 이상이어야 합니다.",
        minLength(2)
      ),
    },
    reservationPhone: {
      required: helpers.withMessage("휴대전화 번호를 입력해주세요.", required),
      phoneNumber: helpers.withMessage(
        "올바른 휴대전화 번호를 입력해주세요.",
        helpers.regex(/^[0-9]{11}$/)
      ),
    },
    guestName: {
      required: helpers.withMessage("투숙자 이름을 입력해주세요.", required),
      minLength: helpers.withMessage(
        "이름은 2자 이상이어야 합니다.",
        minLength(2)
      ),
    },
    guestPhone: {
      required: helpers.withMessage("휴대전화 번호를 입력해주세요.", required),
      phoneNumber: helpers.withMessage(
        "올바른 휴대전화 번호를 입력해주세요.",
        helpers.regex(/^[0-9]{11}$/)
      ),
    },
  },
};

const v$ = useVuelidate(rules, { form });

const sameAsReservation = ref(false);

const copyReservationInfo = () => {
  if (sameAsReservation.value) {
    form.value.guestName = userInfo.value?.name;
    form.value.guestPhone = userInfo.value?.phone;
    form.value.emailLocal = email.value;
    form.value.emailDomain = domain.value;
  } else {
    form.value.guestName = "";
    form.value.guestPhone = "";
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

const handleSubmit = async () => {
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;

  const reservationData = {
    ...form.value,
    adultCount: adultCount.value,
    childCount: childCount.value,
    totalGuests: totalGuests.value,
    checkIn: reservationStore.checkIn,
    checkOut: reservationStore.checkOut,
    selectedRoom: reservationStore.selectedRoom,
    totalPrice: reservationStore.totalPrice,
  };

  console.log("Reservation Data:", reservationData);
  // API 호출 또는 store action 호출
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
</style>
