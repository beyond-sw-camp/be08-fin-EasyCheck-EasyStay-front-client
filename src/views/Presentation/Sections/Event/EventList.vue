<script setup>
import { ref, onMounted } from "vue";
import { useEventStore } from "@/stores/eventStore";
import { useRouter } from "vue-router";
import ExampleCard from "../../Components/ExampleCard.vue";

const events = ref([]);
const eventStore = useEventStore();
const router = useRouter();

const fetchEvents = async () => {
    try {
        await eventStore.fetchEvents();
        events.value = eventStore.allEvents;

        console.log("Events:", events.value);
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }
};

const fetchEventById = async (id) => {
    console.log("Fetching event by ID:", id);

    try {
        await eventStore.fetchEventById(id);
        router.push({ name: "Event", params: { id } });
    } catch (error) {
        console.error("Failed to fetch event by ID:", error);
    }
}

onMounted(() => {
    fetchEvents();
});
</script>

<template>
    <section class="mt-5 pt-5 mb-5 pb-5">
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
                            <ExampleCard :image="event.images" :title="event.eventName"
                                @click="fetchEventById(event.id)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>