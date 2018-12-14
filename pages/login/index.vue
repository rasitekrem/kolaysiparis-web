<template>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-md-4 offset-4 card card-primary p-3 border border-primary">
                <h3 class="text-primary text-center mb-3 mt-3">Kolay Sipariş | Giriş</h3>
                <hr>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>E-posta Adresiniz</label>
                        <input v-model="user.email" type="email" class="form-control" placeholder="E-posta adresinizi giriniz">
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input v-model="user.password" type="password" class="form-control" placeholder="Şifreniz...">
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit" class="btn btn-block mb-2 btn-primary">
                                Giriş Yap
                            </button>
                        <a href="#" @click.prevent="$router.push('/register')" class="text-secondary">
                                Üye değilim
                            </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    export default {
        layout: 'auth',
        data() {
            return {
                user: {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch("login", {
                    user: this.user
                }).then(response => {
                    this.$router.push("/")
                })
                console.log(this.user)
            }
        },
        validations: {
            
        }
    }
</script>

<style scoped>
    
</style>