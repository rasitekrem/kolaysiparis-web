<template>
<div class="container mr-0 mt-5 col-md-10 h-100" v-if="isAuthority === 'Admin'">
    <div class="mt-5 container">
        <div class="mb-5 ">
            <h2 class="text-center mb-2">Masaları Düzenle</h2>
            <input type="button" value="QR Code İndir">
            <hr>
            <Warning v-if="getHistories" />
            <EditPage :tables="$store.getters.getTables" @updateTables="$store.dispatch('updateTables',$event)" v-else />
        </div>
    </div>
</div>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-else>
    <NotAuth />
</div>
</template>

<script>
import EditPage from '@/components/Settings/EditTable/EditPage';
import Warning from '@/components/Settings/Warning'
import NotAuth from '@/components/Admin/NotAuth'
export default {
    components: {
        EditPage,
        Warning,
        NotAuth
    },
    computed: {
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
            return this.$store.getters.getAuthority.role
        }
    },
}
</script>

<style scoped>

</style>
