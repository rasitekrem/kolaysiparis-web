<template>
    <div class="mb-0 card">
                    <div class="card-header">
                        <div class="input-group">
                            <input placeholder="Kategori Adı (örn: Başlangıçlar)" type="text" class="form-control">
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
                            <Product />
                            <button type="button" class="mt-2 btn btn-secondary"><fa class="mr-2" :icon="['fas', 'plus']" /> Ürün ekle</button></div>
                </div>
</template>

<script>
    import Product from '@/components/Step/product'
    export default {
        components : {
            Product
        }
    }
</script>

<style scoped>

</style>