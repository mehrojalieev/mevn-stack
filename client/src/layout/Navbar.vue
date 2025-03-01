<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../store/store';
import ApiInstance from '../services/api';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '../store/modules/user';
import VerifyRole from '../helpers/verify-role';

const { t } = useI18n()

const userStore = useUserStore()

const inputValue = ref<string>("")
const store = useStore()
const route = useRoute()
const token: any = localStorage.getItem("token");
const allCategories = ref<string[]>([])
const isLoading = ref<boolean>(false)

const userData: any = token ? VerifyRole(token) : null

const showNavbar = computed(() =>
    !["auth", "dashboard"].some(path => route.path.includes(path))
);


const renderCategories = async () => {
    isLoading.value = true;
    try {
        const res = await ApiInstance.get('/product/category/all')
        allCategories.value = res.data
    }
    catch (error) {
        console.log(error);
    }
    finally {
        isLoading.value = false;
    }
}

const langOptions = [
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
    { label: 'Oʻzbekcha', value: 'uz' }
]

onMounted(() => {
    renderCategories()
})

const language = ref(userStore.getLanguage())

const changeLang = (lang: string) => {
    userStore.setLanguage(lang)
}

</script>

<template>
    <nav v-if="showNavbar" class="container">
        {{ t('title') }}

        <n-select v-model:value="language" :options="langOptions" @update="changeLang" />
        <router-link to="/" class="nav-logo">
            <img src="https://i.pinimg.com/736x/e6/98/2b/e6982b10ffccfe16a6e3fc9b6f7adadc.jpg" alt="">
        </router-link>
        <div class="nav__forms-wrapper">
            <div class="category-card">
                <i class="pi pi-bars"></i>
                <p class="category-text">Categories</p>
            </div>
            <form class="search-form">
                <input v-model="inputValue" type="text" placeholder="Search...">
                <button v-if="inputValue.length > 0" class="pi pi-times clear__input-btn"
                    @click="inputValue = ''"></button>
                <button class="search-btn">Search</button>
            </form>
        </div>
        <div class="nav-actions">
            <router-link active-class="link-active" to="/cart" class="action-link">
                <strong class="cart__item-counts">{{ store.$state.cart_data.length > 0 ? store.$state.cart_data.length :
                    0 }}</strong>
                <i class="pi pi-shopping-cart"></i>
                <p>Cart</p>
            </router-link>
            <router-link active-class="link-active" to="/like" class="action-link">
                <i class="pi pi-heart"></i>
                <p>Favorite</p>
            </router-link>
            <router-link class="auth-link" v-if="userData"
                :to="`${userData?.role === 'user' ? 'dashboard/user' : 'dashboard/admin'}`">
                <i class="pi pi-user"></i>
                <p>Account</p>
            </router-link>
            <router-link v-else to="/auth/login" class="auth-link">
                <i class="pi pi-sign-in"></i>
                <p>Login</p>
            </router-link>
        </div>
    </nav>
    <div class="navbar-categories container">
        <router-link class="category-link" v-for="(category, index) in allCategories"
            :to="`category/${category.toLowerCase()}`" :key="index">{{ category }}</router-link>
    </div>
</template>


<style lang="scss" scoped>
@mixin f-style($fSize, $fWeight, $color) {
    font-size: $fSize;
    font-weight: $fWeight;
    color: $color;
}

nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;
}

.nav-logo {
    max-width: 150px;
    width: 100%;
    height: 120px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.nav__forms-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1.3rem;
    width: 100%;

    .category-card {
        height: 40px;
        max-width: 140px;
        width: 100%;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        border-radius: 6px;
        background-color: var(--primary-success);
        color: var(--light-color);

        i {
            font-size: 15px;
        }

        .category-text {
            @include f-style(15px, 400, var(--light-color))
        }
    }

    .search-form {
        position: relative;
        display: flex;
        align-items: center;
        max-width: 500px;
        height: 43px;
        width: 100%;
        border-radius: 6px;
        overflow: hidden;
        border: 2px solid var(--primary-success);

        input {
            width: 100%;
            height: 100%;
            text-indent: 10px;
            @include f-style(15px, 500, var(--dark-color));
            outline: none;
            border: none;
        }

        .search-btn {
            height: 100%;
            padding: 0 .7rem;
            background-color: var(--primary-success);
            @include f-style(15px, 400, var(--light-color))
        }

        .clear__input-btn {
            margin: 0 10px;
            background: transparent;
            @include f-style(16px, 500, var(--dark-color))
        }
    }
}


.nav-actions {
    display: flex;
    align-items: center;
    column-gap: 2.3rem;

    .action-link {
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        text-align: center;

        .cart__item-counts {
            position: absolute;
            background-color: var(--danger-color);
            border-radius: 50%;
            display: flex !important;
            align-items: center !important;
            justify-content: center;
            padding: 1px 8px 0;
            right: -5px;
            top: -12px;
            @include f-style(12px, 500, var(--light-color))
        }

        &:hover {

            i,
            p {
                color: var(--primary-success);
            }
        }

        i {
            font-size: 19px;
            color: var(--primary-success);
        }

        p {
            @include f-style(15px, 500, var(--secondary-dark-color))
        }
    }

    .auth-link {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        background-color: var(--primary-success);
        padding: 8px 16px;
        border-radius: 6px;

        &:hover {
            opacity: 0.8;
        }

        i {
            @include f-style(15px, 500, var(--light-color));
        }

        p {
            @include f-style(15px, 500, var(--light-color));
            letter-spacing: .7px;
        }
    }
}

.router-link-exact-active {
    background: transparent !important;

    i,
    p {
        color: var(--primary-success) !important;
        font-weight: 600;
    }
}

.navbar-categories {
    width: 100%;
    align-items: center;
    column-gap: 10px;

    .category-link {
        @include f-style(16px, 500, var(--secondary-dark-color))
    }
}
</style>