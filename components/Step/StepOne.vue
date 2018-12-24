<template>
    <div class="mt-5 container">
        <div class="mb-5 ">
            <h2 class="text-center mb-2">Restoran Bilgilerini Giriniz</h2>
            <hr>
            <div class="mb-5 ">
                <div class="mb-2 ">
                    <div class="my-2">
                        <div class="d-flex flex-column col-sm-6 offset-3">
                            <input @blur="$v.restaurantInfo.restaurantName.$touch()" :class="{ 'is-invalid' : $v.restaurantInfo.restaurantName.$error }" placeholder="Restoran Adı" type="text" class="text-left form-control mt-2" v-model="restaurantInfo.restaurantName">
                            <small class="form-text text-danger" v-if="!$v.restaurantInfo.restaurantName.required && $v.restaurantInfo.restaurantName.$error">Bu alan zorunludur..</small>
                            <input @blur="$v.restaurantInfo.county.$touch()" :class="{ 'is-invalid' : $v.restaurantInfo.county.$error }" placeholder="İlçe" type="text" class="text-left form-control mt-2" v-model="restaurantInfo.county">
                            <small class="form-text text-danger" v-if="!$v.restaurantInfo.county.required && $v.restaurantInfo.county.$error">Bu alan zorunludur..</small>
                            <input @blur="$v.restaurantInfo.city.$touch()" :class="{ 'is-invalid' : $v.restaurantInfo.city.$error }" placeholder="İl" type="text" class="text-left form-control mt-2" v-model="restaurantInfo.city">
                            <small class="form-text text-danger" v-if="!$v.restaurantInfo.city.required && $v.restaurantInfo.city.$error">Bu alan zorunludur..</small>
                            <textarea @blur="$v.restaurantInfo.address.$touch()" :class="{ 'is-invalid' : $v.restaurantInfo.address.$error }" placeholder="Adres" class="text-left form-control mt-2" rows="3" v-model="restaurantInfo.address"></textarea>
                            <small class="form-text text-danger" v-if="!$v.restaurantInfo.address.required && $v.restaurantInfo.address.$error">Bu alan zorunludur..</small>
                            <button type="button" @click.prevent="onSubmit" :disabled="$v.$invalid" class="btn btn-success mt-2">Kaydet</button>
                        </div>
                    </div>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script>
    import {
        required
    } from 'vuelidate/lib/validators';
    export default {
        data() {
            return {
                restaurantInfo: {
                    restaurantName: null,
                    county: null,
                    city: null,
                    address: null
                }
    
            }
        },
        methods: {
            onSubmit() {
                this.$emit("submitOne", this.restaurantInfo);
            }
        },
        validations: {
            restaurantInfo: {
                restaurantName: {
                    required
                },
                county: {
                    required
                },
                city: {
                    required
                },
                address: {
                    required
                }
            }
        }
    
    }
</script>

<style scoped>
    
</style>