<template>
    <div class="container-fluid mr-0 mt-5 col-md-10 ">
        <h1 class="text-center">Siparişler</h1>
        <div class="row">
            <Order v-for="addition in additions" :key="addition.table" :addition="addition" @changeStatus="changeStatus($event)"/>
        </div>
    </div>
</template>

<script>
    import Order from '@/components/Order/order'
    export default {
        components: {
            Order
        },
        computed: {
            additions() {
                return this.$store.getters.getOrders
            }            
        },
        methods: {
            changeStatus(addition) {
                const additions = this.additions.filter(item => {
                    if(item.table === addition.table){
                        item.status = addition.status
                    }
                    return item
                })
                this.$store.dispatch('changeOrderStatus',{additions})
            }
        },
    }
</script>

<style scoped>
    
</style>