<template>
<tbody>
    <tr>
        <td style="vertical-align: middle;"><button @click="isShow = !isShow" type="button" class="px-0 py-0 btn btn-link">{{ personal.username }}</button></td>
        <td class="text-right" style="vertical-align: middle;"><span>****</span></td>
        <td class="text-right" style="vertical-align: middle;"><label class="switch switch-icon switch-pill switch-success switch-lg  form-control-label"><input type="checkbox" class="switch-input form-check-input" checked=""><span class="switch-label" data-on="" data-off=""></span><span class="switch-handle"></span></label></td>
    </tr>
    <Detail v-if="isShow" :personal="personal"/>
    
</tbody>
</template>

<script>
import Detail from '@/components/Personal/Detail'
export default {
    props:{
        personal: Object
    },
    data() {
        return {
            isShow: false
        }
    },
    components: {
        Detail
    }
}
</script>

<style scoped>

</style>
