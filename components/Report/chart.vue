<template>
    <div class="col-60 col-md-30">
        <div class="card">
            <div class="card-header">Masa durumu</div>
            <div class="card-body">
                <div class="justify-content-between row">
                        <div class="col">
                            <div class="d-none d-sm-block text-center"><strong>{{ chart.openCount }}</strong><br><span class="text-muted">Açık</span></div>
                            <div class="d-sm-none"><span class="text-muted">Açık</span><strong class="pull-right">0</strong></div>
                        </div>
                        <div class="col">
                            <div class="d-none d-sm-block text-center"><strong>{{ chart.waitOrderCount }}</strong><br><span class="text-muted">Sipariş Bekleyen</span></div>
                            <div class="d-sm-none"><span class="text-muted">Sipariş Bekleyen</span><strong class="pull-right">0</strong></div>
                        </div>
                        <div class="col">
                            <div class="d-none d-sm-block text-center"><strong>{{ chart.emptyCount }}</strong><br><span class="text-muted">Boş</span></div>
                            <div class="d-sm-none"><span class="text-muted">Boş</span><strong class="pull-right">25</strong></div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            chart: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    
</style>