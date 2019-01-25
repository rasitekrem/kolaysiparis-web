<template>
<div class="container mr-0 mt-5 col-md-10 h-100">
    <div class="mb-5">
        <h2>Menüyü Düzenle</h2>
        <hr>
        <div class="pb-4">
            <Category v-for="(category,index) in categories" :key="index" :category="category" @addCategory="addCategory($event)" @removeCategory="remove($event)" />
        </div>
        <div class="d-flex justify-content-between mx-2">
            <button type="button" id="new-category-button" class="btn btn-primary" @click.prevent="newCategory" :disabled="isInvalid"><fa class="mr-2" :icon="['fas', 'plus']"/> Yeni kategori</button>
            <button type="button" class="pull-right btn btn-success" :disabled="isInvalid" @click.prevent="save">Kaydet</button>
        </div>
    </div>
</div>
</template>

<script>
import Category from '@/components/Settings/EditMenu/Category'
export default {
    components: {
        Category
    },
    data() {
        return {
            categories :  this.$store.getters.getCategories,
            isInvalid: false
        }
    },
    methods: {
        newCategory() {
            this.categories.push({
                key: this.categories.length + 1,
                name: null,
                products: []
            })
            this.isInvalid = true
        },
        addCategory(data) {
            this.isInvalid = data.isInvalid
            if (data.category.key !== null) {
                const findIndex = this.categories.findIndex(tab => data.category.key === tab.key );
                if (findIndex > -1) {
                    this.categories[findIndex] = data.category
                } else {
                    this.categories.push(data.category)
                    this.categories.sort((a, b) => {
                        return a.key - b.key
                    })
                }
            }
            console.log(this.categories)
        },
        save() {
            this.$store.dispatch("updatecategories", this.categories)
                .then(response => {
                    if (response.status) {
                        this.$route.push("/")
                    }
                })
        },
         remove(key) {
            this.categories = this.categories.filter(tab => {
                     return key !== tab.key
                    });  
                for (let index = 1; index <= this.categories.length; index++) {
                    this.categories[index - 1].key = index
                }
                this.isInvalid = false           
        }
    }
}
</script>

<style scoped>

</style>
