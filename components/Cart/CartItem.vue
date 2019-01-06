<template>
    <tr class="bg-custom-color">
                <td class="p-2">{{product.name}}</td>
                <td class="p-2 text-center w-25">
                    <div class="d-flex flex-row justify-content-center p-0 m-0">
                        <button class="btn btn-sm btn-outline-danger rounded-0">-</button>
                        <input disabled type="text" class="form-control form-control-sm w-25  text-center rounded-0 border-left-0 border-right-0" v-model="product.count">
                        <button class="btn btn-sm btn-outline-success rounded-0">+</button>
                    </div>
                </td>
                <td class="p-2 text-center">{{product.price}}₺</td>
                <td class="p-2 text-center">{{product.totalPrice}}₺</td>
                <td class="p-2 text-center"><button class="btn btn-sm btn-danger">Sil</button></td>
            </tr>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        created() {
            console.log("card item");
            
            console.log(this.product)
        },
    }
</script>

<style scoped>
.bg-custom-color {
            background-color: rgb(247, 238, 115) !important;
        }
</style>