<template>
  <div class="info-cell">
    <div class="info-label">{{ label }}</div>
    <div class="info-value" :class="{ 'text-accent': accent }">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
  accent: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.info-cell {
  flex: 1;
  padding: 15px;
  background-color: #fff;

  &:first-child {
    border-right: 1px solid #eee;
  }

  .info-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
  }

  .info-value {
    font-size: 16px;
    font-weight: 500;
    color: #333;

    &.text-accent {
      color: #e74c3c;
      font-weight: 600;
    }
  }
}
</style>
