<template>
    <div class="container mr-0 mt-5 col-md-10">
        <h3 class="text-center mt-3">{{ table }}</h3>
        <div class="d-flex pt-3 justify-content-center" style="height: 100%">
            <Categories v-if="!categoryName" @category="setCategory($event)" :categories="categories"/>
            <Products v-if="categoryName" :category="category" :table="table" @back="setCategory($event)"/>
            <Cart :cart="getCart" :table="table" @actionCart="actionCart($event)"/>
        </div>
    </div>
</template>

<script>
    import Products from '@/components/Product/Products';
    import Cart from '@/components/Cart/Cart';
    import Categories from '@/components/Category/Categories';
    export default {
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
                    return category[0]
                }
            },
            getCart(){
                let carts = this.$store.getters.getCart
                let cart = { isEmpty : true }
                if (carts) {
                    carts.find(item => {
                    if (item.table === this.table) {
                        cart = item
                         cart.isEmpty = false
                    }
                });
                }
                return cart
            }
        },
        methods: {
            setCategory(categoryName) {
                this.categoryName = categoryName
            },
            actionCart(action) {
                if (action === "takingOrder") {
                    this.$store.dispatch("takingOrder",this.getCart)
                } else if(action === "payOrder") {
                    this.$router.push({ name: 'pay', params: { table: this.table }, props: true })
                }
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
            height: 85vh;
        }
        body {
            background-color: #FAF3DF;
        }

</style>