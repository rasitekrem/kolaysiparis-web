<template>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-md-4 offset-4 card card-primary p-3 border border-primary">
                <h3 class="text-primary text-center mb-3 mt-3">Kolay Sipariş | Giriş</h3>
                <hr>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>E-posta Adresiniz</label>
                        <input @blur="$v.user.email.$touch()" v-model="user.email" :class="{ 'is-invalid' : $v.user.email.$error }" type="email" class="form-control" placeholder="E-posta adresinizi giriniz">
                        <small class="form-text text-danger" v-if="!$v.user.email.required && $v.user.email.$error">Bu alan zorunludur..</small>
                        <small class="form-text text-danger" v-if="!$v.user.email.email && $v.user.email.$error">Lütfen geçerli bir eposta giriniz..</small>
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input @blur="$v.user.password.$touch()" v-model="user.password" type="password" class="form-control" placeholder="Şifreniz...">
                        <small class="form-text text-danger" v-if="!$v.user.password.required && $v.user.password.$error">Bu alan zorunludur..</small>
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit" class="btn btn-block mb-2 btn-primary" :disabled="$v.$invalid">
                                    Giriş Yap
                                </button>
                        <a href="#" @click.prevent="$router.push('/register')" class="text-secondary">
                                    Üye değilim
                                </a>
                    </div>
                    <div class="alert alert-dismissible alert-danger col-sm-8 offset-2" v-if="errorMessage">
                        <button type="button" class="close" @click.prevent="errorMessage = null" data-dismiss="alert">&times;</button>
                        <small class="form-text">{{ errorMessage }}</small>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        required,
        email
    } from 'vuelidate/lib/validators';
    export default {
        layout: 'auth',
        data() {
            return {
                user: {
                    email: null,
                    password: null
                },
                errorMessage: null
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch("login", {
                    user: this.user
                }).then(response => {
                    console.log(response)
                    if (response.data.status) {
                        if(this.$store.getters.getStep > 3) {
                            this.$router.push("/")
                        } else {
                            this.$router.push("/options")
                        }
                        
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
                    email
                },
                password: {
                    required
                }
            }
        }
    }
</script>

<style scoped>
    
</style>