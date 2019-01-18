<template>
    <div class="table-responsive">
        <table class="mb-5 table table-striped">
            <tbody>
                <tr>
                    <td class="small-title border-top-0 pt-1 pb-1">KALANLAR</td>
                </tr>
                <tr>
                    <p class="text-muted text-center ml-3 mr-3 mt-3" v-if="unpaid.length == 0">Ödenecek bir şey kalmadı</p>
                    <UnpaidItem v-for="product in unpaid" :key="product.key" :product="product" @selected="$emit('selected',$event)" :clean="clean" @cleaned="$emit('cleaned')"/>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import UnpaidItem from '@/components/Pay/UnpaidItem.vue';
    export default {
        components: {
            UnpaidItem
        },
        props: {
            unpaid: {
                type: Object,
                required: true
            },
            clean: {
                type: Boolean
            }
        }
    }
</script>

<style scoped>
    
</style>