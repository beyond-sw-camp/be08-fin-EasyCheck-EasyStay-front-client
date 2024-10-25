<template>
  <component :is="guideComponent" />
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";
import { defineProps, computed } from "vue";

const props = defineProps({
  guidePageName: {
    type: String,
    required: true,
  },
});

const guideComponent = computed(() => {
  const availableComponents = import.meta.glob(
    "@/views/ThemeParks/UsageGuides/*.vue"
  );

  const componentPath =
    availableComponents[`./${props.guidePageName}.vue`];

  console.log("Looking for component path: ", `./${props.guidePageName}.vue`);
  console.log("Found component path: ", componentPath);

  if (!componentPath) {
    console.error(`Component ${props.guidePageName} not found`);
    return null;
  }

  return defineAsyncComponent(() => componentPath());
});
</script>
