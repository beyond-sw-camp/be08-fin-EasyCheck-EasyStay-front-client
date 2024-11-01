<template>
  <div
    class="summary-item"
    :class="{
      card: !isMobile,
      mobile: isMobile,
    }"
  >
    <div :class="{ 'card-body': !isMobile }">
      <small class="summary-label" v-if="!isMobile">{{ label }}</small>
      <div class="summary-content">
        <span class="label-mobile" v-if="isMobile">{{ label }}</span>
        <div class="value-container">
          <h6 :class="{ price: isPrice }">
            {{ value }}
            <span v-if="badge" class="badge rounded-pill">{{ badge }}</span>
          </h6>
          <i
            v-if="!isMobile && editable"
            class="bi bi-pencil-square"
            @click="$emit('edit')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  badge: String,
  isPrice: Boolean,
  isMobile: Boolean,
  editable: Boolean,
});

defineEmits(["edit"]);
</script>

<style lang="scss" scoped>
.summary-item {
  flex: 1;
  margin: 0.5rem;
  transition: all 0.3s ease;

  &.card {
    background-color: #363636;
    border: none;
    border-radius: 0;
  }

  &.mobile {
    width: 100%;
    background-color: transparent;
    margin: 0.25rem 0;
  }

  .card-body {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .summary-label {
    font-size: 0.75rem;
    color: #999;
  }

  .summary-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .label-mobile {
      font-size: 0.75rem;
      color: #fff;
      opacity: 0.7;
    }
  }

  .value-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  h6 {
    font-size: 0.9rem;
    color: white;
    margin: 0;

    &.price {
      color: #e74c3c;
    }
  }

  .badge {
    background-color: #4a4a4a;
    color: white;
    font-weight: normal;
    font-size: 0.75rem;
    padding: 0.25em 0.5em;
  }

  .bi-pencil-square {
    font-size: 0.9rem;
    color: #999;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
    }
  }
}
</style>
