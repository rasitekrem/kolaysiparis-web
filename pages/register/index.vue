<template>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-md-4 offset-4 card card-primary p-3 border border-success">
                <h3 class="text-success text-center mb-3 mt-3">Kolay Sipariş | Kayıt</h3>
                <hr>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>Restoran Adı</label>
                        <input @blur="$v.user.restaurantName.$touch()" v-model="user.restaurantName" type="text" class="form-control" :class="{ 'is-invalid' : $v.user.restaurantName.$error }" placeholder="Restoran Adınız...">
                        <small class="form-text text-danger" v-if="!$v.user.restaurantName.required && $v.user.restaurantName.$error">Bu alan zorunludur..</small>
                    </div>
                    <div class="form-group">
                        <label>E-posta Adresiniz</label>
                        <input @blur="$v.user.email.$touch()" v-model="user.email" type="email" class="form-control" :class="{ 'is-invalid' : $v.user.email.$error }" placeholder="E-posta adresinizi giriniz">
                        <small class="form-text text-danger" v-if="!$v.user.email.required && $v.user.email.$error">Bu alan zorunludur..</small>
                        <small class="form-text text-danger" v-if="!$v.user.email.email && $v.user.email.$error">Lütfen geçerli bir eposta giriniz..</small>
                        <small class="form-text text-danger" v-if="!$v.user.email.uniq && $v.user.email.$error">Bu eposta kullanlıyor!</small>
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input @blur="$v.user.password.$touch()" v-model="user.password" type="password" class="form-control" :class="{ 'is-invalid' : $v.user.password.$error }" placeholder="Şifreniz...">
                        <small class="form-text text-danger" v-if="!$v.user.password.required && $v.user.password.$error">Bu alan zorunludur..</small>
                        <small class="form-text text-danger" v-if="!$v.user.password.minLength && $v.user.password.$error">Lütfen en az {{ $v.user.password.$params.minLength.min }} karakter giriniz</small>
                        <small class="form-text text-danger" v-if="!$v.user.password.maxLength && $v.user.password.$error">Lütfen en fazla {{ $v.user.password.$params.maxLength.max }} karakter giriniz </small>
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input v-model="$v.user.repassword.$model" type="password" class="form-control" placeholder="Yeniden Şifreniz..." :class="{ 'is-invalid' : $v.user.repassword.$error }">
                        <small class="form-text text-danger" v-if="!$v.user.repassword.required && $v.user.repassword.$error">Bu alan zorunludur..</small>
                        <small class="form-text text-danger" v-if="!$v.user.repassword.minLength && $v.user.repassword.$error">Lütfen en az {{ $v.user.repassword.$params.minLength.min }} karakter giriniz</small>
                        <small class="form-text text-danger" v-if="!$v.user.repassword.maxLength && $v.user.repassword.$error">Lütfen en fazla {{ $v.user.repassword.$params.maxLength.max }} karakter giriniz </small>
                        <small class="form-text text-danger" v-if="!$v.user.repassword.sameAs && $v.user.repassword.$error">Girdiğiniz parolalar uyuşmuyor! </small>
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit" class="btn btn-block mb-2 btn-success" :disabled="$v.$invalid">
                                    Kayıt Ol
                                </button>
                        <a href="#" @click.prevent="$router.push('/login')" class="text-secondary">
                                    Üyeliğim var
                                </a>
                    </div>
                    <div class="alert alert-dismissible alert-danger col-sm-8 offset-2" v-if="errorMessage">
                        <button type="button" class="close" @click.prevent="errorMessage = null" data-dismiss="alert">&times;</button>
                        <small class="form-text">{{ errorMessage }}</small>
                    </div>
                </form>
            </div>
        </div>
        <div>
            {{ $v.user.email }}
        </div>
    </div>
</template>

<script>
    import {
        required,
        email,
        minLength,
        maxLength,
        sameAs
    } from 'vuelidate/lib/validators';
    import axios from 'axios';
    export default {
        layout: 'auth',
        data() {
            return {
                user: {
                    email: null,
                    password: null,
                    repassword: null,
                    restaurantName: null
                },
                errorMessage: null
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch("register", {
                    user: this.user
                }).then(response => {
                    console.log(response)
                    if (response.data.status) {
                        this.$router.push("/")
                    } else {
                        this.errorMessage = response.data.message
                    }
                })
            }
        },
        validations: {
            user: {
                email: {
                    required,
                    email,
                    uniq : (value) => {
                        if (value) {
                            console.log(value);
                            
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
                restaurantName: {
                    required
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(16)
                },
                repassword: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(16),
                    sameAs: sameAs('password')
                }
    
            }
        }
    }
</script>

<style scoped>
    
</style>