<!-- RoomSearchForm.vue -->
<template>
    <div class="card p-4">
        <form class="row g-3 align-items-center">
            <div class="col-md-4">
                <label for="resortSelect" class="form-label">방문리조트 선택</label>
                <select v-model="resort" id="resortSelect" class="form-select">
                    <option value="" disabled>지점선택</option>
                    <option v-for="accommodation in accommodations" :key="accommodation.id" :value="accommodation.id">
                        {{ accommodation.name }}
                    </option>
                </select>
            </div>

            <div class="col-md-4">
                <label for="checkIn" class="form-label">체크인</label>
                <input type="date" v-model="checkInDate" id="checkIn" class="form-control" />
            </div>

            <div class="col-md-4">
                <label for="checkOut" class="form-label">체크아웃</label>
                <input type="date" v-model="checkOutDate" id="checkOut" class="form-control" />
            </div>

            <div class="col-md-4">
                <label for="roomCount" class="form-label">객실 수</label>
                <input type="number" v-model="roomCount" min="1" id="roomCount" class="form-control" />
            </div>

            <div class="col-md-4">
                <button type="button" @click="searchRooms" class="btn btn-primary w-100">
                    객실 검색
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

// emit 함수 정의
const emit = defineEmits(["search"]);

// 폼 데이터 관리
const resort = ref("");
const checkInDate = ref("");
const checkOutDate = ref("");
const roomCount = ref(1);

// 부모 컴포넌트로부터 받는 숙소 리스트 props
const props = defineProps({
    accommodations: {
        type: Array,
        required: true
    }
});

// 검색 버튼 클릭 시 부모 컴포넌트로 데이터를 전달
const searchRooms = () => {
    emit("search", { resort: resort.value, checkInDate: checkInDate.value, checkOutDate: checkOutDate.value, roomCount: roomCount.value });
};
</script>