<script setup lang="ts">
import { computed } from 'vue';
import {Modal} from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  status: {
        type: String,
        required: true,
    },
    no: {
      type: Number,
      default: 0
    }
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
  console.log(`Editing product: ${product}`);
};

const handleDelete = (product: any) => {
  console.log(`Deleting product: ${product.title}`);
  // return new Promise((resolve, reject) => {
  //       setTimeout(Math.random() > 0.5 ? resolve : reject, 800);
  //     }).catch(() => console.log('Oops errors!'));
};


const showConfirm = () => {
  Modal.confirm({
    okText: 'Delete',
    cancelText: 'Cancel',
    okType: 'danger',
    centered: true,
    bodyStyle: {padding: 0},
    mask: true,
    title: 'Do you want to delete this product?',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
     handleDelete(props.product);
    },
    onCancel() {},
  });
};
</script>

<template>
  <tr class="product-row" v-if="!isLoading">
    <td>{{ no }}</td>
    <td>{{ product?.model.slice(0, 10) }}...</td>
    <td>{{ product.category }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.stock }}</td>
    <td  class="product-status"><button :class="statusClass" class="status-btn" >{{ product.discount }}</button></td>
    <td>
      <n-image width="50" height="50" :src="product.colors ? product?.colors[0]?.images[0] : 'https://img.freepik.com/premium-vector/m-letter-logo-design_1159859-5474.jpg'" loading="lazy"  alt="Product Image" />
    </td>
    <td class="row-actions">
      <button class="action-btn view-btn pi pi-eye"></button>
      <button class="action-btn edit-btn pi pi-pencil" @click="handleEdit(product)"></button>
      <a-button okText="Yes" class="action-btn delete-btn pi pi-trash" @click="showConfirm"></a-button>
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

  .ant-modal-content{
    background-color: var(--gray-dark) !important;
    .ant-modal-confirm-title{
      @include f-style(15px, 400, var(--light-color) !important);
    }
    .ant-btn-dangerous{
      background-color: var(--danger-color) !important;
      @include f-style(14px, 400, var(--light-color) !important);
    }
  }


</style>