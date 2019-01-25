<template>
    <div class="mb-0 card">
        <div class="card-header">
            <div class="input-group">
                <input v-model="category.name" @input="$v.category.name.$touch(); checked();" placeholder="Kategori Adı (örn: Başlangıçlar)" type="text" class="form-control">
                <a @click.prevent="removeCategory" class="btn">
                    <fa class="mr-2" :icon="['fas', 'times']" />
                </a>
            </div>
        </div>
        <div class="pt-0 card-body">
            <div style="border-bottom: 1px solid rgb(204, 204, 204);">
                <div class="py-2 row">
                    <div class="col"><b>Ürün</b></div>
                    <div class="col"><b>Fiyat</b></div>
                </div>
            </div>
            <Product v-for="(product,index) in category.products" :key="index" :index="index" :product="product" @addProduct="addProduct($event)" @remove="remove($event)"/>
            <button type="button" class="mt-2 btn btn-secondary" @click.prevent="newProduct" :disabled="isInvalid"><fa class="mr-2" :icon="['fas', 'plus']"/> Ürün ekle</button></div>
    </div>
</template>

<script>
    import Product from '@/components/Settings/EditMenu/Product'
    import { required } from 'vuelidate/lib/validators';
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
        data() {
            return {
                productCount: this.category.products.length,
                isInvalid: false
            }
        },
        methods: {
            newProduct() {
                this.category.products.push({ key: this.category.name + (this.category.products.length +1), name :null, price : null})
                this.isInvalid = true
            },
            addProduct(data) {
                this.isInvalid = data.invalid
                if (data.product.price !== null && data.product.name !== null) {
                    let findIndex = this.category.products.findIndex(item => item.key==data.product.key);
                    if (findIndex > -1) {
                        this.category.products[findIndex] = data.product
                    } else {
                        this.category.products.push(data.product)
                    }
                    this.category.products.sort((a, b) => {
                        return a.key - b.key
                    })
                    this.productCount = this.category.products.length
                }
                
                this.$emit("addCategory",{ category: this.category , invalid : (this.$v.$invalid || this.isInvalid ) })
                
            },
            checked() {
                this.category.products.forEach((product,index) => {
                    this.category.products[index].key = this.category.name + (index + 1)
                });
                this.$emit("addCategory",{ category: this.category , invalid : (this.$v.$invalid || this.isInvalid ) })
            },
            remove (key) {
                this.category.products = this.category.products.filter(tab => {
                     return key !== tab.key
                    });
                for(let index = 1 ; index<=this.category.products.length ; index++) {
                    this.category.products[index-1].key = this.category.name + index
                }
                this.isInvalid = this.$v.$invalid
                this.$emit("addCategory",{ category: this.category , invalid : (this.$v.$invalid || this.isInvalid ) }) 
            },
            removeCategory() {
                this.$emit('removeCategory',this.category.key)
            }
        },
        validations: {
            category: {
                name: {
                    required
                }
            }
        }
    }
</script>

<style scoped>
    
</style>