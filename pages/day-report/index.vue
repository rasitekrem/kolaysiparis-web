<template>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-if="isAuthority">
    <Warning v-if="!getHistories" />
    <Day :dayDetail="dayDetail" v-if="getHistories" />
    <Endofday v-if="getHistories" :adition="dayDetail.adition" @endOfDay="endOfDay" />
    <Adition v-if="getHistories" :aditions="getAditions" />
</div>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-else>
    <NotAuth />
</div>
</template>

<script>
import Day from '@/components/Report/day'
import Endofday from '@/components/Report/endofday'
import Adition from '@/components/Report/adition'
import Warning from '@/components/Report/warning'
import NotAuth from '@/components/Admin/NotAuth'
export default {
    components: {
        Day,
        Endofday,
        Adition,
        Warning,
        NotAuth
    },
    computed: {
        dayDetail() {
            return this.$store.getters.dayDetail
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
        getAditions() {
            let today = this.$store.getters.getToday
            let histories = this.$store.getters.getHistory
            if (histories) {
                let historyIndex = histories.findIndex(item => item.historyDate === today)
                if (historyIndex > -1) {
                    if (histories[historyIndex].histories) {

                        return histories[historyIndex].histories
                    } else {
                        return []
                    }
                }
            } else
                return []
        },
        isAuthority() {
            return this.$store.getters.getAuthority.day
        }
    },
    methods: {
        endOfDay() {
            this.$store.dispatch('endOfDay')
                .then(response => {
                    this.$router.push('/')
                })
        }
    },
}
</script>

<style scoped>

</style>
