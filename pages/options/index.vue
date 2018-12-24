<template>
    <div>
        <StepOne @submitOne="saveStepOne($event)" v-if="step == 1" />
        <StepTwo v-if="step == 2" />
        <StepThree v-if="step == 3" />
    </div>
</template>

<script>
    import StepOne  from '@/components/Step/StepOne';
    import StepTwo from '@/components/Step/StepTwo';
    import StepThree from '@/components/Step/StepThree';
    export default {
        layout: 'options',
        components: {
            StepOne,
            StepTwo,
            StepThree
        },
        data() {
            return {
                step: 1
            }
        },
        methods : {
            saveStepOne(post) {
                this.$store.dispatch("saveStepOne",post)
                    .then(response => {
                        if(response.status) {
                            this.step++;
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    
</style>