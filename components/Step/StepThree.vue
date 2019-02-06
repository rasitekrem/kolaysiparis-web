<template>
    <div class="mt-5 container-fluid">
        <div class="mb-5">
            <h2>Sırada menüyü oluşturalım</h2>
            <hr>
            <div class="pb-4">
                <Category v-for="index in categoryCount" :key="index" :index="index" @addCategory="addCategory($event)"/>
            </div>
            <div class="d-flex justify-content-between mx-2">
                <button type="button" id="new-category-button" class="btn btn-primary" @click.prevent="newCategory" :disabled="isInvalid"><fa class="mr-2" :icon="['fas', 'plus']"/> Yeni kategori</button>
                <button type="button" class="pull-right btn btn-success" :disabled="isInvalid" @click.prevent="save">Kaydet</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Category from '@/components/Step/category'
    export default {
        components: {
            Category
        },
        data() {
            return {
                categories: [],
                categoryCount: 1,
                isInvalid: true
                } 
        },
        methods: {
            newCategory() {
                this.categoryCount++
                this.isInvalid = true
            },
            addCategory(data) {
                this.isInvalid = data.invalid
                console.log(data)
                this.categories = this.categories.filter(tab => {
                    return data.category.key !== tab.key
                });
                if (data.category.name !== null && data.category.products !== null) {
                    this.categories.push(data.category)
                    this.categories.sort((a, b) => {
                        return a.key - b.key
                    })
                }
            },
            save(){
                this.$store.dispatch("saveStepThree",this.categories)
                    .then(response => {
                        if (response.status) {
                            this.$router.push("/")
                        }
                    })
            }
        },
    }
</script>

<style scoped>
    
</style>