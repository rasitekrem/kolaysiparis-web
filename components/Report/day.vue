<template>
        <div class="card-body">
            <div class="row">
                <div class="col col-sm-25">
                    <h4 class="mb-0 card-title">Gün özeti</h4>
                    <div class="small text-muted">Açılış: <span>10 Kas 2018 16:23</span></div>
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
                                    <h4 class="mb-0"><span>769.00 TL</span></h4>
                                    <p>Masalarda açık adisyon</p>
                                    <div class="justify-content-end">
                                        <div class="text-right col-60">Açık: 5 adisyon</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-white bg-success card">
                            <div class="card-body">
                                <div>
                                    <h4 class="mb-0"><span>34.00 TL</span></h4>
                                    <p>Toplam ödeme</p>
                                    <div style="display: flex;">
                                        <div class="text-right mr-1" style="flex-grow: 1;">Nakit:<br>Kredi kartı:<br>Diğer:</div>
                                        <div class="text-right"><span>34.00 TL</span><br><span>0.00 TL</span><br><span>0.00 TL</span></div>
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
        props: {
            showDetail:{
                type: Boolean,
                required: false,
                default: false
            }
        }
    }
</script>

<style scoped>

</style>