<template>
    <td class="d-flex justify-content-between">
        <span>
            {{product.name}} <span class="font-weight-bold"><span> x {{product.count}}</span></span>
        </span>
        <span>{{product.totalPrice}} ₺</span>
    </td>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    
</style>