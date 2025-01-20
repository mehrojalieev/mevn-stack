<script setup lang="ts">
import { useDialog, useMessage } from 'naive-ui'
import { useStore } from '../store/store'

    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    })

    const dialog = useDialog()
    const message =useMessage()
    const store: any = useStore()


    const handleAddToCart = (current_product: any) => {
  const ExtraProduct = {...current_product, count: 1}
  store.ProductAddToCart(ExtraProduct)
}

const handleRemoveProduct = (current_product: any) => {
  let ExtraProduct = {...current_product}
  ExtraProduct = {...current_product}
  store.RemoveProductFromCart(ExtraProduct)
}


    const handleRemoveItem = async (removingItem: any) => {
    const dialogInstance = dialog.create({
        title: "Confirm Deletion",
        content: `Are you sure you want to remove this item: "${removingItem.model.slice(0, 30)}..."?`,
        positiveText: "Yes",
        negativeText: "Cancel",
        onPositiveClick: async () => {
            dialogInstance.loading = true
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success(`Item "${removingItem.model.slice(0, 25)}..." removed successfully.`);
            } catch (error) {
                message.error("Failed to remove the item. Please try again.");
            }
            finally{
                dialogInstance.destroy(); 
                dialogInstance.loading = false
            }
        },
        onNegativeClick: () => {
            message.info("Item removal canceled.");
            dialogInstance.destroy(); 
        },
        maskClosable: false
    });
};
</script>

<template>

    <div class="cart__product-card">
        <n-checkbox class="checkbox-btn" size="large"  />
        <div class="product-info">  
            <router-link :to="`product/${product._id}`" >
                <img class="card-image" :src="props.product.colors[0].images[0]" alt="">
            </router-link>
            <div class="info-content">
                <h5 class="model-text">{{ product.model }}</h5>
                <strong>Price: {{ product.price }}$</strong>
                <strong>Brand: {{ product.brand }}</strong>
                <div class="count-action">
                    <button class="remove-btn" @click="handleRemoveProduct(props.product)">-</button>
                    <strong>{{ store.$state.cart_data?.find((ind: any) => ind?._id === props.product?._id)?.count  }}11</strong>
                     <button class="plus-btn" @click="handleAddToCart(props.product)">+</button>
                </div>
            </div>
        </div>
        <button @click="handleRemoveItem(props.product)" class="remove-btn"><i class="pi pi-trash"></i>Remove</button>
    </div>
</template>


<style lang="scss" scoped>
  @mixin f-style($fSize, $fWeight, $color){
        font-size: $fSize;
        font-weight: $fWeight;
        color: $color;
}

    .cart__product-card{
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        column-gap: 1.5rem;
        margin-top: 1rem;

        max-width: 850px;
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid var(--secondary-color);
        height: fit-content;
        .checkbox-btn{
            position: absolute;
            right: 2%;
            top: 8%;
        }
        .card-image{
            max-width: 100px;
            width: 100%;
            height: 84px;
            object-fit: contain;
        }
        .product-info{
            display: flex;
            align-items: center;
            column-gap: 10px;
            

        }
        .info-content{
            display: flex;
            flex-direction: column;
            justify-content: center;
            .model-text{
                @include f-style(15px, 500, var(--dark-color) );
                margin-bottom: 10px;
            }
            strong{
                @include f-style(14px, 500, var(--secondary-dark-color) )
            }
            .count-action{
                display: flex;
                align-items: center;
                column-gap: 10px;
                width: fit-content;
                background: #dddcdc71;
                border-radius: 6px;
                padding: 0px 7px;
                margin-top: 18px;
                margin-left: 1rem;
                button{
                    background: transparent;
                    @include f-style(20px, 400, var(--dark-color) )
                }
                strong{
                    @include f-style(15px, 500, var(--dark-color) )
                }
            }
        }
        .remove-btn{
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 5px;
            background: transparent;
            @include f-style(13px , 500, var(--secondary-dark-color) )
        }
    }

    
</style>