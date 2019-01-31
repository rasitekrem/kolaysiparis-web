<template>
<div class="container-fluid mr-0 mt-5 col-md-10">
    <Personal v-if="isAuthority === 'Admin'"/>
    <NotAuth v-else/>
</div>
</template>

<script>
import Personal from '@/components/Personal/personal'
import NotAuth from '@/components/Admin/NotAuth'
export default {
    components: {
        Personal,
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
