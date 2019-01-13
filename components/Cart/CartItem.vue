<template>
    <tr class="bg-custom-color">
                <td class="p-2">{{product.name}}</td>
                <td class="p-2 text-center w-25">
                    <div class="d-flex flex-row justify-content-center p-0 m-0">
                        <button @click="changeCount(false)" class="btn btn-sm btn-outline-danger rounded-0">-</button>
                        <input disabled type="text" class="form-control form-control-sm w-25  text-center rounded-0 border-left-0 border-right-0" v-model="product.count">
                        <button @click="changeCount(true)"  class="btn btn-sm btn-outline-success rounded-0">+</button>
                    </div>
                </td>
                <td class="p-2 text-center">{{product.price}}₺</td>
                <td class="p-2 text-center">{{product.totalPrice}}₺</td>
                <td class="p-2 text-center"><button class="btn btn-sm btn-danger" @click="removeProduct">Sil</button></td>
            </tr>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            },
            table: {
                type: String,
                required: true
            }
        },
        methods: {
            changeCount(status) {
                if (!status) {
                    if (this.product.count > 1) {
                        this.product.count--
                    }
                } else {
                    this.product.count++
                }
                this.$store.dispatch("changeCount",{ product: this.product, table: this.table })
            },
            removeProduct() {
                this.$store.dispatch("removeProduct",{ product: this.product, table: this.table })
            }

},
    }
</script>

<style scoped>
.bg-custom-color {
            background-color: rgb(247, 238, 115) !important;
        }
</style>