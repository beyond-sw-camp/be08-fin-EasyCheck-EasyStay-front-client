<template>
  <NavbarDefault :sticky="true" />
  <ThemeParkInfo :themeParkName="themeParkName" />
  <div class="container-fluid px-4">
    <div class="section-divider"></div>
    <AttractionInfo />
  </div>
  <div class="container-fluid d-flex justify-content-center my-5">
    <MaterialButton color="danger" size="large" variant="gradient">
      {{ themeParkName }} 이용권 구매하기
    </MaterialButton>
  </div>
  <div class="section-divider my-4"></div>
  <InformationSection :themeParkName="themeParkName" />
</template>

<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import ThemeParkInfo from "@/views/ThemeParks/ThemeParkInfo.vue";
import AttractionInfo from "@/views/ThemeParks/AttractionInfo.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import InformationSection from "./InformationSection.vue";

const themeParkName = "속초 워터피아";
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.section-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #ccc, transparent);
  margin: 3rem 0;
  position: relative;

  &::before {
    content: "●";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    color: #ccc;
    padding: 0 10px;
    font-size: 0.8rem;
  }
}
</style>
