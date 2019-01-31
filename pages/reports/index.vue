<template>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-if="isAuthority === 'Admin'">
    <h1 class="text-center">Raporlar</h1>
    <div class="form-group">
    <select class="custom-select" v-model="selected">
      <option selected value=''>Tarihi Seçiniz</option>
      <option v-for="history in getHistories" :value="history.historyDate" :key="history.historyDate">{{ history.historyDate }}</option>
    </select>
  </div>
  <Adition v-if="selected !== ''" :aditions="getAditions.histories"/>
  <Total v-if="selected !== ''" :aditions="getAditions.histories" :openTime="getAditions.openTime"/>
</div>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-else>
    <NotAuth />
</div>
</template>

<script>
import Adition from '@/components/Report/adition'
import Total from '@/components/Report/Total'
import NotAuth from '@/components/Admin/NotAuth'
export default {
    components: {
        Adition,
        Total,
        NotAuth
    },
    data() {
        return {
            selected: ''
        }
    },
    computed: {
        getHistories() {
            let histories = this.$store.getters.getHistory
            if (histories) {
                return histories
            } else
                return []
        },
        getAditions() {
            let histories = this.$store.getters.getHistory
            if (histories) {
                let historyIndex = histories.findIndex(item => item.historyDate === this.selected)
                if (historyIndex > -1) {
                    if (histories[historyIndex].histories) {

                        return {histories : histories[historyIndex].histories,openTime:histories[historyIndex].openTime }
                    } else {
                        return []
                    }
                }
            } else
                return []
        },
        isAuthority() {
            return this.$store.getters.getAuthority.role
        }
    },
}
</script>

<style scoped>

</style>
