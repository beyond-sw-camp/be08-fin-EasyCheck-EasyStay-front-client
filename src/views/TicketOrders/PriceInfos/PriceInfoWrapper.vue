<!-- src/components/PriceInfoWrapper.vue -->
<template>
  <suspense>
    <template #default>
      <component :is="priceInfoComponent" />
    </template>
    <template #fallback>
      <div class="spinner-overlay">
        <div class="spinner"></div>
      </div>
    </template>
  </suspense>
</template>

<script setup>
import { defineAsyncComponent, defineProps, computed } from "vue";

const props = defineProps({
  guidePageName: {
    type: String,
    required: true,
  },
});

// guidePageName을 통해서 특정 요금 정보 컴포넌트를 동적으로 가져옵니다
const priceInfoComponent = computed(() => {
  const availableComponents = import.meta.glob(
    "@/views/TicketOrders/PriceInfos/*.vue"
  );

  const componentPath = availableComponents[`./${props.guidePageName}.vue`];

  if (!componentPath) {
    console.error(`Component ${props.guidePageName} not found`);
    return null;
  }

  return defineAsyncComponent({
    loader: () => componentPath(),
    delay: 200,
  });
});
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
