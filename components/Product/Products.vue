<template>
    <div class="product-container card shadow mr-5">
        <div class="row">
            <div class="col-sm-2"><a class="btn" @click="$emit('back',null)"><fa :icon="['fas', 'angle-double-left']"/> Geri </a></div>
            <h3 class="text-center col-sm-8">{{ category.name }}</h3>
            <h3 class="col-sm-2 text-right"></h3>
        </div>
        <div class="list-group">
            <Product v-for="(product,index) in category.products" :key="index" :product="product" :table="table"/>
        </div>
    </div>
</template>

<script>
    import Product from '@/components/Product/Product';
    export default {
        props: {
            category: {
                type: Object,
                required: true
            },
            table: {
                type: String,
                required: true
            }
        },
        components: {
            Product
        },
        methods: {
            
        },
    }
</script>

<style scoped>

</style>