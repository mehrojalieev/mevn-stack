<script setup lang="ts">
import { useStore } from '../store/store';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const store: any = useStore()

const handleAddToCart = (current_product: any) => {
  const ExtraProduct = {...current_product, count: 1}
  store.ProductAddToCart(ExtraProduct)
}

const handleRemoveProduct = (current_product: any) => {
  let ExtraProduct = {...current_product}
  ExtraProduct = {...current_product}
  store.RemoveProductFromCart(ExtraProduct)
}

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
    <div v-if="store.$state.cart_data.findIndex((f: any) => f?._id === props.product?._id ) != -1" class="couter-action">
        <button class="remove-btn" @click="handleRemoveProduct(props.product)">-</button>
        <strong>{{ store.$state.cart_data?.find((ind: any) => ind?._id === props.product?._id)?.count }}</strong>
        <button class="plus-btn" @click="handleAddToCart(props.product)">+</button>
    </div>
    <button v-else @click="handleAddToCart(props.product)" class="add-to-cart-btn">Add to Cart</button>
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
  .couter-action{
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--primary-success);
    border-radius: 6px;
    margin-top: 1.2rem;
    justify-content: space-evenly;
    padding:  4px 0;
    strong{
      @include f-style(20px, 400, var(--light-color) );
    }
    button{
      background: transparent;
      @include f-style(20px, 400, var(--light-color) );
    }
    .remove-btn:active, .plus-btn:active{
      transform: scale(0.8);
    }
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
