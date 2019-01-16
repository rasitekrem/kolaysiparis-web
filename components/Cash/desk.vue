<template>
    <div @click="clicked" class="card col-sm-2 mx-2 my-2 py-3 text-center" :class="cardClass">
        <div class="card-body">
            <div class="card-text">{{ table }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            clicked(){
                this.$emit("clicked",this.table)
            }
        },
        props: ['index','table','status'],
        computed: {
            cardClass () {
                switch (this.status) {
                    case 'Sipariş Teslim Edildi':
                        return ['bg-info','text-light']
                        break;
                    case 'Sipariş Hazırlanıyor':
                        return ['bg-danger','text-light']
                        break;
                    case 'Sipariş Yok':
                        return ['bg-light','text-dark']
                        break
                    case 'Sipariş Hazır':
                        return ['bg-warning','text-light']
                        break;                 
                    default:
                        break;
                }
            }
        }
    }
</script>

<style scoped>

.card:hover {
    cursor: pointer;
}
</style>