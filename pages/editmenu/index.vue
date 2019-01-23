<template>
    <div class="container mr-0 mt-5 col-md-10 h-100">
        <EditPage :tables="$store.getters.getTables"/>
    </div>
</template>

<script>
import EditPage from '@/components/Settings/EditTable/EditPage';
    export default {
        components: {
            EditPage
        },
    }
</script>

<style scoped>

</style>