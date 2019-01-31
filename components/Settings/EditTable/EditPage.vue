<template>
<div class="mb-5 ">
    <Table v-for="(table,index) in tables" :key="index" :index="index" :table="table" @addTable="add($event)" @remove="remove($event)" />
    <a @click.prevent="tables.push({ name :null, count : null})" class="btn btn-block" v-if="tables.length == tableCount && !this.isInvalid">
                    <fa class="mr-2" :icon="['fas', 'plus']" />
                </a>
    <button @click.prevent="save" class="mr-2 btn btn-success" :disabled="this.isInvalid">Kaydet</button>
</div>
</template>

<script>
import Table from '@/components/Settings/EditTable/Table'
export default {
    props: {
        tables: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            tableCount: this.tables.length,
            isInvalid: false
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
                this.tables[data.index] = (data.table)
                this.tables.sort((a, b) => {
                    return a.key - b.key
                })
                console.log(this.tableCount)
                this.tableCount = this.tables.length
                console.log(this.tableCount)

            }
        },
        save() {
            if (!this.isInvalid) {
                this.$emit("updateTables", this.tables)
            }
        },
        remove(index) {
            this.tables.splice(index, 1);
            this.tableCount = this.tables.length
            console.log(this.tables)
        }
    },
}
</script>

<style scoped>

</style>
