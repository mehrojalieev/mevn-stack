<script setup lang="ts">
import { useStore } from '../store/store';
import { useNotification } from 'naive-ui'


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const store: any = useStore()
const notification = useNotification()

const handleAddToCart = (current_product: any) => {
  const ExtraProduct = { ...current_product, count: 1 }

  const isProductInCart = store.$state.cart_data.some((item: any) => item._id === current_product._id);

  if (!isProductInCart) {
    showNotification(current_product?.model, "added")
  }
  store.ProductAddToCart(ExtraProduct)
}

const handleRemoveProduct = (current_product: any) => {
  let ExtraProduct = { ...current_product }
  ExtraProduct = { ...current_product }
  store.RemoveProductFromCart(ExtraProduct)
}


const handleAddToLIke = (liked_product: any) => {
  store.ProductAddToLike(liked_product)
  if (liked_product) {
    showNotification(liked_product, "liked")
  }
}

const handleUnlikeProduct = (unliked_product: any) => {
  store.RemoveProductFromLike(unliked_product)
}

const showNotification = (model: string, action: string) => {
  const actionText: string = action === "added" ? "savatga qo'shildi" : "sevimliga qo'shildi"
  notification.success({
    duration: 2000,
    title: "Toval " + actionText,
    description: model.slice(0, 25) + '...',
  })
}

</script>

<template>
  <div v-if="product" class="product-card">
    <button v-if="store.$state.like_cart.findIndex((f: any) => f?._id === props.product?._id) !== -1"
      @click="handleUnlikeProduct(props.product)" class="pi pi-heart-fill like-btn liked-btn"></button>
    <button v-else @click="handleAddToLIke(props.product)" class="pi pi-heart like-btn "></button>
    <div class="image">
      <img :src="product.colors[0].images[0]" :alt="product.model" />
    </div>
    <h4 class="product-model">{{ product.model.slice(0, 25) }}...</h4>
    <div class="feedback-action">

      <div class="stars">
        <i v-for="i in 5" :key="i" class="pi pi-star-fill"></i>
      </div>
      <p class="comment-info">(99 comments)</p>
    </div>
    <div class="price">

      <div v-if="product.discount > 0" class="price-info">
        <strong class="discount-price"> ${{ (product.price - product.price * (product.discount / 100)).toFixed(2)
          }}</strong>
        <p class="old-price">${{ product.price.toFixed(2) }}</p>
        <span class="discount">{{ product.discount }}%</span>
      </div>
      <strong class="current-price" v-else>${{ product.price }}</strong>
    </div>

    <div v-if="store.$state.cart_data.findIndex((f: any) => f?._id === props.product?._id) != -1"
      class="couter-action">
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

<style lang="scss" scoped>
@mixin f-style($fSize, $fWeight, $color) {
  font-size: $fSize;
  font-weight: $fWeight;
  color: $color;
}

.product-card {
  position: relative;
  width: 100%;
  max-width: 230px;
  padding: 15px;
  border: 1px solid var(--light-color);
  border-radius: 8px;
  background-color: var(--light-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: fit-content;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .like-btn {
    z-index: 10;
    position: absolute;
    right: 5px;
    top: 5px;
    background: transparent;
    @include f-style(22px, 400, var(--secondary-color));

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(.95);
    }
  }

  .liked-btn {
    color: var(--danger-color);
  }

  .image {
    width: 100%;
    height: 170px;
    margin-bottom: 1rem;
    overflow: hidden;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.2s ease;

    padding: 6px 0;

    img {
      width: 100%;
      height: 100%;

      object-fit: contain;
      border-radius: 6px;
    }
  }

  .product-model {
    @include f-style(14px, 400, var(--dark-color));
    line-height: 20px;
    /* height: 30px; */
    margin: .5rem 0;
  }
.feedback-action{
  display: flex;
  column-gap: 5px;
  align-items: center;
  .stars{
    display: flex;
    gap: 2px;
    i{
      color: var(--warning-color);
      font-size: 10px;
    }
  }
  .comment-info{
    @include f-style(11px, 400, var(--secondary-dark-color) );
  }
}
  .price {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 35px;
    margin-top: 15px;

    .price-info {
      width: 100%;
      position: relative;

      .discount-price {
        @include f-style(15px, 500, var(--dark-color));
      }

      .old-price {
        @include f-style(14px, 500, var(--secondary-dark-color));
        text-decoration: line-through;

      }

      .discount {
        position: absolute;
        right: 0;
        top: 5%;
        background-color: var(--primary-success);
        @include f-style(13px, 300, var(--light-color));
        border-radius: 24px;
        padding: 2px 8px;
        font-style: italic;
      }
    }
    .current-price{
      @include f-style(16px, 500, var(--dark-color) );
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

  .couter-action {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--primary-success);
    border-radius: 6px;
    margin-top: 1.2rem;
    justify-content: space-evenly;
    padding: 4px 0;

    strong {
      @include f-style(20px, 400, var(--light-color));
    }

    button {
      background: transparent;
      @include f-style(20px, 400, var(--light-color));
    }

    .remove-btn:active,
    .plus-btn:active {
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
