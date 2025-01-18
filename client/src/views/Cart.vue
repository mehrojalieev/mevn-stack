<script setup lang="ts">
import { useStore } from '../store/store';
import CardOfCart from '../utils/CardOfCart.vue';

    const store = useStore()
    console.log(store);
    
</script>

<template>
    <section class="cart container">

        <div v-if="store?.$state?.cart_data && store?.$state?.cart_data.length > 0" class="cart container">
            <header class="cart-header">
                <h3 class="cart-title">Your Cart,</h3>
                <p class="cart__items-total">{{ store?.$state.cart_data?.length }} {{ store?.$state.cart_data?.length > 1 ? 'products' : 'product' }}</p>
            </header>
            <div class="cart__items-wrapper">
                <CardOfCart v-for="(product, index) in store.$state.cart_data" :prodoct="product"  :key="index"/>
            </div>
        </div>
        <div v-else class="empty__cart-wrapper">
            <img src="https://thumbs.dreamstime.com/b/icon-empty-cart-empty-empty-cart-330881055.jpg">
            <h5>Your cart is empty</h5>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    @mixin f-style($fSize, $fWeight, $color){
        font-size: $fSize;
        font-weight: $fWeight;
        color: $color;
}

.cart{
    margin-top: 2rem;
}
.cart-header{
    display: flex;
    align-items: center;
    column-gap: 1rem;
    .cart-title{
        @include f-style(28px, 500, var(--dark-color))
    }
    .cart__items-total{
        @include f-style(28px, 500, var(--secondary-dark-color))
    }
}

/* EMPTY CONTENT STYLES */
        .empty__cart-wrapper{
            margin-top: 3.5rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            img{
                width: 100%;
                max-width: 460px;
                height: 280px;
                object-fit: contain;
            }
            h5{
                @include f-style(30px, 500, var(--secondary-dark-color));
                letter-spacing: .5px;
            }
        }
</style>