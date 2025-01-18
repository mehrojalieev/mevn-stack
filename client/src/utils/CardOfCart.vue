<script setup lang="ts">
    const props = defineProps({
        prodoct: {
            type: Object,
            required: true
        }
    })
</script>

<template>

    <div class="cart__product-card">
        <div class="product-info">
            <router-link :to="`product/${prodoct._id}`" >
                <img class="card-image" :src="props.prodoct.colors[0].images[0]" alt="">
            </router-link>
        </div>
        <div class="card-action"></div>
    </div>
</template>


<style lang="scss" scoped>
    .cart__product-card{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        column-gap: 1.5rem;
        margin-top: 1rem;
        max-width: 850px;
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid var(--secondary-color);
        height: fit-content;
        .card-image{
            max-width: 100px;
            width: 100%;
            height: 84px;
            object-fit: contain;
        }
    }
</style>