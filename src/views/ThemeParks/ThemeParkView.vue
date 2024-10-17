<template>
  <navbar-default :sticky="true"/>
  <ThemeParkInfo />
  <div class="container-fluid px-4">
    <div class="section-divider"></div>
    <attraction-info />
  </div>
</template>

<script setup>
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import ThemeParkInfo from "@/views/ThemeParks/ThemeParkInfo.vue";
import AttractionInfo from "@/views/ThemeParks/AttractionInfo.vue";
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
