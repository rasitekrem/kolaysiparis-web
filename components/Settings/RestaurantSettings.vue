<template>
<div class="card border-primary mt-2">
    <div class="card-header">Restoran Ayarları</div>
    <Warning v-if="getHistories" />
    <div class="card-body d-flex col-sm-6 flex-column" v-else>
        <h4 class="card-title">Restoran Bilgilerini Düzenle</h4>
        <div class="form-group">
            <label>Restoran Adınız</label>
            <input
            @input="$v.restaurantInfo.restaurantName.$touch()"
            v-model="restaurantInfo.restaurantName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid' : $v.restaurantInfo.restaurantName.$error }"
            placeholder="Restoran Adınız..."
          >
            <small
            class="form-text text-danger"
            v-if="!$v.restaurantInfo.restaurantName.required && $v.restaurantInfo.restaurantName.$error"
          >Bu alan zorunludur..</small>
        </div>
         <div class="row">
            <div class="form-group col-sm-6">
                <label>İlçe</label>
                <input
            @input="$v.restaurantInfo.county.$touch()"
            v-model="restaurantInfo.county"
            type="text"
            class="form-control"
            :class="{ 'is-invalid' : $v.restaurantInfo.county.$error }"
            placeholder="Restoran Adınız..."
          >
                <small
            class="form-text text-danger"
            v-if="!$v.restaurantInfo.county.required && $v.restaurantInfo.county.$error"
          >Bu alan zorunludur..</small>
            </div>
            <div class="form-group col-sm-6">
                <label>İl</label>
                <input
            @input="$v.restaurantInfo.city.$touch()"
            v-model="restaurantInfo.city"
            type="text"
            class="form-control"
            :class="{ 'is-invalid' : $v.restaurantInfo.city.$error }"
            placeholder="Restoran Adınız..."
          >
                <small
            class="form-text text-danger"
            v-if="!$v.restaurantInfo.city.required && $v.restaurantInfo.city.$error"
          >Bu alan zorunludur..</small>
            </div>
        </div>
        <div class="form-group">
            <label>Restoran Adresiniz</label>
            <input
            @input="$v.restaurantInfo.address.$touch()"
            v-model="restaurantInfo.address"
            type="text"
            class="form-control"
            :class="{ 'is-invalid' : $v.restaurantInfo.address.$error }"
            placeholder="Restoran Adınız..."
          >
            <small
            class="form-text text-danger"
            v-if="!$v.restaurantInfo.address.required && $v.restaurantInfo.address.$error"
          >Bu alan zorunludur..</small>
        </div>
         <button
          class="btn btn-primary btn-block"
          @click.prevent="save()"
          :disabled="$v.$invalid"
        >Kaydet</button>
    </div>
</div>
</template>

<script>
import {
    required,
    minLength,
    maxLength,
    sameAs
} from "vuelidate/lib/validators";
import Warning from '@/components/Settings/Warning'
export default {
    components: {
        Warning
    },
    props: {
        restaurantInfo: {
            type: Object,
            required: true
        }
    },
    validations: {
        restaurantInfo: {
            restaurantName: {
                required
            },
            address: {
                required
            },
            county: {
                required
            },
            city: {
                required
            }
        }
    },
    methods: {
        save() {
            this.$emit('saveRestaurant',this.restaurantInfo)
        }
    },
    computed: {
        getHistories() {
            let today = this.$store.getters.getToday
            let histories = this.$store.getters.getHistory
            if (histories) {
                let historyIndex = histories.findIndex(item => item.historyDate === today)
                if (historyIndex > -1) {
                    if (histories[historyIndex].isOpen) {
                        return true
                    } else {
                        return false
                    }
                }
            } else
                return false
        }
    },
}
</script>

<style scoped>

</style>
