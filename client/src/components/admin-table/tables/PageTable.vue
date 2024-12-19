<script setup lang="ts">
import ProductTr from './ProductTr.vue';

    const props = defineProps({
        products: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    })


    console.log(props.products);
    
</script>






<template>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <ProductTr
                    :product="product as any"
                    v-for="(product, index) in props.products"
                    :key="index"
                />
            </tbody>
        </table>
</template>



<style lang="scss">
@mixin f-style($size, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    color: $color;
}

/* Wrapper to make the table scrollable */
.table-container {
    max-height: 100%; 
    overflow-y: auto;
    border: 1px solid var(--gray-dark-hover);
    background-color: var(--gray-dark);
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;

    thead {
        position: sticky;
        top: 0; 
        background-color: var(--gray-dark) !important;
        height: 60px;
        tr{

            th {
                @include f-style(15px, 500, var(--light-color)); 
                padding: 10px;
            }
        }
    }

    tbody {
        tr {
            border: 1px solid var(--gray-dark-hover);
            vertical-align: middle;
            height: 50px;
            &:hover {
                background-color: var(--gray-dark-hover); 
            }
        }
    }
}
</style>
>