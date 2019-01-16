<template>
    <div class="cart-footer mt-auto">
        
        <div class="total-price d-flex justify-content-between rounded-0" v-if="totalPrice > 0">
            <button class="btn btn-outline-success" v-if="status === 'Sipariş Yok'" @click="order">Sipariş Ver</button>
            <button class="btn btn-outline-danger" v-else-if="status === 'Sipariş Teslim Edildi'" @click="order">Ödeme Yap</button>
             <button class="btn btn-outline-success" v-else @click="order">Güncelle</button>
            <div class="d-flex justify-content-end">
                <strong style="font-size: 18px;">Toplam Tutar : </strong>
                <span class="badge total-price-container text-dark rounded-0">{{totalPrice}}₺</span>
            </div>
                
            </div>
    </div>
</template>

<script>
    export default {
        middleware: ['ordercheck'],
        props: ['totalPrice','table'],
        methods: {
            order() {
                this.$emit('actionCart','takingOrder')
            },
            update() {

            },
            pay() {

            }
        },
        computed: {
             status() {
                let orders = this.$store.getters.getOrders
                if (orders) {
                    let order = orders.filter((item) => {
                    if(item.table === this.table) {
                        return item
                    }
                    })
                if (order.length > 0) {
                    return order[0].status
                } else {
                    return 'Sipariş Yok'
                }
                } else {
                    return 'Sipariş Yok'
                }
            }
        }
    }
</script>

<style scoped>
        .total-price-container{
            color: #D15385 !important;
            font-size: 20px;
        }
        .bg-custom-color {
            background-color: #FAF3DF !important;
        }
</style>