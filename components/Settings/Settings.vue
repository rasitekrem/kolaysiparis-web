<template>
<div>
    <h1 class="text-center">Ayarlar</h1>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-primary" :class="{ 'active': active}" @click="active = true; activeItem = 'Profil'"> Profil</label>
        <label class="btn btn-primary" :class="{ 'active': !active }" @click="active = false; activeItem = 'Restoran'"> Restoran </label>
    </div>
    <UserProfile v-if="activeItem === 'Profil'"  @savePassword="savePassword($event)" :password="getPassword" />
    <RestaurantSettings v-if="activeItem === 'Restoran'" :restaurantInfo="getRestaurantInfo" @saveRestaurant="saveRestaurant($event)"/>
</div>
</template>

<script>
import UserProfile from '@/components/Settings/UserProfile'
import RestaurantSettings from '@/components/Settings/RestaurantSettings'
export default {
    data() {
        return {
            active: true,
            activeItem: 'Profil',
            password: {
                status: null,
                message: null
            },
            restaurant: {
                status: null,
                message: null
            }
        }
    },
    components: {
        UserProfile,
        RestaurantSettings
    },
    computed: {
        getPassword() {
            return this.password
        },
        getRestaurantInfo() {
            return this.$store.getters.getRestaurantInfo
        }
    },
    methods: {
        savePassword(userData) {
            this.$store.dispatch('savePassword', userData)
                .then(response => {
                    this.password.status = response.data.status
                    this.password.message = response.data.message
                    console.log(response)
                })
        },
        saveRestaurant(restaurant) {
            this.$store.dispatch('saveRestaurant',restaurant)
                .then(response => {
                    this.restaurant.status = response.data.status
                    this.restaurant.message = response.data.message
                })
        }
    },
}
</script>

<style scoped>

</style>
