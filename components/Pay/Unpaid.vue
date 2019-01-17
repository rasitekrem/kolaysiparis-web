<template>
    <div class="table-responsive">
        <table class="mb-5 table table-striped">
            <tbody>
                <tr>
                    <td class="small-title border-top-0 pt-1 pb-1">KALANLAR</td>
                </tr>
                <tr>
                    <UnpaidItem v-for="product in unpaid" :key="product.key" :product="product"/>
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
            }
        }
    }
</script>

<style scoped>
    
</style>