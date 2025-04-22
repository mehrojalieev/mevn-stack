<script setup lang="ts">
import { RouterView } from 'vue-router';

const authToken = localStorage.getItem('token');

if(authToken){
    window.location.href = '/dashboard';
}

</script>

<template>
    <section class="auth-wrapper">
        <form class="auth__form-card">
            <RouterView/>
        </form>
    </section>
</template>


<style lang="scss">
@mixin f-style($size, $weight, $color){
    font-size: $size;
    font-weight: $weight;
    color: $color;
}
    .auth-wrapper{
        display: grid;
        place-items: center;
        width: 100vw;
        height: 100vh;
        background: url('../../assets/images/AuthBg.png') no-repeat center center / cover;

    }

    .auth__form-card{
        width: 100%;
        max-width: 480px;
        height: fit-content;
        padding: 3.5rem 3rem;
        border-radius: 6px;
        background-color: var(--light-color);
    }
    .auth-title{
        @include f-style(20px, 600, var(--dark-color));
        margin-bottom: 7px;
    }
    .auth-subtitle{
        @include f-style(14px, 500, #677283);
        margin-bottom: 1.4rem;
    }
    .input-item{
        display: flex;
        align-items: center;
        column-gap: .8rem;
        padding:  0 .7rem;
        background-color: transparent;
        border-radius: 6px;
        margin: 1rem 0;
        width: 100%;
        height: 38px;
        border: 1px solid var(--secondary-color);
        i{
            @include f-style(17px, 400, var(--secondary-color));
        }
        input{
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            @include f-style(15px, 400, var(--dark-color));
        }
        
    }
    .password-item{
        position:relative;
        .password-input{
            width: 80%;
        }
        #password-toggle{
            cursor: pointer;
            position: absolute;
            right: 4%;
            top: 28%;
        }
    }

    .register-link{
        margin-top: 21px;
        display: block;
        width: 100%;
        @include f-style(15px, 500, rgba(0, 0, 0, 0.795));
        .link{
            color: var(--primary-success);
            &:hover{
                opacity: .8;
            }
        }
    }

</style>