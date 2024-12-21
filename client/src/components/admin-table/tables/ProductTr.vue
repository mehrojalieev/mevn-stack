<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object as () => {
      id: number;
      title: string;
      images: string[];
      price: number;
      stock: number;
      category: string;
      rating: number;
      status: string;
    },
    required: true,
  },
  status: {
        type: String,
        required: true,
    },
});




const statusClass = computed(() => {
    switch (props.status) {
        case "INSTOCK":
            return "text-success";
        case "OUTOFSTOCK":
            return "text-danger";
        case "LIMITED":
            return "text-warning";
        case "COMINGSOON":
            return "text-info";
        case "DISCONTINUED":
            return "text-muted";
        default:
            return "";
    }
});


const handleEdit = (product: any) => {
  console.log(`Editing product: ${product.name}`);
};

const handleDelete = (product: any) => {
  console.log(`Deleting product: ${product.name}`);
};
</script>

<template>
  <tr class="product-row">
    <td>{{ product.id }}</td>
    <td>{{ product.title.slice(0, 10) }}...</td>
    <td>
      <img :src="product.images[0]"  alt="Product Image" />
    </td>
    <td>{{ product.price }}</td>
    <td>{{ product.stock }}</td>
    <td>{{ product.category }}</td>
    <td  class="product-status"><button :class="statusClass" class="status-btn" >{{ status }}</button></td>
    <td class="row-actions">
      <button class="action-btn view-btn pi pi-eye"></button>
      <button class="action-btn edit-btn pi pi-pencil" @click="handleEdit(product)"></button>
      <button class="action-btn delete-btn pi pi-trash" @click="handleDelete(product)"></button>
    </td>
  </tr>
</template>


<style lang="scss" >
@mixin f-style($size, $weight, $color){
  font-size: $size;
  font-weight: $weight;
  color: $color;
}
  .product-row{
    width: 100% !important;
    height: 100%;
    height: 50px !important;
    td{
      @include f-style(15px, 500, var(--light-color));
      height: 100%;
    }
    td > img{
      width: 50px;
      height: 50px;
      object-fit: contain;
    }
    .product-status{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 61px !important;
      /* width: fit-content; */
      @include f-style(15px, 500, var(--light-color));
      .status-btn{
        border-radius: 6px;
        padding: 2px 8px;
        letter-spacing: .5px;
        @include f-style(13px, 400, var(--light-color));
        text-transform: lowercase;
      }
    }
    .row-actions{
          padding: 1rem !important;
          vertical-align: middle !important;
          /* display: flex; */
          align-items: center;
          /* justify-content: center; */
          height: 40px !important;
          column-gap: 10px;
          .action-btn{
            margin: 0 4px;
            padding: 7px 10px;
            border-radius: 6px;
            @include f-style(14px, 500, var(--light-color));
          }
          .edit-btn{
            background-color: var(--primary-success);
          }
          .delete-btn{
            background-color: var(--danger-color);
          }
          .view-btn{
            background-color: var(--warning-color);
          }
      }
  }




</style>