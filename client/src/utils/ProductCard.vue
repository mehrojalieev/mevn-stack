<script setup lang="ts">
    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div v-if="props.product" class="product-card">
        <div  class="image">
            <img :src="product.colors[0].images[0]" :alt="product?.model">
        </div>        
        <h4 class="product-model">{{product.model}}</h4>

    </div>
    <div v-else  class="skeleton-card">
        <n-skeleton size="large" :sharp="false" width="100%" height="100px" style="background-color: blue;" :repeat="5"/>
    </div>
</template>

<style lang="scss">

@mixin f-style($fSize, $fWeight, $color){
    font-size: $fSize;
    font-weight: $fWeight;
    color: $color;
}

    .product-card{
        width: 100%;
        max-width: 220px;
        height: fit-content;
        overflow: hidden;
        border-radius: 6px;
        padding: 10px;
        border: 1px solid var(--secondary-color);
        .image{
            width: 100%;
            height: 190px;
            cursor: pointer;
            margin-bottom: 1rem;
            &:hover{
                transform: scale(1.1);
                transition: .2s;
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .product-model{
                @include f-style(15px, 400, var(--dark-color) );
                word-break: break-all;
        }
    }
    .skeleton-card{
        width: 100px;
        height: 200px;
        background-color: red;
    }
</style>


