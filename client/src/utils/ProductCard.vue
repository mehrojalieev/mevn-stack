<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div v-if="product" class="product-card">
    <div class="image">
      <img :src="product.colors[0].images[0]" :alt="product.model" />
    </div>
    <h4 class="product-model">{{ product.model.slice(0,20) }}</h4>
    <div class="price-item">
      <span class="discount-price" v-if="product.discount > 0">
        ${{ (product.price - product.price * (product.discount / 100)).toFixed(2) }}
      </span>
      <strong>${{ product.price.toFixed(2) }}</strong>
    </div>
    <button class="add-to-cart-btn">Add to Cart</button>
  </div>
  <div v-else class="skeleton-card">
    <n-skeleton size="large" :sharp="false" width="100%" height="200px" :repeat="5" />
  </div>
</template>

<style lang="scss">
@mixin f-style($fSize, $fWeight, $color) {
  font-size: $fSize;
  font-weight: $fWeight;
  color: $color;
}

.product-card {
  width: 100%;
  max-width: 230px;
  padding: 15px;
  border: 1px solid var(--light-color);
  border-radius: 8px;
  background-color: var(--light-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover  {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    img {
      transform: scale(1.04);
    }

  }

  .image {
    width: 100%;
    height: 170px;
    margin-bottom: 1rem;
    /* overflow: hidden; */
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.3s ease;


    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 6px;
    }
  }

  .product-model {
    @include f-style(16px, 600, var(--dark-color));
    margin: 0.5rem 0;
  }

  .price-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 40px;
    margin-top: 0.5rem;

    strong {
      @include f-style(18px, 700, var(--primary-success));
    }

    .discount-price {
      @include f-style(14px, 500, var(--dark-color));
      text-decoration: line-through;
      margin-bottom: 0.2rem;
    }
  }

  .add-to-cart-btn {
    @include f-style(14px, 500, var(--light-color));
    width: 100%;
    letter-spacing: .5px;
    padding: 8px;
    margin-top: 1.2rem;
    border: none;
    border-radius: 6px;
    background-color: var(--primary-success);
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
}

.skeleton-card {
  width: 250px;
  height: 300px;
  background-color: var(--light-color);
  border: 1px solid var(--dark-color);
  border-radius: 8px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: rgba(200, 200, 200, 0.5);
    }
    50% {
      background-color: rgba(200, 200, 200, 0.7);
    }
    100% {
      background-color: rgba(200, 200, 200, 0.5);
    }
  }
}
</style>
