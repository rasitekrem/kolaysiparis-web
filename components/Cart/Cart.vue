<template>
    <div class="cart-container card shadow">
         <h3 class="text-center ">Adisyon</h3>
         <Alert />
         <CartItems />
         <CartFooter />
    </div>
</template>

<script>
    import Alert from '@/components/Cart/Alert'
    import CartFooter from '@/components/Cart/CartFooter';
    import CartItems from '@/components/Cart/CartItems';
    export default {
        components: {
            CartItems,
            Alert,
            CartFooter
        }
    }
</script>

<style scoped>

</style>