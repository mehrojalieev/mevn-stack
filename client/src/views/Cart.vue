<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store/store';
import Button from '../utils/Button.vue';
import CardOfCart from '../utils/CardOfCart.vue';

const store = useStore()
const isLoading = ref<boolean>(false)

</script>

<template>
    <section class="cart container">

        <div v-if="store?.$state?.cart_data && store?.$state?.cart_data.length > 0" >
            <header class="cart-header">
                <h3 class="cart-title">Your Cart,</h3>
                <p class="cart__items-total">{{ store?.$state.cart_data?.length }} {{ store?.$state.cart_data?.length > 1 ?'products' : 'product' }}</p>
            </header>
            <div class="cart-wrapper">
                <div class="cart__items-wrapper">
                    <CardOfCart v-for="(product, index) in store.$state.cart_data" :product="product" :key="index" />
                </div>
                <div class="cart__payment-box">
                    <div class="box__header-actions">
                        <div class="action-item total-item">
                            <h6>Total</h6>
                            <p>${{ store.cartTotal }}</p>
                        </div>
                        <div class="action-item ">
                            <h6>Items number</h6>
                            <p>{{ store.$state.cart_data.length }}</p>
                        </div>
                        <div class="action-item ">
                            <h6>Delivery</h6>
                            <p class="free-text">Free</p>
                        </div>
                    </div>

                    <div class="delivery-content">
                        <h6>Bepul yetkazib berish</h6>
                        <p>Yetkazib berish: Toshkent bo'ylab 24 soat ichida, Respublika bo'ylab 3 kungacha</p>
                    </div>

                    <div class="action-btns">
                        <Button text="To'lov qilish" buttonType="primary" :loading="isLoading" />
                        <Button text="Muddatli to'lovga olish" button-type="info" :loading="isLoading" />
                    </div>
                </div>
            </div>
        </div>


        <div v-else class="empty__cart-wrapper">
            <img src="https://thumbs.dreamstime.com/b/icon-empty-cart-empty-empty-cart-330881055.jpg">
            <h5>Your cart is empty</h5>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@mixin f-style($fSize, $fWeight, $color) {
    font-size: $fSize;
    font-weight: $fWeight;
    color: $color;
}

.cart {
    margin-top: 2rem;
    margin-bottom: 1.6rem;
}

.cart-header {
    display: flex;
    align-items: center;
    column-gap: 1rem;

    .cart-title {
        @include f-style(28px, 500, var(--dark-color))
    }

    .cart__items-total {
        @include f-style(22px, 500, var(--secondary-dark-color))
    }
}

.cart-wrapper {
    display: flex;
    align-items: flex-start;
    margin-top: 1rem;
    width: 100% !important;
    column-gap: 1.5rem;
    justify-content: space-between;
}



.cart__items-wrapper {
    width: 100%;
}


.cart__payment-box {
    max-width: 390px;
    width: 100%;
    height: fit-content;
    background-color: #F4F6F7;
    border-radius: 6px;
    padding: 12px;

    .box__header-actions {
        width: 80%;
        margin: 0 auto;
        border-bottom: 1px solid var(--secondary-color);
        padding-bottom: 1rem;

        .action-item {
            text-align: left;
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
            margin-bottom: 5px;

            h6 {
                @include f-style(14px, 550, var(--secondary-dark-color));
            }

            p {
                @include f-style(14px, 550, var(--secondary-dark-color));
            }
            .free-text{
                color: var(--primary-success);
            }
        }

        .total-item {
            margin-bottom: 12px;

            h6 {
                @include f-style(20px, 500, var(--dark-color));

            }

            p {
                @include f-style(20px, 500, var(--dark-color));
            }
        }
    }

    .delivery-content{
        
        width: 80%;
        margin: 10px auto;
        h6{
            @include f-style(13px, 500, var(--primary-success) );
        }
        p{
            margin-top: 5px;
            @include f-style(12px, 400, var(--secondary-dark-color) );
            line-height: 16px;
        }
    }

    .action-btns {
        text-align: center;
    }
}

/* EMPTY CONTENT STYLES */
.empty__cart-wrapper {
    margin-top: 3.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
        width: 100%;
        max-width: 460px;
        height: 280px;
        object-fit: contain;
    }

    h5 {
        @include f-style(30px, 500, var(--secondary-dark-color));
        letter-spacing: .5px;
    }
}
</style>