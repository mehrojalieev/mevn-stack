<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './layout/Navbar.vue';
import {NNotificationProvider} from 'naive-ui'
</script>

<template>
    <n-notification-provider placement="top">
        <Navbar/>
        <RouterView/>
    </n-notification-provider>
</template>


