<script lang="ts" setup>
import { RouterLink } from 'vue-router';


const role: any = 'admin'

const adminMenu = [
    { path: "/dashboard/admin/products", icon: "pi pi-shop", label: "All Products" },
    { path: "/dashboard/admin/users", icon: "pi pi-users", label: "All Users" },
];

const userMenu = [
    { path: "/dashboard/user/my-orders", icon: "pi pi-shopping-cart", label: "My Orders" },
    { path: "/dashboard/user/profile", icon: "pi pi-user", label: "Profile" },
];

const menu = role === "admin" ? adminMenu : userMenu;


</script>


<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <RouterLink to="/dashboard/" class="sidebar-logo">Dashboard</RouterLink>
        </div>
        <div class="sidebar__lists-menu">
            <ul class="menu-list">
                <li v-for="item in menu" :key="item.path" class="list-item">
                    <RouterLink class="item-link" :to="item.path">
                        <i :class="item.icon"></i>
                        <span>{{ item.label }}</span>
                    </RouterLink>
                </li>

            </ul>
        </div>
    </aside>
</template>


<style scoped lang="scss">
@mixin f-style($font-size, $font-weight, $color) {
    font-size: $font-size;
    font-weight: $font-weight;
    color: $color;
}

.sidebar-header {
    padding: 1rem 0;

    .sidebar-logo {
        width: 100%;
        display: block;
        padding: 1rem;
        text-align: center;
        letter-spacing: .5px;
        @include f-style(1.6rem, 600, var(--primary-success));

    }
}

.sidebar {
    width: 100%;
    max-width: 220px;
    height: 100vh;
    background-color: var(--gray-dark);
    padding: 0 .8rem;
}

.sidebar__lists-menu {
    margin-top: 2rem;
    text-align: left;
}


.menu-list {
    display: flex;
    text-align: left;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    row-gap: 1rem;

    .list-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .item-link {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: .4rem;
        width: 100%;
        padding: .7rem 1.6rem .7rem .6rem;
        @include f-style(15px, 400, var(--light-color));
        letter-spacing: 1px;
        border-radius: 6px;

        &:hover {
            background-color: #343438;
        }

        i {
            @include f-style(1rem, 500, var(--primary-success));
        }
    }
}
</style>