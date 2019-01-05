<template>
    <div class="product-container card shadow mr-5">
        <div class="row">
            <div class="col-sm-2"></div>
            <h3 class="text-center col-sm-8">{{ category.name }}</h3>
            <h3 class="col-sm-2 text-right"><a class="btn" @click="test"><fa :icon="['fas', 'angle-down']"/></a></h3>
        </div>
        <div class="list-group">
            <Product v-for="(product,index) in category.products" :key="index" :product="product"/>
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
            }
        },
        components: {
            Product
        },
        methods: {
            test(){
                alert()
            }
        },
    }
</script>

<style scoped>

</style>