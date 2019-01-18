<template>
     <div class="container-fluid mr-0 mt-5 col-md-10 ">
    <Day :showDetail="true" :dayDetail="dayDetail"/>
    <Chart :chart="getChart"/>
</div>
</template>

<script>
    import Day from '@/components/Report/day'
    import Chart from '@/components/Report/chart'
    export default {
        components: {
            Day,
            Chart,
        },
        computed: {
            dayDetail() {
                return this.$store.getters.dayDetail
            },
            getChart() {
                return this.$store.getters.getChart
            }
        },
    }
</script>

