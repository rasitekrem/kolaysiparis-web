<template>
<div class="modal fade show" role="dialog" tabindex="-1" style="display: block;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Yeni Personel</h4><button type="button" class="close" @click="$emit('close')"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label class="form-control-label"><b>E-Mail Adresi</b></label>
                                <input @blur="$v.personal.email.$touch()" v-model="personal.email" placeholder="E-Mail adresi giriniz" type="text" class="form-control" :class="{ 'is-invalid' : $v.personal.email.$error }">
                                <small class="form-text text-danger" v-if="!$v.personal.email.required && $v.personal.email.$error">Bu alan zorunludur..</small>
                                <small class="form-text text-danger" v-if="!$v.personal.email.email && $v.personal.email.$error">Lütfen geçerli bir eposta giriniz..</small>
                                <small class="form-text text-danger" v-if="!$v.personal.email.uniq && $v.personal.email.$error">Bu eposta kullanlıyor!</small>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label"><b>Parola</b></label>
                                    <input @blur="$v.personal.password.$touch()" v-model="personal.password" placeholder="Parolayı giriniz" type="text" class="form-control" :class="{ 'is-invalid' : $v.personal.password.$error }" >
                                    <small class="form-text text-danger" v-if="!$v.personal.password.minLength && $v.personal.password.$error">Lütfen en az {{ $v.personal.password.$params.minLength.min }} karakter giriniz</small>
                                    <small class="form-text text-danger" v-if="!$v.personal.password.maxLength && $v.personal.password.$error">Lütfen en fazla {{ $v.personal.password.$params.maxLength.max }} karakter giriniz </small>
                                </div>
                            </div>
                            </div>
                            <label class="form-control-label"><b>Yetkiler</b></label>
                            <div class="d-flex flex-column justify-content-center">
                                <button type="button" class="btn mb-2 btn-block" :class="checkClass(personal.authority.day)" @click="personal.authority.day = !personal.authority.day">Gün Başı / Sonu</button>
                                <button type="button" class="btn mb-2 btn-block" :class="checkClass(personal.authority.cash)" @click="personal.authority.cash = !personal.authority.cash">Kasa İşlemleri</button>
                                <button type="button" class="btn mb-2 btn-block" :class="checkClass(personal.authority.order)" @click="personal.authority.order = !personal.authority.order">Sipariş Durumu Değiştirme</button>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" :disabled="isDisabled" @click="save">Ekle</button>
                    </div>
                </div>
            </div>
        </div>
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
    data() {
        return {
            personal: {
                email: null,
                password: null,
                authority: {
                    day: false,
                    cash: false,
                    order: false
                }
            }
        }
    },
    methods: {
        checkClass(item) {
            if (item) {
                return 'btn-primary'
            } else {
                return 'btn-outline-primary'
            }
        },
        save() {
            this.$emit('save',this.personal)
        }
    },
    validations: {
            personal: {
                email: {
                    required,
                    email,
                    uniq : (value) => {
                        if (value) {
                            return axios.post('/api/checkuser',{ data: { email: value } })
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
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(16)
                },
            }
        },
        computed: {
            isDisabled() {
                if (!this.$v.$invalid && (this.personal.authority.day || this.personal.authority.cash || this.personal.authority.order)) {
                    return false
                } else {
                    return true
                }
            }
        },
}
</script>

<style scoped>

</style>
