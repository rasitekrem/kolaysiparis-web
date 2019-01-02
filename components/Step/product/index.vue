<template>
    <div style="border-top: 1px solid rgb(204, 204, 204);">
        <div class="py-2 row">
            <div class="col">
                <input v-model="product.name" @input="$v.product.name.$touch(); checked();" placeholder="Ürün Adı" type="text" class="form-control" :class="{ 'is-invalid' : $v.product.name.$error }">
            </div>
            <div class="col">
                <div class="input-group">
                    <div class="input-group">
                        <input v-model="product.price" @input="$v.product.price.$touch(); checked();" placeholder="Fiyat" type="number" class="text-right form-control" :class="{ 'is-invalid' : $v.product.price.$error }">
                        <div class="input-group-addon form-control col-sm-1">₺</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        required,
        numeric,
        minLength,
        maxLength
    } from 'vuelidate/lib/validators';
    export default {
        props: ['index'],
        data() {
            return {
                product: {
                    name: null,
                    price: null
                }
            }
        },
        validations: {
            product: {
                name: {
                    required
                },
                price: {
                    required,
                    numeric,
                    minValue: (value) => {
                        console.log(value)
                        if (value != null) {
                            if (+value > 0) {
                                return true
                            } else {
                                return false
                            }
                            
                        } else {
                            return true 
                        }
                    }
                }
            }
        },
        methods: {
            checked() {
                    this.$emit("addProduct",
                    {
                            product : {
                                key : this.index, ...this.product
                                },
                            invalid : this.$v.$invalid
                            })
            }
        }
    }
</script>

</script>

<style scoped>
    
</style>