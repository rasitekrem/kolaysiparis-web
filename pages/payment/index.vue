<template>
    <div class="container-fluid mr-0 mt-5 col-md-10">
        <h3 class="text-center mt-3">{{ table }}</h3>
        <div class="d-flex pt-3 justify-content-center" style="height: 100%">
            <Categories v-if="!categoryName" @category="setCategory($event)" :categories="categories"/>
            <Products v-if="categoryName" :category="category"/>
            <Cart />
        </div>
    </div>
</template>

<script>
    import Products from '@/components/Product/Products';
    import Cart from '@/components/Cart/Cart';
    import Categories from '@/components/Category/Categories';
    export default {
        middleware: ['payment'],
        data() {
            return {
                isCategory : true,
                categoryName: null
            }
        },
        components: {
            Products,
            Cart,
            Categories
        },
        beforeCreate() {
            if (!this.$route.params.table) {
                this.$router.push('/cashier')
            } 
            this.table = this.$route.params.table
        },
        computed: {
            categories() {
                return this.$store.getters.getCategories
            },
            category() {
                if (this.categoryName !== null) {
                    let category = this.$store.getters.getCategories.filter((category) => {
                        if(category.name === this.categoryName){ return true; }
                    }); 
                    console.log(category[0].products)
                    return category[0]
                }
            }
        },
        methods: {
            setCategory(categoryName) {
                console.log(categoryName)
                this.categoryName = categoryName
            }
        },
    }
</script>

<style scoped>
    .product-container, .cart-container {
            padding: 1em;
            flex: 1 !important;
        }
        .container {
            height: 90vh;
        }
        body {
            background-color: #FAF3DF;
        }
        .price-container{
            background-color: #D15385 !important;
            font-size: 12px;
        }
        .total-price-container{
            color: #D15385 !important;
            font-size: 20px;
        }
        .custom-alert {
            background-color: #FAF3DF !important;
            font-size: 12px;
        }
        .bg-custom-color {
            background-color: #FAF3DF !important;
        }
</style>