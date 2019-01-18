<template>
    <div class="table-responsive">
        <table class="mb-4 table table-striped">
            <tbody>
                <tr>
                    <td class="small-title pt-1 pb-1">ÖDENMİŞ</td>
                </tr>
                <tr class="table-stripe">
                    <PaidItem v-for="(product,index) in paid" :key="index" :product="product"/>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PaidItem from '@/components/Pay/PaidItem.vue';
    export default {
        components: {
            PaidItem
        },
        props: {
             paid: {
                type: Object,
                required: true
            },
        }
    }
</script>

<style scoped>
    
</style>