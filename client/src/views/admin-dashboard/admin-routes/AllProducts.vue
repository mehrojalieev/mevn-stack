<script lang="ts" setup>
import { ref,  } from 'vue';
import PageTable from '../../../components/admin-table/tables/PageTable.vue';


const allProduct = ref<any>([])

    


async function renderProducts() {
try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        allProduct.value = data.products;
        console.log(data.products);
        
} catch (error) {
        console.error(error);
}
}

renderProducts()



const headerColumns= [
    { label: 'Id', key: 'id' },
    { label: 'Title', key: 'title' },
    { label: 'Image', key: 'images' },
    { label: 'Price', key: 'price' },
    { label: 'Stock', key: 'stock' },
    { label: 'Category', key: 'category' },
    { label: 'Status', key: 'status' },
    { label: 'Action', key: 'action' },
  ]

</script>

<template>
 <PageTable :type="'product'" :header-columns="headerColumns"  :data="allProduct" >
    <template #search>
      
    </template>
 </PageTable>
</template>


<style lang="scss" scoped>


</style>