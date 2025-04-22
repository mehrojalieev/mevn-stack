<script lang="ts" setup>
import { ref,  } from 'vue';
import PageTable from '../../../components/admin-table/tables/PageTable.vue';
import ApiInstance from '../../../services/api';

defineOptions({
 name: 'AllProducts'
})

const allProduct = ref<any>([])

const productKeys = ref<Set<string>>(new Set());
const requiredKeys = ["_id", "model",  "category", "price", "stock", "discount", "colors", ]

async function renderProducts ()  {
        try {
                const response = await ApiInstance.get('/product/all')
                allProduct.value = response.data

                response?.data?.forEach((product: any) => {
                Object.keys(product).forEach((key) => {
                        if(requiredKeys.includes(key)){
                        productKeys.value.add(key)
                        }
                });
    });
                
        } 
        catch (error:any) {
                console.log(error);
                        
        }
}
renderProducts()



</script>

<template>
 <PageTable :type="'product'" :header-columns="Array.from(productKeys)"  :data="allProduct" >
    <template #search>
      
    </template>
 </PageTable>
</template>


<style lang="scss" scoped>


</style>