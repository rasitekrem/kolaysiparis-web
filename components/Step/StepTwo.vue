<template>
    <div class="mt-5 container">
        <div class="mb-5 ">
            <h2 class="text-center mb-2">Şimdi masaları oluşturalım</h2>
            <hr>
            <div class="mb-5 ">
                <Table v-for="index in tableCount" :key="index" :index="index - 1" @addTable="add($event)" />
                <a @click.prevent="tableCount++" class="btn btn-block" v-if="tables.length == tableCount && !this.isInvalid">
                    <fa class="mr-2" :icon="['fas', 'plus']" />
                </a>
                <button @click.prevent="save" class="mr-2 btn btn-success" :disabled="this.isInvalid">Kaydet</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Table from '@/components/Step/table'
    export default {
        data() {
            return {
                tables: [],
                tableCount: 1,
                isInvalid: true
            }
        },
        components: {
            Table
        },
        methods: {
            add(data) {
                this.isInvalid = data.invalid
                this.tables = this.tables.filter(tab => {
                    return data.table.key !== tab.key
                });
                if (data.table.count !== null && data.table.name !== null) {
                    this.tables.push(data.table)
                    this.tables.sort((a, b) => {
                        return a.key - b.key
                    })
                }
            },
            save(){
                if (!this.isInvalid) {
                    this.$emit("submitTwo",this.tables)
                }
            }
        },
    }
</script>

<style scoped>
    
</style>