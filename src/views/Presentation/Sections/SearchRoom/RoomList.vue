<template>
    <div v-if="rooms.length > 0" class="row mt-5">
        <div v-for="room in rooms" :key="room.roomId" class="col-md-4 mb-4">
            <div class="card" @click="selectRoom(room)">
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
const props = defineProps({
    rooms: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['select-room']);

// 객실 선택 시 이벤트 발생
const selectRoom = (room) => {
    emit('select-room', room); // 부모 컴포넌트로 선택된 객실 정보를 전달
};
</script>