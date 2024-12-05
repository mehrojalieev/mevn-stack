<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '../../../service/ProductService';
import { Button, Column, DataTable, Rating, Tag } from 'primevue';

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();
const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getSeverity = (product: any) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return undefined; 
    }
};
</script>

<template>
    <div class="card">
        <DataTable
            :value="products"
            paginator
            :rows="10" 
            tableStyle="min-width: 50rem"
        >
            <!-- <template #header>
                <div class="header">
                    <span class="text-xl font-bold">Products</span>
                    <Button icon="pi pi-refresh" rounded raised />
                </div>
            </template> -->
            <Column field="name" header="Name"></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img
                        :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                        :alt="slotProps.data.image"
                        class="image"
                    />
                </template>
            </Column>
            <Column field="price" header="Price">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="category" header="Category"></Column>
            <Column field="rating" header="Reviews">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" readonly />
                </template>
            </Column>
            <Column header="Status">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>
            <template #footer>
                In total there are {{ products ? products.length : 0 }} products.
            </template>
        </DataTable>
    </div>
</template>


<style lang="scss" scoped>
.card {
    background-color: #18181B; 
    color: #fff; // White text
    border-radius: 8px;
    padding: 16px;

    .p-datatable {
        // border: 1px solid #2B9670;
        border-radius: 8px;

        .p-datatable-thead {
            background-color: #2B9670;
            color: #fff;
            font-weight: bold;
            padding: 16px;
        }

        .p-datatable-tbody tr:hover {
            background-color: rgba(43, 150, 112, 0.1);
        }

        td {
            color: #fff;
        }

        .p-paginator {
            background-color: #2B9670;

            .p-paginator-page {
                color: #fff;

                &:hover {
                    background-color: #fff;
                    color: #2B9670;
                }
            }
        }
    }

    .p-button {
        background-color: #2B9670;

        &:hover {
            background-color: #fff;
            color: #2B9670;
        }
    }
}

.image{
    border-radius: .25rem;
    margin-top: 5px;
    width: 90px;
    height: 60px;
}

</style>