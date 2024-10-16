<template>
  <div class="card">
    <img :src="props.info.imgUrl" class="card-img" alt="Room image" />
    <div v-if="props.info.title" class="card-img-overlay text-center">
      <h5 class="card-title text-white">{{ props.info.title }}</h5>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  info: {
    title: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    transition: background-color 0.3s ease;
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card-img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
  }

  .card-title {
    transition: transform 0.3s ease, text-shadow 0.3s ease;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    &::before {
      background-color: rgba(0, 0, 0, 0.3);
    }

    .card-img {
      transform: scale(1.1);
    }

    .card-title {
      transform: translateY(-5px);
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
