<script setup>
defineProps({
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  // label: {
  //   type: [String, Object],
  //   text: String,
  //   class: String,
  //   default: () => ({
  //     class: "",
  //   }),
  // },
  label: {
    default: () => ({}),
  },
  modelValue: {  // v-model을 위해 modelValue 사용
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});

// emit()을 사용하기 위해 defineEmits() 추가
const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};

function getClasses(size, success, error) {
  let sizeValue, isValidValue;

  sizeValue = size && `form-control-${size}`;

  if (error) {
    isValidValue = "is-invalid";
  } else if (success) {
    isValidValue = "is-valid";
  } else {
    isValidValue = "";
  }

  return `${sizeValue} ${isValidValue}`;
}
</script>
<template>
  <div class="input-group">
    <label v-if="label" :class="label.class">{{
      typeof label == "string" ? label : label.text
    }}</label>
    <span v-if="icon" class="input-group-text"
      ><i class="fas" :class="`fa-${icon}`" aria-hidden="true"></i
    ></span>
    <input
      :id="id"
      :type="type"
      class="form-control"
      :class="[getClasses(size, success, error), inputClass]"
      :value="modelValue"
      :placeholder="placeholder"
      :Required="isRequired"
      :disabled="isDisabled"
      @input="handleInput" 
    />
  </div>
</template>
