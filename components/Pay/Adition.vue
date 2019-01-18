<template>
    <div class="card shadow mt-2 px-0 py-0 col-sm-6">
        <div class="card-header bg-light text-center">Adisyon</div>
        <div class="pt-0 pr-0 pl-0 pb-0 card-body">
            <p class="text-muted text-center ml-3 mr-3 mt-3" v-if="order.isEmpty">Bu masada adisyon yok</p>
            <div v-else>
                <Unpaid :unpaid="unpaid" @selected="selected($event)" :clean="clean" @cleaned="$emit('cleaned')" />
                <Paid v-if="addition.paid.length > 0" :paid="paid" />
            </div>
        </div>
        <PayFooter :paidPrice="paidPrice" :unpaidPrice="unpaidPrice" :totalPrice="totalPrice" />
    </div>
</template>

<script>
    import Paid from '@/components/Pay/Paid'
    import Unpaid from '@/components/Pay/Unpaid';
    import PayFooter from '@/components/Pay/PayFooter';
    export default {
        data() {
            return {
                addition: {
                    unpaid: [],
                    paid: [],
                    unpaidPrice: 0,
                    paidPrice: 0
                },
                selectedProducts: []
            }
        },
        props: {
            order: {
                type: Object,
                required: true
            },
            clean: Boolean,
            isPaid: Boolean
        },
        watch: {
            clean: {
                handler(val) {
                   if (val) {
                    this.selectedProducts = []
                    }
                },
                deep: true,
            },
            isPaid: {
                handler(val) {
                   if (val) {
                     this.addition.paid = this.addition.unpaid
                     this.addition.unpaid = []
                     this.addition.paidPrice = this.addition.unpaidPrice
                     this.addition.unpaidPrice = 0
                     this.selectedProducts = []
                    }
                },
                deep: true,
            },
        },
        components: {
            Unpaid,
            Paid,
            PayFooter
        },
        created() {
            if (!this.order.isEmpty) {
                this.addition.unpaid = this.order.products
                this.addition.unpaidPrice = this.totalPrice
            }
        },
        computed: {
            unpaid() {
                if (this.order.isEmpty) {
                    return []
                } else {
                    return this.addition.unpaid
                }
            },
            paid() {
                if (this.order.isEmpty) {
                    return []
                } else {
                    return this.addition.paid
                }
            },
            unpaidPrice() {
                if (this.order.isEmpty) {
                    return 0
                } else {
                    return this.addition.unpaidPrice
                }
            },
            paidPrice() {
                if (this.order.isEmpty) {
                    return 0
                } else {
                    return this.addition.paidPrice
                }
            },
            totalPrice() {
                if (this.order.isEmpty) {
                    return 0
                } else {
                    return this.order.totalPrice
                }
            }
        },
        methods: {
            selected(product) {
    
                let selectedIndex = this.selectedProducts.findIndex(item => {
                    if (item.key == product.key) {
                        return true
                    }
                })
                if (selectedIndex > -1) {
                    this.selectedProducts[selectedIndex].count = product.count
                    this.selectedProducts[selectedIndex].totalPrice = product.totalPrice
                } else {
                    this.selectedProducts.push(product)
                }
                let totalPrice = 0
                this.selectedProducts.forEach((item) => {
                    totalPrice += (item.totalPrice)
                })
                this.$emit('totalPrice', totalPrice)
            }
        },
    }
</script>

<style scoped>
    
</style>