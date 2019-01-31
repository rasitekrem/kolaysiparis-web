<template>
<div class="card-body">
    <div class="row" v-if="isShow">
        <div class="col col-sm-25">
            <h4 class="mb-0 card-title">Gün özeti</h4>
            <hr>
        </div>
    </div>
        <div class="text-center text-muted ">
            <div class="mb-5">
                <fa class="mr-2" :icon="['fas', 'exclamation']" />
                <br>Gün başı yapmadığın için sipariş alamazsın.
            </div>
            <div class="mb-2" v-if="isAuthority">
                 Hemen gün başı yapıp çalışmaya başla:
                <button type="button" class="d-sm-down-none btn btn-success" @click="dayStart">Gün başı</button>
            </div>
            <button type="button" class="d-md-none btn btn-success">Gün başı</button>
        </div>
</div>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        dayStart() {
            this.$store.dispatch('dayStart')
        }
    },
    computed: {
        isAuthority() {
            return this.$store.getters.getAuthority.day
        }
    },
}
</script>

<style scoped>

</style>
