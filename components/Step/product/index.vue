<template>
    <div style="border-top: 1px solid rgb(204, 204, 204);">
        <div class="py-2 row">
            <div class="col"><input placeholder="Ürün Adı" type="text" class="form-control" value=""></div>
            <div class="col">
                <div class="input-group">
                    <div class="input-group">
                        <input placeholder="fiyat" pattern="[0-9]*" inputmode="numeric" type="number" class="text-right undefined form-control" value="0.00">
                        <div class="input-group-addon form-control col-sm-1">₺</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style scoped>
    
</style>