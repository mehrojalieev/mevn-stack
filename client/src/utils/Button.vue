<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    buttonType:{
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
    <button :class="'btn-'+buttonType" class="submit-btn" :disabled="props.loading">
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
  width: 90%;
  margin: 1.2rem auto 0 !important;
  border-radius: 6px;
  height: 45px;
  padding: 7px 0;
  @include f-style(15px, 500, var(--light-color));
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

.btn-primary{
  background-color: var(--primary-success);
}

.btn-info{
  background-color: var(--light-color);
  color: var(--dark-color);
  border: 2px solid var(--secondary-color) !important;
  &:hover{
    background-color: var(--primary-dark-color);
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