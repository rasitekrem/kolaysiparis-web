<template>
    <div class="container-fluid mr-0 mt-5 col-md-10 ">
        <h1 class="text-center">Siparişler</h1>
        <div class="row">
            <Order v-for="addition in additions" :key="addition.additionId" :addition="addition"/>
        </div>
    </div>
</template>

<script>
    import Order from '@/components/Order/order'
    export default {
        components: {
            Order
        },
        data() {
            return {
                additions: [
                    {
                        tableInfo: 'Masa 1',
                        products: [
                            { name: 'Adana', count: 2 },
                            { name: 'Urfa', count: 1 },
                            { name: 'Ciğer', count: 3 },
                            { name: 'Kuzu Şiş', count: 4 },
                        ],
                        status: "Sipariş Verildi",
                        additionId: 'A1'
                    },
                    {
                        tableInfo: 'Masa 2',
                        products: [
                            { name: 'İşkembe Çorbası', count: 2 },
                            { name: 'Adana', count: 2 },
                            { name: 'Mercimek', count: 1 },
                            { name: 'Etliekmek', count: 1 },
                            { name: 'Mevlana', count: 3 },
                            { name: 'Lahmacun', count: 5 },
                        ],
                        status: "Sipariş Verildi",
                        additionId: 'A2'
                    },
                    {
                        tableInfo: 'Masa 3',
                        products: [
                            { name: 'Adana', count: 2 },
                            { name: 'Urfa', count: 1 },
                            { name: 'Ciğer', count: 3 },
                            { name: 'Kuzu Şiş', count: 4 },
                        ],
                        status: "Sipariş Verildi",
                        additionId: 'A3'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    
</style>