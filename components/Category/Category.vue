<template>
    <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action" @click="$emit('category',category.name)" style="cursor: pointer;"> 
                    <p class="p-0 m-0 w-100 d-flex align-items-center">
                        <span>{{category.name}}</span>
                    </p>
                   <fa class="mr-2" :icon="['fas', 'angle-down']"/>
                </li>
</template>

<script>
    export default {
        props: {
            category : {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    
</style>