<script setup lang="ts">

</script>

<template>
    <section class="auth-wrapper">
        <div class="auth__form-card">
            <RouterView/>
        </div>
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
        background: url('https://avatars.mds.yandex.net/i?id=be3881bfd0e8e0562c840b9fa87e5c29_l-5350948-images-thumbs&ref=rim&n=13&w=1920&h=1080') no-repeat center center / cover;

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

    .submit-btn{
        margin-top: 1.5rem !important;
        width: 100%;
        border-radius: 6px;
        padding: 7px 0;
        @include f-style(15px, 500, var(--light-color));
        background-color: var(--primary-success);
        border: none;
        cursor: pointer;
        &:hover{
            opacity: .8;
        }
    }
</style>