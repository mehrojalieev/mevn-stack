<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './layout/Navbar.vue';
import {NNotificationProvider} from 'naive-ui'
import { useNetworkStatus } from './hooks/useNetworkStatus';
import NavbarHeader from './layout/NavbarHeader.vue';

useNetworkStatus((status) => {
    const message = `Your network is now ${status}.`;
    console.log(message);
   
});

</script>

<template>
    <n-notification-provider placement="top">
        <n-dialog-provider>
        <n-message-provider>
            <NavbarHeader/>
            <Navbar/>
            <RouterView/>
        </n-message-provider>
        </n-dialog-provider>
    </n-notification-provider>
</template>


