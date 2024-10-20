<!-- RoomList.vue -->
<template>
    <div v-if="rooms.length > 0" class="row mt-5">
        <div v-for="room in rooms" :key="room.roomId" class="col-md-4 mb-4">
            <div class="card">
                <img :src="room.imageUrls[0]" class="card-img-top" alt="Room Image" />
                <div class="card-body">
                    <h5 class="card-title">{{ room.roomTypeName }}</h5>
                    <p class="card-text">남은 객실: {{ room.remainingRoom }}</p>
                    <p class="card-text">상태: {{ room.status }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

// 부모로부터 받은 객실 리스트를 사용
const props = defineProps({
    rooms: {
        type: Array,
        required: true
    }
});
</script>