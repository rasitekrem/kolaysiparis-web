<template>
    <div class="card mx-2 my-1 col-sm-3" :class="additionClass" style="max-width: 20rem;">
        <div class="card-header text-light">
            <h3 class="card-title">{{ addition.tableInfo }}</h3>
        </div>
        <div class="card-body">
            <div class="card-subtitle text-light">{{ addition.status }}</div>
            <ul class="list-group list-group-flush d-flex justify-content-center">
                <li class="list-group-item card-text bg-light" v-for="(product,index) in addition.products" :key="index">{{ product.name }} <strong v-if="product.count>1">x{{product.count}}</strong></li>
            </ul>
        </div>
        <div class="card-footer d-flex justify-content-center">
            <button @click="toReady" class="btn btn-warning btn-block" v-if="!isReady">Hazır</button>
            <button class="btn btn-info  btn-block" v-else>Servis Edildi</button>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: ['order'],
        data() {
            return {
                isReady: false
            }
        },
        props: {
            addition: {
                tableInfo: {
                    type: String,
                    required: true
                },
                products: {
                    type: Array,
                    required: true
                },
                status: {
                    type: String,
                    required: true
                },
                additionId: {
                    type: String,
                    required: true
                }
            }
        },
        computed: {
            additionClass () {
                if (this.addition.status === "Sipariş Verildi") {
                    return ['bg-danger','text-danger']
                } else {
                    return ['bg-warning','text-warning']
                }
            }
        },
        methods: {
            toReady() {
                this.isReady = true;
                this.addition.status = "Sipariş Hazır"
            }
        }
    }
</script>
