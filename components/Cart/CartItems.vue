<template>
    <table class="table table-hover table-striped table-bordered">
        <thead>
            <th class="text-center">Ürün Adı</th>
            <th class="text-center">Adet</th>
            <th class="text-center">Fiyat</th>
            <th class="text-center">Tutar</th>
            <th class="text-center">Sil</th>
        </thead>
        <tbody>
            <CartItem v-for="product in products" :key="product.key" :product="product"/>
        </tbody>
    </table>
</template>

<script>
    import CartItem from '@/components/Cart/CartItem';
    export default {
        components: {
                CartItem
            },
        props: {
            products: {
                type: Array,
                required: true
            }
        },
        created() {
            console.log('here')
            console.log(this.products)
        },
        computed: {
            
        },
    }
</script>

<style scoped>
    
        
</style>