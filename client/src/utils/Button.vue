<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        required: false
    }
})

</script>

<template>
    <button class="submit-btn" :disabled="props.loading">
        <span v-if="props.loading" class="spinner"></span>
        <span v-else>{{ props.text }}</span>
    </button>
</template>


<style lang="scss">
@mixin f-style($size, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    color: $color;
}

.submit-btn {
  margin-top: 1.5rem !important;
  width: 100%;
  border-radius: 6px;
  height: 38px;
  padding: 7px 0;
  @include f-style(15px, 500, var(--light-color));
  background-color: var(--primary-success);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}


.spinner {
  border: 2px solid var(--light-color); 
  border-top: 2px solid var(--primary-success); 
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>