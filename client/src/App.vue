<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './layout/Navbar.vue';
import {NNotificationProvider} from 'naive-ui'
import { useNetworkStatus } from './hooks/useNetworkStatus';

useNetworkStatus((status) => {
    const message = `Your network is now ${status}.`;
    console.log(message);
   
});

</script>

<template>
    <n-notification-provider placement="top">
        <n-dialog-provider>
        <n-message-provider>
            <Navbar/>
            <RouterView/>
        </n-message-provider>
        </n-dialog-provider>
    </n-notification-provider>
</template>


