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
        <div class="row justify-content-center">
            <Desk v-for="index in 30" :index="index" :key="index" />
        </div>
    </div>
</template>

<script>
    import Desk from '@/components/Cash/desk'
    export default {
        components: {
            Desk
        }
    }
</script>

<style scoped>
    
</style>