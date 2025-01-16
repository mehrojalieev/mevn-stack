<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import VerifyRole from '../helpers/verify-role';

    const inputValue = ref<string>("")
    const route = useRoute()
    const token: string | null = localStorage.getItem("token") || null;

    const userData: any = token && VerifyRole(token)

   const showNavbar = computed(() =>
    !["auth", "dashboard"].some(path => route.path.includes(path))
);
   
</script>

<template>
    <nav v-if="showNavbar" class="container">
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
                <button v-if="inputValue.length > 0" class="pi pi-times clear__input-btn" @click="inputValue = ''"></button>
                <button class="search-btn">Search</button>
            </form>
        </div>
        <div class="nav-actions">
            <router-link active-class="link-active" to="/cart" class="action-link">
                <i class="pi pi-shopping-cart"></i>
                <p>Cart</p>
            </router-link>
            <router-link active-class="link-active" to="/like" class="action-link">
                <i class="pi pi-heart"></i>
                <p>Favorite</p>
            </router-link>
            <router-link  class="auth-link" v-if="userData" :to="`${userData?.role === 'user' ? 'dashboard/user' : 'dashboard/admin'}`">
                <i class="pi pi-user"></i>
                <p>Account</p>
            </router-link>
            <router-link v-else to="/auth/login" class="auth-link">
                <i class="pi pi-sign-in"></i>
                <p>Login</p>
            </router-link>
        </div>
    </nav>
</template>


<style lang="scss" scoped>
@mixin f-style($fSize, $fWeight, $color){
    font-size: $fSize;
    font-weight: $fWeight;
    color: $color;
}
    nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 1rem;
    }

    .nav-logo{
        max-width: 150px;
        width: 100%;
        height: 120px;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .nav__forms-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 1.3rem;
        width: 100%;
        .category-card{
            height: 42px;
            max-width: 140px;
            width: 100%;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 10px;
            border-radius: 6px;
            background-color: var(--primary-success);
            color: var(--light-color);
            i{
                font-size: 15px;
            }
            .category-text{
                @include f-style(15px, 400, var(--light-color) )
            }
        }
        .search-form{
            position: relative;
            display: flex;
            align-items: center;
            max-width: 500px;
            height: 43px;
            width: 100%;
            border-radius: 6px;
            overflow: hidden;
            border: 2px solid var(--primary-success);
            input{
                width: 100%;
                height: 100%;
                text-indent: 10px;
                @include f-style(15px, 500, var(--dark-color));
                outline: none;
                border: none;
            }
            .search-btn{
                height: 100%;
                padding: 0 .8rem;
                background-color: var(--primary-success);
                @include f-style(16px, 400, var(--light-color) )
            }
            .clear__input-btn{
                margin: 0 10px;
                background: transparent;
                @include f-style(16px, 500, var(--dark-color) )
            }
        }
    }


    .nav-actions{
        display: flex;
        align-items: center;
        column-gap: 2.3rem;
        .action-link{
            display: flex;
            flex-direction: column;
            row-gap: 5px;
            text-align  : center;
            &:hover{
                i,p{
                    color: var(--primary-success);
                }
            }
            i{
                font-size: 19px;
                color: var(--primary-success);
            }
            p{
                @include f-style(15px, 500,  var(--secondary-dark-color))
            }
        }
        .auth-link{
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 10px;
            background-color: var(--primary-success);
            padding: 9px 18px;
            border-radius: 6px;
            i{
            @include f-style(15px, 500, var(--light-color) );
            }
            p{
            @include f-style(15px, 500, var(--light-color) );
            letter-spacing: .7px;
            }
        }
    }

    .router-link-exact-active{
        background: transparent !important;
        i, p{
            color: var(--primary-success) !important;
            font-weight: 600;
        }
    }

</style>