<template>
        <div class="card-body">
            <div class="row">
                <div class="col col-sm-25">
                    <h4 class="mb-0 card-title">Gün özeti</h4>
                 <div class="small text-muted">Açılış: <span>{{dayDetail.openTime }}</span></div>
                </div>
                <nuxt-link to="/day-report" class="d-none d-sm-inline-block col col-sm-35" tag="div" v-if="showDetail">
                    <a class="btn btn-primary float-right" >Ayrıntılar <i class="icon-arrow-right"></i></a>
                </nuxt-link>
            </div>
            <hr>
            <div style="">
                <div class="row d-flex justify-content-between">
                    <div class="col-sm-6">
                        <div class="text-white bg-danger card">
                            <div class="card-body">
                                <div>
                                    <h4 class="mb-0"><span>{{dayDetail.adition.additionsPrice}} ₺</span></h4>
                                    <p>Masalarda açık adisyon</p>
                                    <div class="justify-content-end">
                                        <div class="text-right col-60">Açık: {{dayDetail.adition.waitOrderCount+dayDetail.adition.notWaitCount}} adisyon</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-white bg-success card">
                            <div class="card-body">
                                <div>
                                    <h4 class="mb-0"><span>{{ dayDetail.history.historyPrice }} ₺</span></h4>
                                    <p>Toplam ödeme</p>
                                    <div style="display: flex;">
                                        <div class="text-right mr-1" style="flex-grow: 1;">Nakit:<br>Kredi kartı:<br>Diğer:</div>
                                        <div class="text-right"><span>{{ dayDetail.history.cashPrice }} ₺</span><br><span>{{ dayDetail.history.creditPrice }} ₺</span><br><span>{{ dayDetail.history.otherPrice }} ₺</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        beforeCreate() {
            this.$store.dispatch('checkHistory')
        },
        props: {
            showDetail:{
                type: Boolean,
                required: false,
                default: false
            },
            dayDetail: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>