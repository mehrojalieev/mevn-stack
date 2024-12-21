<script lang="ts" setup>
import { ref } from 'vue';
import PageTable from '../../../components/admin-table/tables/PageTable.vue';

const allUsers = ref<any>([])

    for (let index = 0; index < 30; index++) {
        allUsers.value.push({
            id: index,
            name: `User ${index + 1}`,
            email: `user${index + 1}@example.com`,
            role: ['admin', 'user'][Math.floor(Math.random() * 2)],
            status: ['active', 'inactive'][Math.floor(Math.random() * 2)],
            createdAt: new Date().toISOString(),
            avatar: 'https://i.pravatar.cc/150?img=10', 
        });
    }


    const headerColumns = [
  ...Object.keys(allUsers.value[0]).map((key) => {
    return { label: key.charAt(0).toUpperCase() + key.slice(1), key };
  }),
  { label: 'Action', key: 'action' } 
];


</script>


<template>
    <PageTable :header-columns="headerColumns" type="users" :data="allUsers"/>
</template>