<template>
    <div class="mb-0 card">
        <div class="card-header">
            <div class="input-group">
                <input v-model="category.name" @input="$v.category.name.$touch(); checked();" placeholder="Kategori Adı (örn: Başlangıçlar)" type="text" class="form-control">
                <div class="input-group-addon">
                    <button type="button" class="close mx-2 "><span>×</span></button>
                </div>
            </div>
        </div>
        <div class="pt-0 card-body">
            <div style="border-bottom: 1px solid rgb(204, 204, 204);">
                <div class="py-2 row">
                    <div class="col"><b>Ürün</b></div>
                    <div class="col"><b>Fiyat</b></div>
                </div>
            </div>
            <Product v-for="index in productCount" :key="index" :index="category.name+index" @addProduct="addProduct($event)" />
            <button type="button" class="mt-2 btn btn-secondary" @click.prevent="newProduct" :disabled="isInvalid"><fa class="mr-2" :icon="['fas', 'plus']"/> Ürün ekle</button></div>
    </div>
</template>

<script>
    import Product from '@/components/Step/product'
    import { required } from 'vuelidate/lib/validators';
    export default {
        props: ['index'],
        components: {
            Product
        },
        data() {
            return {
                category : {
                    name : null,
                    products: [],
                },
                productCount: 1,
                isInvalid: true
            }
        },
        methods: {
            newProduct() {
                this.productCount++
                this.isInvalid = true
            },
            addProduct(data) {
                this.isInvalid = data.invalid
                this.category.products = this.category.products.filter(tab => {
                    return data.product.key !== tab.key
                });
                if (data.product.price !== null && data.product.name !== null) {
                    this.category.products.push(data.product)
                    this.category.products.sort((a, b) => {
                        return a.key - b.key
                    })
                }
                this.$emit("addCategory",{ category: { key : this.index, ...this.category }, invalid : (this.$v.$invalid || this.isInvalid ) })
                
            },
            checked() {
                this.$emit("addCategory",{ category: { key : this.index, ...this.category }, invalid : (this.$v.$invalid || this.isInvalid ) })
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