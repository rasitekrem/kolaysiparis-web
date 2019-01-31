<template>
<div class="container-fluid mr-0 mt-5 col-md-10">
    <div class="card my-3">
        <Warning v-if="!getHistories"/>
        <Day :showDetail="isAuthority" :dayDetail="dayDetail" v-else/>
    </div>
    <Chart :chart="getChart" :isOpen="getHistories"/>
</div>
</template>

<script>
import Day from '@/components/Report/day'
import Chart from '@/components/Report/chart'
import Warning from '@/components/Report/warning'
export default {
    components: {
        Day,
        Chart,
        Warning
    },
    computed: {
        dayDetail() {
            return this.$store.getters.dayDetail
        },
        getChart() {
            return this.$store.getters.getChart
        },
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
        },
        isAuthority() {
            return this.$store.getters.getAuthority.day
        }
    }
}
</script>
