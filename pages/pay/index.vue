<template>
<div class="container mr-0 mt-5 col-md-10" v-if="isAuthority">
    <h3 class="text-center my-3">{{ table }}</h3>
    <div class="d-flex justify-content-around">
        <Adition :order="order" :clean="isClean" @selectedProduct="selected($event)" @totalPrice="setTotalPrice($event)" @cleaned="clean(false)" :isPaid="isPaid" />
        <Calc :totalPrice="order.totalPrice" @clean="clean(true)" :price="`${totalPrice}`" @paid="paid($event)" @closeAddition="closeAddition" />
    </div>
</div>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-else>
    <NotAuth />
</div>
</template>

<script>
import Calc from '@/components/Pay/Calc'
import Adition from '@/components/Pay/Adition'
import NotAuth from '@/components/Admin/NotAuth'
export default {
    data() {
        return {
            isClean: false,
            totalPrice: 0,
            isPaid: false
        }
    },
    components: {
        Adition,
        Calc,
        NotAuth
    },
    beforeCreate() {
        if (!this.$route.params.table) {
            this.$router.push('/cashier')
        }
        this.table = this.$route.params.table
    },
    computed: {
        order() {
            let orders = this.$store.getters.getOrders
            let order = {
                isEmpty: true
            }
            if (orders) {
                orders.find(item => {
                    if (item.table === this.table) {
                        order = item
                        order.isEmpty = false
                    }
                });
            }
            return order
        },
        isAuthority() {
            return this.$store.getters.getAuthority.cash
        }
    },
    methods: {
        setTotalPrice(totalPrice) {
            this.totalPrice = totalPrice
        },
        clean(option) {
            this.isClean = option
        },
        paid(option) {
            this.isPaid = true
            this.$store.dispatch('paid', {
                table: this.order.table,
                products: this.order.products,
                totalPrice: this.order.totalPrice,
                payMethod: option
            })
        },
        closeAddition() {
            this.$store.dispatch('closeAddition', {
                table: this.table
            })
            this.$router.push('cashier')
        }
    },
}
</script>

<style scoped>

</style>
