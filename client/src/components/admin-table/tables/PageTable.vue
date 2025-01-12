<script setup lang="ts">
import ProductTr from './ProductTr.vue';
import UserTr from './UserTr.vue';

    const props = defineProps({
        data: {
            type: Array,
            required: false
        },
        headerColumns: {
            type: Array as any,
            required: false
        },
        type: {
            type: String,
            required: false
        }
    })

    
</script>


<template>
    <div class="page__table-container">
      <slot name="search" />
      <div class="table-wrapper">
        <table>
          <thead>
            <tr >
              <th v-for="(column, index) in props.headerColumns"  :key="index">{{ column === 'colors' ? 'image': column }}</th>
              <th>Actions</th>
            </tr>
            <tr >
            </tr>
          </thead>
          <tbody>
            <ProductTr v-if="type === 'product'" :isLoading="false" :no="index + 1"  :product="product as any" v-for="(product, index) in props.data" :key="`product-${index}`"/>
            <UserTr v-else-if="type === 'users'" :isLoading="false" :user="user as any" v-for="(user, index) in props.data" :key="`user-${index}`"/>
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
  height: 100%;
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
    height: 60px;
    border-bottom: 1px solid rgb(92, 92, 92) !important; 

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

