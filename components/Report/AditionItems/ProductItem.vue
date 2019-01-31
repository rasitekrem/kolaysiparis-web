<template>
<tr>
    <td>{{ productName }}  </td>
    <td class="text-right"><span>{{ productItem.totalPrice }} ₺</span></td>
</tr>
</template>

<script>
export default {
    props: {
        productItem: Object
    },
    computed: {
        productName() {
            if(this.productItem.count > 1) {
                return `${ this.productItem.name } x ${ this.productItem.count }`
            } else {
                return this.productItem.name
            }
        }
    },
}
</script>

<style scoped>

</style>
