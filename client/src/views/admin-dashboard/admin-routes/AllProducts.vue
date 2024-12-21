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

const select = { state: 'Florida', abbr: 'FL' }
        const  items = [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' },
        ]


</script>

<template>
 <PageTable :type="'product'"  :products="allProduct">
    <template #search>
        <form>
            <v-select
    v-model="select"
    :hint="`${select.state}, ${select.abbr}`"
    :items="items"
    item-title="state"
    item-value="abbr"
    label="Select"
    persistent-hint
    return-object
    single-line
  ></v-select>

        </form>
    </template>
 </PageTable>
</template>


<style lang="scss" scoped>


</style>