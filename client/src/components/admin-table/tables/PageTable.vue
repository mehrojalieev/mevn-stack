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


    const statusList = ["INSTOCK",  "OUTOFSTOCK", "LIMITED", "COMINGSOON", "DISCONTINUED"];

function getRandomStatus() {
    return statusList[Math.floor(Math.random() * statusList.length)];
}
    
</script>






<template>
    <div class="page__table-container">
      <slot name="search" />
      <div class="table-wrapper">
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
              :status="getRandomStatus()"
              :product="product as any"
              v-for="(product, index) in props.products"
              :key="index"
            />
          </tbody>
        </table>
      </div>
    </div>
  </template>
  


  <style lang="scss" scoped>
@mixin f-style($size, $weight, $color) {
  font-size: $size;
  font-weight: $weight;
  color: $color;
}

.page__table-container {
  max-height: 100%;
  border: 1px solid var(--gray-dark-hover);
  background-color: var(--gray-dark);
  margin-top: 2rem !important;
  overflow: hidden;
}

.table-wrapper {
  max-height: 525px;
  overflow-y: auto; 
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: var(--gray-dark);

  thead {
    position: sticky; 
    top: 0;
    background-color: rgb(36, 35, 35) !important;
    z-index: 10;
    border-bottom: 2px solid red; 

    th {
      @include f-style(15px, 500, var(--primary-success));
      padding: 10px;
    }
  }

  tbody {
    width: 100%;

    tr {
      width: 100% !important; 
      border: 1px solid var(--gray-dark-hover);

      td {
        padding: 10px;
        text-align: center;
        vertical-align: middle;
      }

      &:hover {
        background-color: var(--gray-dark-hover);
      }
    }
  }
}
</style>

