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
                alert();
            }
        },
        props: ['index','table'],
        computed: {
            cardClass () {
                let mod = this.index % 4;
                switch (mod) {
                    case 0:
                        return ['bg-info','text-light']
                        break;
                    case 1:
                        return ['bg-warning','text-light']
                        break;
                    case 2:
                        return ['bg-light','text-dark']
                        break
                    case 3:
                        return ['bg-danger','text-light']
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