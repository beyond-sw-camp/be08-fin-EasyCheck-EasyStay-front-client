<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ExampleCard from "../../Components/ExampleCard.vue";

const events = ref([]);

const fetchEvents = async () => {
    try {
        const response = await axios.get('/api/v1/events');
        events.value = response.data;
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }
};

onMounted(() => {
    fetchEvents();
});
</script>

<template>
    <section class="mb-5 pb-5">
        <div class="container mt-sm-5 mt-3">
            <div class="row">
                <div class="col-lg-3">
                    <div class="position-sticky pb-lg-5 pb-3 mt-lg-0 mt-5 ps-2" style="top: 100px">
                        <h3>Event</h3>
                        <h6 class="text-secondary font-weight-normal pe-3">
                            이벤트 목록을 확인하세요.
                        </h6>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="row">
                        <div class="col-md-4" v-for="event in events" :key="event.id">
                            <ExampleCard :image="event.images" :title="event.eventName" :route="''" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>