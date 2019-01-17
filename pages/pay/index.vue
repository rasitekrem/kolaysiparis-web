<template>
    <div class="container mr-0 mt-5 col-md-10">
        <h3 class="text-center my-3">{{ table }}</h3>
        <div class="d-flex justify-content-around">
            <Adition :order="order"/>
            <Calc />
        </div>
    </div>
</template>

<script>
    import Calc from '@/components/Pay/Calc'
    import Adition from '@/components/Pay/Adition'
    export default {
        components: {
            Adition,
            Calc
        },
        beforeCreate() {
            if(!this.$route.params.table) {
                this.$router.push('/cashier')
            }
            this.table = this.$route.params.table
        },
        computed: {
            order() {
                let orders = this.$store.getters.getOrders
                let order = { isEmpty : true }
                if (orders) {
                    orders.find(item => {
                    if (item.table === this.table) {
                        order = item
                        order.isEmpty = false
                    }
                });
                }
                return order
            }
        },
    }
</script>

<style scoped>
    
</style>