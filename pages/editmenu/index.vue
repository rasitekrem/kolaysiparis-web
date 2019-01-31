<template>
<div class="container mr-0 mt-5 col-md-10 h-100" v-if="isAuthority === 'Admin'">
    <div class="mb-5">
        <h2>Menüyü Düzenle</h2>
        <hr>
        <Warning v-if="getHistories" />
        <div v-else>
            <div class="pb-4">
                <Category v-for="(category,index) in categories" :key="index" :category="category" @addCategory="addCategory($event)" @removeCategory="remove($event)" />
            </div>
            <div class="d-flex justify-content-between mx-2">
                <button type="button" id="new-category-button" class="btn btn-primary" @click.prevent="newCategory" :disabled="isInvalid"><fa class="mr-2" :icon="['fas', 'plus']"/> Yeni kategori</button>
                <button type="button" class="pull-right btn btn-success" :disabled="isInvalid" @click.prevent="save">Kaydet</button>
            </div>
            <div class="d-flex justify-content-end mt-2" v-if="alert.show">
                <div class="alert text-success" v-if="alert.status">Başarıyla Kaydedildi..</div>
                <div class="alert text-danger" v-else>Kayıt Başarısız!</div>
            </div>
        </div>

    </div>
</div>
<div class="container-fluid mr-0 mt-5 col-md-10 " v-else>
    <NotAuth />
</div>
</template>

<script>
import Category from '@/components/Settings/EditMenu/Category'
import Warning from '@/components/Settings/Warning'
import NotAuth from '@/components/Admin/NotAuth'
export default {
    components: {
        Category,
        Warning,
        NotAuth
    },
    data() {
        return {
            categories: this.$store.getters.getCategories,
            isInvalid: false,
            alert: {
                show: false,
                status: true
            }
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
                const findIndex = this.categories.findIndex(tab => data.category.key === tab.key);
                if (findIndex > -1) {
                    this.categories[findIndex] = data.category
                } else {
                    this.categories.push(data.category)
                    this.categories.sort((a, b) => {
                        return a.key - b.key
                    })
                }
            }
        },
        save() {
            this.$store.dispatch("updateCategories", this.categories)
                .then(response => {
                    console.log(response)
                    this.alert = {
                        show: true,
                        status: response
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
    },
    computed: {
        getHistories() {
            let today = this.$store.getters.getToday
            let histories = this.$store.getters.getHistory
            if (histories) {
                let historyIndex = histories.findIndex(item => item.historyDate === today)
                if (historyIndex > -1) {
                    if (histories[historyIndex].isOpen) {
                        return true
                    } else {
                        return false
                    }
                }
            } else
                return false
        },
        isAuthority() {
            return this.$store.getters.getAuthority.role
        }
    },
}
</script>

<style scoped>

</style>
