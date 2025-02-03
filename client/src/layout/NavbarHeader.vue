<script setup lang="ts">

</script>

<template>
    <section class="navbar-header">
        <div class="navbar__header-wrapper container">
                <div class="header__contact-contents">
                    <a class="contact-link" href="tel: 0700-000-000"> <i class="pi pi-phone"></i>  <small>0700-000-000</small></a>
                    <a class="contact-link" href="mailto: 0Z2dH@example.com"> <i class="pi pi-envelope"></i>  <small>0Z2dH@example.com</small> </a>
                </div>
                <div class="header__actions">

                        <select class="language-select">
                            <option value="uz">Oʻzbekcha</option>
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                        </select>
                </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@mixin f-style($fSize, $fWeight, $color){
    font-size: $fSize;
    font-weight: $fWeight;
    color: $color;
}
            .navbar-header{
                width: 100%;
                padding: 10px 0;
                background-color: var(--primary-success);
            }
            .navbar__header-wrapper{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .header__contact-contents{
                display: flex;
                align-items: center;
                column-gap: 1.6rem;
                .contact-link{
                    display: flex;
                    align-items: center;
                    column-gap: 5px !important;
                    small{
                        @include f-style(14px, 400, var(--secondary-light-color) );

                    }
                    i{
                        font-size: 12px;
                        color: var(--light-color) !important;
                    }
                }
            }
</style>