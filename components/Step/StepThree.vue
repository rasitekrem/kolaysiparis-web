<template>
    <div class="mt-5 container-fluid">
        <div class="mb-5">
            <h2>Sırada menüyü oluşturalım</h2>
            <hr>
            <div class="pb-4">
                <Category />
            </div>
            <div class="d-flex justify-content-between mx-2">
                <button type="button" id="new-category-button" class="btn btn-primary"><fa class="mr-2" :icon="['fas', 'plus']" /> Yeni kategori</button>
                <button type="button" class="pull-right btn btn-success">Kaydet</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Category from '@/components/Step/category'
    export default {
        components: {
            Category
        }
    }
</script>

<style scoped>
    
</style>