<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
//Vue Material Kit 2 components

// sections
import PresentationCounter from "./Sections/PresentationCounter.vue";
import PresentationExample from "./Sections/PresentationExample.vue";
import data from "./Sections/Data/designBlocksData";

//images
import vueMkHeader from "@/assets/img/HanWhaResort.jpg";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <div class="page-header min-vh-100" :style="`background-image: url(${vueMkHeader})`" loading="lazy">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1 class="text-white pt-3 mt-n5 me-2" :style="{ display: 'inline-block ' }">
              EasyStay
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              You can stay here through EasyCheck.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body shadow-blur mx-3 mx-md-7 mt-n8">
    <PresentationCounter />
    <!-- <PresentationInformation /> -->
    <PresentationExample :data="data" />
    <!-- <PresentationPages /> -->
    <!-- <BuiltByDevelopers /> -->

  </div>
  <DefaultFooter />
</template>
