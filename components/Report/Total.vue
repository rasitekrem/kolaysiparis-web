<template>
    <div class="col-60 col-md-30">
        <div class="card">
            <div class="card-header">Genel İstatistik</div>
            <div class="card-body" >
                <div class="justify-content-between row">
                        <div class="col">
                            <div class="d-none d-sm-block text-center"><strong>{{ chart.totalCount }}</strong><br><span class="text-muted">Toplam Adisyon</span></div>
                            <div class="d-sm-none"><span class="text-muted">Açık</span><strong class="pull-right">0</strong></div>
                        </div>
                        <div class="col">
                            <div class="d-none d-sm-block text-center"><strong>{{ chart.openTime }}</strong><br><span class="text-muted">Açılış Saati</span></div>
                            <div class="d-sm-none"><span class="text-muted">Sipariş Bekleyen</span><strong class="pull-right">0</strong></div>
                        </div>
                        <div class="col">
                            <div class="d-none d-sm-block text-center"><strong>{{ chart.totalPrice }} ₺</strong><br><span class="text-muted">Toplam Gelir</span></div>
                            <div class="d-sm-none"><span class="text-muted">Sipariş Bekleyen</span><strong class="pull-right">0</strong></div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            aditions: {
                type: Array,
                default: []
            },
            openTime: String
        },
        computed: {
            chart() {
                let totalPrice = 0
                this.aditions.forEach(adition => {
                    totalPrice += adition.totalPrice
                });
                return {
                    totalCount: this.aditions.length,
                    totalPrice,
                    openTime: this.openTime
                }
            }
        },
    }
</script>

<style scoped>
    
</style>