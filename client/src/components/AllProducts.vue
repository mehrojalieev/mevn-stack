<script setup lang="ts">
import {  onMounted, ref } from 'vue';

import ProductCard from '../utils/ProductCard.vue';
import ProductSkeletonCard from '../utils/ProductSkeletonCard.vue';
import ApiInstance from '../services/api';
import { useProducts } from '../queries';

const AllProducts = ref<any[]>([])
const isLoading = ref<boolean>(false)
   
const handleRenderProducts = async () => {
    isLoading.value = true
    try {   
        const products = await ApiInstance.get("/product/all")
            AllProducts.value = products.data
    } 
    catch (error: any) {
        console.log(error);
    }
    finally{
        isLoading.value = false;
    }
}

const { data, } = useProducts()

console.log('data', data.value)

onMounted(() => {
    handleRenderProducts()
})  
</script>


<template>
    <section class="products-wrapper container">
        <ProductSkeletonCard v-if="isLoading" v-for="index in 20" :key="index"/>
        <ProductCard v-for="(product, index) in AllProducts" :product="product" :key="index"/>
    </section>
</template>

<style lang="scss" scoped>
    .products-wrapper{
        width: 100%;
        display: grid;
        margin-top: 2rem;
        grid-template-columns: repeat(5, 1fr);
        place-items: center;
        gap: 1.4rem 1.2rem;
    }

    @media only screen and (max-width:768px){
        .products-wrapper{
            grid-template-columns: repeat(4, 1fr);
        gap: 1.2rem 1rem;
        }
    }
    @media only screen and (max-width:568px){
        .products-wrapper{
            grid-template-columns: repeat(3, 1fr);
        gap: 1rem .8rem;
        }
    }
    @media only screen and (max-width:378px){
        .products-wrapper{
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>