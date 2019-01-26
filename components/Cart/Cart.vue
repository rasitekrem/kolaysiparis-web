<template>
    <div class="cart-container card shadow ">
        <div class="d-flex justify-content-between mb-2">
            <h3 class="text-center mr-auto ml-auto">Adisyon</h3>
            <button @click="isOpen = true" class="btn btn-outline-primary"><small><fa :icon="['fas', 'sticky-note']" /> Sipariş Notu</small></button>
        </div>
        
         <Alert v-if="cart.isEmpty"/>
         <CartItems v-else :products="cart.products" :table="table"/>
         <CartFooter @actionCart="$emit('actionCart',$event)" :table="table" :totalPrice="totalPrice"/>
         <NoteModal :isOpen="isOpen" @close="isOpen = false" :note="cart.note" :table="table"/>
    </div>
</template>

<script>
    import Alert from '@/components/Cart/Alert';
    import CartFooter from '@/components/Cart/CartFooter';
    import CartItems from '@/components/Cart/CartItems';
    import NoteModal from '@/components/Cart/NoteModal';
    export default {
        data() {
            return {
                isOpen: false
            }
        },
        components: {
            CartItems,
            Alert,
            CartFooter,
            NoteModal
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
        }
    }
</script>

<style scoped>

</style>