<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '../../../service/ProductService';
import PageTable from '../../../components/admin-table/tables/PageTable.vue';
onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();




const productData: any = []

const allProduct = ref<any>([])




async function renderProducts() {
try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        allProduct.value = data.products;
} catch (error) {
        console.error(error);
}
}

renderProducts()

for (let index = 0; index < 30; index++) {
    productData.push({
        id: index,
        title: `Product ${index + 1}`,
        image: 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png',
        price: Math.floor(Math.random() * 100),
        stock: Math.floor(Math.random() * 100),
        category: ['Accessories', 'Clothing', 'Electronics', 'Fitness', 'Sports'][Math.floor(Math.random() * 5)],
        rating: Math.floor(Math.random() * 5) + 1,
        status: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'][Math.floor(Math.random() * 3)],
    });
    
}


</script>

<template>
 <PageTable :type="'product'"  :products="allProduct"/>
</template>


<style lang="scss" scoped>


</style>