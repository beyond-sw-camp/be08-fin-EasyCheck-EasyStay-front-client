<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/api";
import ExampleCard from "../../Components/ExampleCard.vue";

const accommodations = ref([]);

const fetchAccommodations = async () => {
  try {
    const response = await apiClient.get("/accommodations");
    accommodations.value = response.data;
  } catch (error) {
    console.error("Failed to fetch accommodations:", error);
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
            <h6 class="text-secondary font-weight-normal pe-3">
              숙소 목록을 확인하세요.
            </h6>
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
                :accommodationId="accommodation.id"
                :image="accommodation.thumbnailUrls[0]"
                :title="accommodation.name"
                :route="'Accommodation'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
