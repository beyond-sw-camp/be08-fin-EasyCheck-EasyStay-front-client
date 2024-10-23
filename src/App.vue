<script setup>
import DefaultFooter from "@/examples/footers/FooterDefault.vue";
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <router-view />
  <default-footer />
</template>
