<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Sidebar from '../../layout/Sidebar.vue';
import DashboardNavbar from '../../components/admin-table/DashboardNavbar.vue';


</script>

<template>
    <div class="admin-dashboard">
        <Sidebar/>
        <div class="dashboard__main-content">
                <DashboardNavbar/>
            <RouterView/>
        </div>
    </div>
</template>



<style lang="scss" scoped>
    .admin-dashboard{
        display: flex;
        align-items: flex-start;
        width: 100%;
        column-gap: 1rem;
        height: 100vh;
        background-color: var(--dark-color);
    }
    .dashboard__main-content{
        width: 100%;
        // padding: 1rem;
        height: 100%;
        overflow-y: auto;
    }
</style>