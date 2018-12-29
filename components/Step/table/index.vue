<template>
    <div class="mb-2 ">
        <div class="d-flex justify-content-around my-2">
                    <div class="input-group">
                        <input v-model="table.name" @input="$v.table.name.$touch(); checked();" class="form-control" :class="{ 'is-invalid' : $v.table.name.$error }" placeholder="Masa Eki (Örnek: Bahçe,Teras)" type="text" >
                        <input v-model="table.count" @input="$v.table.count.$touch(); checked();" class="text-right form-control" :class="{ 'is-invalid' : $v.table.count.$error }" placeholder="Masa Sayısı" type="number">
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
                table: {
                    name: null,
                    count: null
                }
            }
        },
        validations: {
            table: {
                name: {
                    required
                },
                count: {
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
                    console.log(this.index)
                    this.$emit("addTable",
                    {
                            table : {
                                key : this.index, ...this.table
                                },
                            invalid : this.$v.$invalid
                            })
            }
        }
    }
</script>

<style scoped>
    
</style>