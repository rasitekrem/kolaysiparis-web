<template>
<div class="container-fluid mr-0 mt-5 col-md-10 ">
    <Day :dayDetail="dayDetail"/>
    <Endofday />
    <Adition />
</div>
    
</template>

<script>
    import Day from '@/components/Report/day'
    import Endofday from '@/components/Report/endofday'
    import Adition from '@/components/Report/adition'
    export default {
        components: {
            Day,
            Endofday,
            Adition
        },
        computed: {
            dayDetail() {
            return this.$store.getters.dayDetail
            }
        },
    }
</script>

<style scoped>
    
</style>