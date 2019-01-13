<template>
    <div class="cart-container card shadow">
         <h3 class="text-center ">Adisyon</h3>
         <Alert v-if="cart.isEmpty"/>
         <CartItems v-else :products="cart.products" :table="table"/>
         <CartFooter :totalPrice="totalPrice"/>
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
        },
        props: {
            cart: {
                type: Object,
                required: true
            },
            table: {
                type: String,
                required: true
            }
        },
        computed: {
            totalPrice(){
                if(this.cart.isEmpty){
                    return 0
                } else {
                    return this.cart.totalPrice
                }
            }
        },
        created() {
            console.log("created")
            console.log(this.table)
        },
    }
</script>

<style scoped>

</style>