<template>
<div class="container mr-0 mt-5 col-md-10 h-100">
    <Settings v-if="isAuthority === 'Admin'"/>
    <NotAuth v-else/>
</div>
</template>

<script>
import Settings from '@/components/Settings/Settings'
import NotAuth from '@/components/Admin/NotAuth'
export default {
    middleware: ['restaurantinfo'],
    components: {
        Settings,
        NotAuth
    },
    computed: {
        isAuthority() {
            return this.$store.getters.getAuthority.role
        }
    },
}
</script>

<style scoped>

</style>
