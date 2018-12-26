<template>
    <div class="mt-5 container">
        <div class="mb-5 ">
            <h2 class="text-center mb-2">Şimdi masaları oluşturalım</h2>
            <hr>
            <div class="mb-5 ">
                <Table v-for="index in tables.length + 1" :key="index"/>
                <button type="button" class="mr-2 btn btn-success">Kaydet</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Table from '@/components/Step/table'
    export default {
        data() {
            return {
                tables:[]
                }
        },
        components:{
            Table
        },

    }
</script>

<style scoped>
    
</style>