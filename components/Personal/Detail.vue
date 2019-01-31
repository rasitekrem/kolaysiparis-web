<template>
<tr>
    <td class="py-0 px-0" colspan="3" style="border-top-width: 0px;">
        <div style="overflow: hidden; max-height: none;">
            <div>
                <div class="pt-2 pb-3 px-3 bg-light">
                    <div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group"><label class=" form-control-label"><b>Mail</b></label><input placeholder="Mail" type="mail" class="form-control" v-model="personalDetail.username"></div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group"><label class=" form-control-label"><b>Parola</b></label><input placeholder="Parola" type="text" class="form-control" v-model="personalDetail.password"></div>
                                    </div>
                                </div>
                                <div class="mb-4 text-right">
                                    <button type="button" class="mr-2 btn btn-success" @click="save">Kaydet</button>
                                    <button type="button" class="btn btn-danger" @click="remove">Sil</button>
                                    </div>
                                <label class=" form-control-label"><b>Yetkiler</b></label>
                                <div>
                                    <div>
                                        <button @click="personalDetail.authority.cash = !personalDetail.authority.cash " type="button" class="mr-3 btn" :class="buttonClass(personalDetail.authority.cash)">
                                            <fa :icon="isAuthority(personalDetail.authority.cash)" class="font-weight-bold" style="font-size: 1.2em;"></fa>
                                            Kasa
                                        </button>
                                    </div>
                                    <div class="pt-3">
                                        <button @click="personalDetail.authority.order = !personalDetail.authority.order " type="button" class="mr-3 mb-2 btn" :class="buttonClass(personalDetail.authority.order)">
                                            <fa :icon="isAuthority(personalDetail.authority.order)" class="font-weight-bold mx-2" style="font-size: 1.2em;"></fa> 
                                            Sipariş durumu değiştirme
                                        </button>
                                        <button @click="personalDetail.authority.day = !personalDetail.authority.day " type="button" class="mr-3 mb-2 btn" :class="buttonClass(personalDetail.authority.day)">
                                            <fa :icon="isAuthority(personalDetail.authority.day)" class="font-weight-bold mx-2" style="font-size: 1.2em;"></fa>
                                            Gün Başı / Sonu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </td>
</tr>
</template>

<script>
export default {
    props: {
        personal: Object
    },
    data() {
        return {
            personalDetail: {...this.personal, password: ''}
        }
    },
    methods: {
        isAuthority(authority) {
            if (authority) {
                return ['fas', 'lock-open']
            } else {
                return ['fas', 'lock']
            }            
        },
        buttonClass(authority) {
            if (authority) {
                return 'btn-outline-primary'
            } else {
                return 'btn-outline-danger'
            }
        },
        save() {
            this.$store.dispatch('updatePersonal',this.personalDetail)
        },
        remove() {
            
        }
    },
}
</script>

<style scoped>

</style>
