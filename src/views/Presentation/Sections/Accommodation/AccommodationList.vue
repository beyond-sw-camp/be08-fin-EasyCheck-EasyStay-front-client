<script setup>
import { ref, onMounted } from "vue";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useRouter } from "vue-router";
import ExampleCard from "../../Components/ExampleCard.vue";

const accommodations = ref([]);
const accommodationStore = useAccommodationStore();
const router = useRouter();

const fetchAccommodations = async () => {
  try {
    await accommodationStore.fetchAccommodations();
    accommodations.value = accommodationStore.allAccommodations;

    console.log("Accommodations:", accommodations.value);
  } catch (error) {
    console.error("Failed to fetch accommodations:", error);
  }
};

const fetchAccommodationById = async (id) => {
  console.log("Fetching accommodation by ID:", id);

  try {
    await accommodationStore.fetchAccommodationById(id);
    router.push({ name: "Accommodation", params: { id } });
  } catch (error) {
    console.error("Failed to fetch accommodation by ID:", error);
  }
};

onMounted(() => {
  fetchAccommodations();
});
</script>

<template>
  <section class="mb-5 pb-5">
    <div class="container mt-sm-5 mt-3">
      <div class="row">
        <div class="col-lg-3">
          <div
            class="position-sticky pb-lg-5 pb-3 mt-lg-0 mt-5 ps-2"
            style="top: 100px"
          >
            <h3>Accommodation</h3>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div
              class="col-md-4"
              v-for="accommodation in accommodations"
              :key="accommodation.id"
            >
              <ExampleCard
                :image="accommodation.thumbnailUrls[0]"
                :title="accommodation.name"
                @click="fetchAccommodationById(accommodation.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
