<template>
<div class="modal" :class="modelClass">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Sipariş Notu</h5>
                <button type="button" class="close" @click.prevent="close">
          <span aria-modal="true">&times;</span>
        </button>
            </div>
            <div class="modal-body">
               <textarea class="form-control" rows="3" v-model="note"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="save()">Kaydet</button>
                <button type="button" class="btn btn-secondary" @click.prevent="close">Kapat</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
        note: {
            type: String,
            default : ''
        },
        table: {
            type: String,
            required: true
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        save() {
            this.$store.dispatch('saveCartNote',{ note : this.note,table: this.table })
            this.$emit('close')
        }
    },
    computed: {
        modelClass() {
            if (this.isOpen) {
                return "show d-block"
            } else {
                return "fade d-none"
            }
        }
    },
}
</script>

<style scoped>

</style>
