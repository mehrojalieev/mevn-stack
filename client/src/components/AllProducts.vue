<script setup lang="ts">
import {  onMounted, ref } from 'vue';
import ApiInstance from '../services/api';
import ProductCard from '../utils/ProductCard.vue';


const AllProducts = ref<any[]>([])

const handleRenderProducts = async () => {
    try {   
        const products = await ApiInstance.get("/product/all")
            AllProducts.value = products.data
    } 
    catch (error: any) {
        console.log(error);
            
    }
}

onMounted(() => {
    handleRenderProducts()
})
    
</script>

<template>
    <section class="products-wrapper container">
        <ProductCard v-for="(product, index) in AllProducts" :product="product" :key="index"/>
    </section>
</template>

<style lang="scss" scoped>
    .products-wrapper{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        place-items: center;
        gap: 1rem .7rem;
    }
</style>