<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">Adisyonlar</h4>
            <hr>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th><button type="button" class="px-0 py-0 btn btn-link">#</button></th>
                            <th>Masa</th>
                            <th>Saat</th>
                            <th class="text-right">Toplam</th>
                        </tr>
                    </thead>
                    <Product v-for="(adition,index) in aditions" :key="index" :adition="adition"/>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Product from '@/components/Report/AditionItems/Product'
    export default {
        components: {
            Product
        },
        props: {
            aditions: Array
        }
    }
</script>

<style scoped>
    
</style>