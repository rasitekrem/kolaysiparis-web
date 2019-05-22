<template>
<tr>
    <td class="py-0 px-0" colspan="3" style="border-top-width: 0px;">
        <div style="overflow: hidden; max-height: none;">
            <div>
                <div class="pt-2 pb-3 px-3 bg-light">
                    <div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class=" form-control-label"><b>Mail</b></label>
                                    <input placeholder="Mail" type="mail" class="form-control"  @blur="$v.personalDetail.username.$touch()" v-model="personalDetail.username" :class="{ 'is-invalid' : $v.personalDetail.username.$error }" autofocus>
                                    <small class="form-text text-danger" v-if="!$v.personalDetail.username.required && $v.personal.username.$error">Bu alan zorunludur..</small>
                                    <small class="form-text text-danger" v-if="!$v.personalDetail.username.email && $v.personalDetail.username.$error">Lütfen geçerli bir eposta giriniz..</small>
                                    <small class="form-text text-danger" v-if="!$v.personalDetail.username.uniq && $v.personalDetail.username.$error">Bu eposta kullanlıyor!</small>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class=" form-control-label"><b>Parola</b></label>
                                    <input placeholder="Parola" type="text" class="form-control" @blur="$v.personalDetail.password.$touch()" v-model="personalDetail.password" :class="{ 'is-invalid' : $v.personalDetail.password.$error }">
                                    <small class="form-text text-danger" v-if="!$v.personalDetail.password.minLength && $v.personalDetail.password.$error">Lütfen en az {{ $v.personalDetail.password.$params.minLength.min }} karakter giriniz</small>
                                    <small class="form-text text-danger" v-if="!$v.personalDetail.password.maxLength && $v.personalDetail.password.$error">Lütfen en fazla {{ $v.personalDetail.password.$params.maxLength.max }} karakter giriniz </small>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4 text-right">
                            <button type="button" class="mr-2 btn btn-success" @click="save" :disabled="isDisabled">Kaydet</button>
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
import {
    required,
    email,
    minLength,
    maxLength
} from 'vuelidate/lib/validators';
import axios from 'axios';
export default {
    props: {
        personal: Object
    },
    data() {
        return {
            personalDetail: { ...this.personal,
                password: ''
            }
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
            this.$store.dispatch('updatePersonal', this.personalDetail)
        },
        remove() {
            this.$store.dispatch('removePersonal', this.personalDetail._id)
        }
    },
    computed: {
        isDisabled() {
            if (!this.$v.$invalid && (this.personalDetail.authority.day || this.personalDetail.authority.cash || this.personalDetail.authority.order)) {
                return false
            } else {
                return true
            }
        }
    },
    validations: {
        personalDetail: {
            username: {
                required,
                email,
                uniq(value) {
                    if (value === this.personalDetail.username) {
                        return true
                    } else {
                        if (value) {
                            return axios.post('/checkuser', {
                                    data: {
                                        email: value
                                    }
                                })
                                .then(response => {
                                    if (response.data.status === "ok") {
                                        return true
                                    } else {
                                        return false
                                    }
                                })
                        } else {
                            return false
                        }
                    }
                }
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(16)
            },
        }
    }
}
</script>

<style scoped>

</style>
