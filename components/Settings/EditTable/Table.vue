<template>
<div class="mb-2 ">
    <div class="d-flex justify-content-around my-2">
        <div class="input-group">
            <input v-model="table.name" @input="$v.table.name.$touch(); checked();" class="form-control" :class="{ 'is-invalid' : $v.table.name.$error }" placeholder="Masa Eki (Örnek: Bahçe,Teras)" type="text" >
            <input v-model="table.count" @input="$v.table.count.$touch(); checked();" class="text-right form-control" :class="{ 'is-invalid' : $v.table.count.$error }" placeholder="Masa Sayısı" type="number">
            <a @click.prevent="$emit('remove',index)" class="btn">
                    <fa class="mr-2" :icon="['fas', 'times']" />
                </a>
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
    props: ['index', 'table'],
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
            this.$emit("addTable", {
                table: {
                    key: this.index,
                    ...this.table
                },
                invalid: this.$v.$invalid,
                index: this.index
            })
        }
    }
}
</script>

<style scoped>

</style>
