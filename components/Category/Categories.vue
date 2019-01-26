<template>
    <div class="product-container card shadow mr-5">
        <h3 class="text-center">Ürün Listesi</h3>
        <div class="card-body">
        <div class="list-group">
            <Category v-for="(category,index) in categories" :key="index" :category="category" @category="setCategoryName($event)"/>
        </div>
        </div>
    </div>
</template>

<script>
    import Category from '@/components/Category/Category';
    export default {
        components: {
            Category
        },
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        methods: {
            setCategoryName(categoryName) {
                this.$emit("category",categoryName)
            }
        },
    }
</script>

<style scoped>

</style>