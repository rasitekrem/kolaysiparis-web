<template>
<div class="container-fluid mr-0 mt-5 col-md-10" v-if="isAuthority">
    <h1 class="text-center">Siparişler</h1>
    <Warning v-if="!getHistories" :isShow="false"/>
    <div class="row" v-else>
        <Order v-for="addition in additions" :key="addition.table" :addition="addition" @changeStatus="changeStatus($event)" />
    </div>
</div>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-else>
    <NotAuth />
</div>
</template>

<script>
import Order from '@/components/Order/order'
import NotAuth from '@/components/Admin/NotAuth'
import Warning from '@/components/Report/warning'
export default {
    components: {
        Order,
        NotAuth,
        Warning
    },
    computed: {
        additions() {
            return this.$store.getters.getOrders
        },
        isAuthority() {
            return this.$store.getters.getAuthority.order
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
        }
    },
    methods: {
        changeStatus(addition) {
            const additions = this.additions.filter(item => {
                if (item.table === addition.table) {
                    item.status = addition.status
                }
                return item
            })
            this.$store.dispatch('changeOrderStatus', {
                additions
            })
        }
    },
}
</script>

<style scoped>

</style>
