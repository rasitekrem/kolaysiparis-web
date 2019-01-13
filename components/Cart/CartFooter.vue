<template>
    <div class="cart-footer mt-auto">
        
        <div class="total-price d-flex justify-content-between rounded-0" v-if="totalPrice > 0">
            <button class="btn btn-outline-danger" v-if="false">Ödeme Yap</button>
            <button class="btn btn-outline-success" v-else >Sipariş Ver</button>
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
        props: ['totalPrice']
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