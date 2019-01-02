<template>
    <div class="container-fluid mr-0 mt-5 col-md-10 ">
        <div class="d-flex justify-content-between mb-3 mt-2">
            <h1 class="text-center">Kasa</h1>
            <div class="pull-right mr-0 text-right d-sm-down-none small">servis edildi&nbsp;
                <div class="bg-info" style="display: inline;">&nbsp;&nbsp;&nbsp;</div><br>siparişleri mutfakta hazır&nbsp;
                <div class="bg-warning" style="display: inline;">&nbsp;&nbsp;&nbsp;</div><br>sipariş bekliyor&nbsp;
                <div class="bg-danger" style="display: inline;">&nbsp;&nbsp;&nbsp;</div><br>&nbsp;
            </div>
        </div>   
        <div class="row d-flex justify-content-start">
            
                <Desk v-for="(table,index) in tables" :table="table" :key="index" />
            
        </div>
    </div>
</template>

<script>
    import Desk from '@/components/Cash/desk'
    export default {
        components: {
            Desk
        },
        beforeCreate() {
            this.$store.dispatch("getTables")
        },
        computed: {
            tables() {
                let countArray = [];
                const tables = this.$store.getters.getTables
                console.log(tables);
                tables.forEach(table => {
                    for(let index= 1; index <= table.count; index++){
                        console.log(`${table.name} ${index}`)
                        countArray.push(`${table.name} ${index}`)
                    }
                });
                console.log(countArray)
                return countArray
            }
        }
    }
</script>

<style scoped>
    
</style>