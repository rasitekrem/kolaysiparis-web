<template>
    <div class="col-sm-6 card shadow mt-2 mx-2 py-5">
        
        <div class="d-flex justify-content-between">
            <div class="d-flex flex-column col-sm-8 my-auto">
                <h1 class="text-right py-2">{{thisPrice}} ₺</h1>
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg btn-outline-primary col py-4 mr-1" @click="addPrice(7)">7</button>
                    <button class="btn-lg btn-outline-primary col py-4 mr-1" @click="addPrice(8)">8</button>
                    <button class="btn-lg btn-outline-primary col py-4 mr-1" @click="addPrice(9)">9</button>
                </div>
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg btn-outline-primary col py-4 mr-1" @click="addPrice(4)">4</button>
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1" @click="addPrice(5)">5</button>
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1" @click="addPrice(6)">6</button>
                </div>
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1" @click="addPrice(1)">1</button>
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1" @click="addPrice(2)">2</button>
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1" @click="addPrice(3)">3</button>
                </div>
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1"  @click="clean">C</button>
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1" @click="addPrice(0)">0</button>
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1">.</button>
                </div>
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg  btn-outline-primary col py-4 mr-1" @click="price = totalPrice">TÜMÜ</button>
                </div>
            </div>
            <div class="d-flex flex-column col-sm-4 my-auto">
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg  btn-primary col py-5 mr-1" :disabled="price === '0'" @click="$emit('paid','Nakit',thisPrice)">NAKİT</button>
                </div>
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg  btn-primary col py-5 mr-1" :disabled="price === '0'" @click="$emit('paid','Kredi',thisPrice)">KREDİ</button>
                </div>
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg  btn-primary col py-5 mr-1" :disabled="price === '0'" @click="$emit('paid','Diğer',thisPrice)">DİĞER</button>
                </div>
                <div class="d-flex justify-content-center my-2">
                    <button class="btn-lg  btn-danger col py-5 mr-1" @click="closeAddition">ADİSYONU KAPAT</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                thisPrice: '0'
            }
        },
        props: {
            totalPrice: {
                type: Number
            }, 
            price : {
                type: String
            }
        },
        watch: {
            price : {
                handler(val) {
                   if(val) {
                       this.thisPrice = val
                }
                },
                deep: true,
            }
        },
        created() {
            this.thisPrice = this.price
        },
        methods: {
            addPrice(num) {
                if (this.thisPrice === "0") {
                    this.thisPrice= num
                } else {
                    this.thisPrice= `${this.thisPrice}${num}`
                }
                if (this.thisPrice > this.totalPrice) {
                    this.thisPrice = this.totalPrice
                }
            },
            clean() {
                this.thisPrice = "0"
                this.$emit('clean')
            },
            closeAddition() {
                this.$emit('closeAddition')
            }
        },
    }
</script>

<style scoped>
    
</style>