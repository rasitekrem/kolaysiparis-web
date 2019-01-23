<template>
<div class="card border-primary mt-2">
    <div class="card-header">Profil Ayarları</div>
    <div class="card-body d-flex align-items-start flex-column">
        <h4 class="card-title">Parola Değiştir</h4>
        <div class="form-group col-sm-4">
            <div class="form-group">
                <label>Eski Şifreniz</label>
                <input
            @blur="$v.userData.oldPassword.$touch()"
            v-model="userData.oldPassword"
            type="password"
            class="form-control"
            :class="{ 'is-invalid' : $v.userData.oldPassword.$error }"
            placeholder="Eski Şifreniz..."
          >
                <small
            class="form-text text-danger"
            v-if="!$v.userData.oldPassword.required && $v.userData.oldPassword.$error"
          >Bu alan zorunludur..</small>
            </div>
            <div class="form-group">
                <label>Yeni Şifreniz</label>
                <input
            @blur="$v.userData.newPassword.$touch()"
            v-model="userData.newPassword"
            type="password"
            class="form-control"
            :class="{ 'is-invalid' : $v.userData.newPassword.$error }"
            placeholder="Yeni Şifreniz..."
          >
                <small
            class="form-text text-danger"
            v-if="!$v.userData.newPassword.required && $v.userData.newPassword.$error"
          >Bu alan zorunludur..</small>
                <small
            class="form-text text-danger"
            v-if="!$v.userData.newPassword.minLength && $v.userData.newPassword.$error"
          >Lütfen en az {{ $v.userData.newPassword.$params.minLength.min }} karakter giriniz</small>
                <small
            class="form-text text-danger"
            v-if="!$v.userData.newPassword.maxLength && $v.userData.newPassword.$error"
          >Lütfen en fazla {{ $v.userData.newPassword.$params.maxLength.max }} karakter giriniz</small>
            </div>
            <div class="form-group">
                <label>Yeniden Yeni Şifreniz</label>
                <input
            @input="$v.userData.renewPassword.$touch()"
            v-model="userData.renewPassword"
            type="password"
            class="form-control"
            :class="{ 'is-invalid' : $v.userData.renewPassword.$error }"
            placeholder="Yeniden Yeni Şifreniz..."
          >
                <small
            class="form-text text-danger"
            v-if="!$v.userData.renewPassword.required && $v.userData.renewPassword.$error"
          >Bu alan zorunludur..</small>
                <small
            class="form-text text-danger"
            v-if="!$v.userData.renewPassword.minLength && $v.userData.renewPassword.$error"
          >Lütfen en az {{ $v.userData.renewPassword.$params.minLength.min }} karakter giriniz</small>
                <small
            class="form-text text-danger"
            v-if="!$v.userData.renewPassword.maxLength && $v.userData.renewPassword.$error"
          >Lütfen en fazla {{ $v.userData.renewPassword.$params.maxLength.max }} karakter giriniz</small>
                <small
            class="form-text text-danger"
            v-if="!$v.userData.renewPassword.sameAs && $v.userData.renewPassword.$error"
          >Girdiğiniz parolalar uyuşmuyor!</small>
            </div>
            <div class="alert" :class="alertClass">{{ password.message }}</div>
            <button
          class="btn btn-primary btn-block"
          @click.prevent="save()"
          :disabled="$v.$invalid"
        >Kaydet</button>
        </div>
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
export default {
    props: {
        password: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            userData: {
                newPassword: null,
                renewPassword: null,
                oldPassword: null
            }
        };
    },
    methods: {
        save() {
            if (!this.$v.$invalid) {
                this.$emit("savePassword", this.userData);
            }
        }
    },
    computed: {
        alertClass() {
            if (this.password.status === null) {
                return "d-none";
            } else if (this.password.status === true) {
                return "alert-success";
            } else {
                return "alert-danger";
            }
        }
    },
    validations: {
        userData: {
            oldPassword: {
                required
            },
            newPassword: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(16)
            },
            renewPassword: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(16),
                sameAs: sameAs("newPassword")
            }
        }
    }
};
</script>

<style scoped>
</style>
