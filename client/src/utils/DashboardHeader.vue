<script lang="ts" setup>
    const props = defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>


<template>
    <div class="dashboard-header">
        <h2 class="header-title">{{ props.title }}</h2>
    </div>
</template>


<style lang="scss" >

    @mixin f-style($size, $weight, $color){
        font-size: $size;
        font-weight: $weight;
        color: $color;
    }

    .dashboard-header{
        width: 100%;
        padding: .7rem;
        background-color: rgb(48, 47, 47);
        border-radius: 6px;
    }
    .header-title{
        @include f-style(1.4rem, 500, var(--light-color));
        text-transform: uppercase;
    }
</style>