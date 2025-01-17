<script lang="ts">

</script>

<template>
    <div class="empty__cart-wrapper">
        <img src="https://thumbs.dreamstime.com/b/icon-empty-cart-empty-empty-cart-330881055.jpg">
        <h5>Your cart is empty</h5>
    </div>
</template>

<style lang="scss" scoped>
    @mixin f-style($fSize, $fWeight, $color){
        font-size: $fSize;
        font-weight: $fWeight;
        color: $color;
}
        .empty__cart-wrapper{
            margin-top: 3.5rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            img{
                width: 100%;
                max-width: 460px;
                height: 280px;
                object-fit: contain;
            }
            h5{
                @include f-style(30px, 500, var(--secondary-dark-color));
                letter-spacing: .5px;
            }
        }
</style>