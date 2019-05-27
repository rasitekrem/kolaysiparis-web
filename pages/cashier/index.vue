<template>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-if="isAuthority">
    <div class="d-flex justify-content-between mb-3 mt-2">
        <h1 class="text-center">Kasa</h1>
        <div class="pull-right mr-0 text-right d-sm-down-none small">
            servis edildi&nbsp;<div class="bg-info" style="display: inline;">&nbsp;&nbsp;&nbsp;</div>
            <br>siparişleri mutfakta hazır&nbsp;<div class="bg-warning" style="display: inline;">&nbsp;&nbsp;&nbsp;</div>
            <br>sipariş bekliyor&nbsp;<div class="bg-danger" style="display: inline;">&nbsp;&nbsp;&nbsp;</div><br>&nbsp;
            </div>
        </div>
        <Warning v-if="!getHistories" :isShow="false"/>
        <div class="row d-flex justify-content-start" v-else>
            <Desk @clicked="clicked($event)" v-for="(table,index) in tables" :table="table" :status="status(table)" :key="index" />
        </div>
    </div>
    <div class="container-fluid mr-0 mt-5 col-md-10 " v-else>
        <NotAuth />
    </div>
</template>

<script>
import Desk from '@/components/Cash/desk'
import NotAuth from '@/components/Admin/NotAuth'
import Warning from '@/components/Report/warning'
export default {
    components: {
        Desk,
        NotAuth,
        Warning
    },
    methods: {
        clicked(table) {
            this.$router.push({
                name: 'payment',
                params: {
                    table
                },
                props: true
            })
        },
        status(table) {
            let orders = this.$store.getters.getOrders
            if (orders) {
                let order = orders.filter((item) => {
                    if (item.table === table) {
                        return item
                    }
                })
                if (order.length > 0) {
                    return order[0].status
                } else {
                    return 'Sipariş Yok'
                }
            } else {
                return 'Sipariş Yok'
            }
        }
    },
    beforeCreate() {
        this.$store.dispatch("getTables")
    },
    computed: {
        tables() {
            let countArray = [];
            const tables = this.$store.getters.getTables
            tables.forEach(table => {
                for (let index = 1; index <= table.count; index++) {
                    countArray.push(`${table.name} ${index}`)
                }
            });
            return countArray
        },
        isAuthority() {
            return this.$store.getters.getAuthority.cash
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
    }
}
</script>

<style scoped>

</style>
