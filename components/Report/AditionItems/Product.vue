<template>
<tbody>
    <tr :class="tableClass" @click.prevent="isShow = !isShow">
        <td style="vertical-align: middle;">
            <div class="px-0 py-0" :class="countClass">{{ +$vnode.key + 1  }}</div>
        </td>
        <td style="vertical-align: middle; white-space: nowrap;">{{ adition.table }}</td>
        <td class="text-left" style="vertical-align: middle; white-space: nowrap;">{{ time }}</td>
        <td class="text-right" style="vertical-align: middle; white-space: nowrap;"><span>{{ adition.totalPrice }} ₺</span></td>
    </tr>
    <tr v-if="isShow">
        <td colspan="3">
            <div>
                <div>
                    <div>
                        <div class="mb-1"></div>
                        <div style="border: 1px solid rgb(204, 204, 204);">
                            <table class="mb-0 table" style="background: rgb(255, 255, 255);">
                                <tbody>
                                    <ProductItem v-for="(product,index) in adition.products" :key="index" :productItem="product" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</tbody>
</template>

<script>
import ProductItem from '@/components/Report/AditionItems/ProductItem'
export default {
    data() {
        return {
            isShow: false
        }
    },
    props: {
        adition: Object
    },
    components: {
        ProductItem
    },
    computed: {
        tableClass() {
            if (this.isShow) {
                return 'table-info'
            } else {
                return 'table-light'
            }
        },
        countClass() {
            if (!this.isShow) {
                return 'text-info'
            } else {
                return 'text-light'
            }
        },
        time() {
            let hour = new Date(this.adition.date).getHours()
            let minute = new Date(this.adition.date).getMinutes()
            if (hour < 10) {
                hour = '0' + hour
            }
            if (minute < 10) {
                minute = '0' + minute
            }
            return (hour + ':' + minute)
        }

    },
}
</script>

<style scoped>

</style>
