<template>
    <td class="d-flex justify-content-between bg-success">
        <span>
                {{product.name}} <span class="font-weight-bold" ><span> x {{product.count}}</span></span>
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
            },
            clean: Boolean
        },
    }
</script>

<style scoped>
    
</style>