<template>
<div class="container mr-0 mt-5 col-md-10 h-100">
    <Settings />
</div>
</template>

<script>
import Settings from '@/components/Settings/Settings'
export default {
    middleware: ['restaurantinfo'],
    components: {
        Settings
    }
}
</script>

<style scoped>

</style>
