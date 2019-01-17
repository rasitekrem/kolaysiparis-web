<template>
    <div class="card-footer">
        <p class="lead mt-0 mb-1 d-flex justify-content-between">Toplam<strong class="pull-right"><span class="font-weight-bold">{{totalPrice}} ₺</span></strong></p>
        <p class="mb-1 d-flex justify-content-between">Ödeme<strong class="pull-right"><span class="font-weight-bold">{{paidPrice}} ₺</span></strong></p>
        <p class="lead mb-2 d-flex justify-content-between">
            Kalan
            <strong class="pull-right" style="background-color: transparent; transition: background-color 300ms linear 0s;">
                        <span class="font-weight-bold">{{unpaidPrice}} ₺</span>
                    </strong>
        </p>
    </div>
</template>

<script>
    export default {
        props: ['totalPrice','unpaidPrice','paidPrice']
    }
</script>

<style scoped>
    
</style>