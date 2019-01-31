<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4 class="mb-0 card-title">Personel</h4>
        </div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>Mail</th>
                        <th class="text-right">Parola</th>
                        <th class="text-right">Aktif</th>
                    </tr>
                </thead>
                <List v-for="(personal) in personals" :key="personal._id" :personal="personal"/>
            </table>
            <button type="button" class="btn btn-primary" @click="isOpen = !isOpen"><fa :icon="['fas', 'user-plus']" class="mx-2"></fa>Yeni Personel</button></div>
            <New v-if="isOpen" @save="save($event)" @close="isOpen = !isOpen"/>
    </div>
</template>
<script>
import List from '@/components/Personal/List'
import New from '@/components/Personal/New'
export default {
    data() {
        return {
            isOpen: false
        }
    },
    components: {
        List,
        New
    },
    methods: {
        save(personal) {
            this.$store.dispatch('addPersonal',personal)
                .then(response => {
                    this.isOpen = false
                })
        }
    },
    computed: {
        personals() {
            return this.$store.getters.getPersonal
        }
    },
}
</script>
<style scoped>
    
</style>
