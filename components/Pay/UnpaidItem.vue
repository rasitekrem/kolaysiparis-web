<template>
    <td class="d-flex justify-content-between" @click="select" :class="selectClass">
        <span>
                {{product.name}} <span class="font-weight-bold" ><span> {{product_count}}</span></span>
        </span>
        <span>{{product.totalPrice}} ₺</span>
    </td>
</template>

<script>
    export default {
        data() {
            return {
                selected: 0,
                selectProduct: {}
            }
        },
        props: {
            product: {
                type: Object,
                required: true
            },
            clean: Boolean
        },
         watch: {
            clean: {
                handler(val) {
                   if(val) {
                    this.selected = 0
                    this.selectProduct = {}
                    this.$emit('cleaned')
                }
                },
                deep: true,
            },
        },
        computed: {
            product_count() {
                if (this.selected > 0) {
                    return `(${this.selected}/${this.product.count})`
                } else {
                    return `x ${this.product.count}`
                }
            },
            selectClass() {
                if (this.selected > 0) {
                    return 'bg-primary'
                } else {
                    return ''
                }
            }
        },
        methods: {
            select() {
                if(this.product.count > this.selected) {
                    this.selected++
                    this.selectProduct = {...this.product}
                    this.selectProduct.count = this.selected
                    this.selectProduct.totalPrice = (this.selectProduct.count * this.selectProduct.price)
                    console.log(this.selectProduct)
                    this.$emit('selected',this.selectProduct)
                }
            },
        },
    }
</script>

<style scoped>
    
</style>