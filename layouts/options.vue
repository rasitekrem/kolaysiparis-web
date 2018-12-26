<template>
<div>
    <Header />
    <nuxt />
</div>
</template>

<script>
    import Header from '@/components/Admin/Header';
    export default {
    middleware: ["session-control","auth","checkstep"],
    components: {
      Header,
    }
  }
</script>

<style scoped>

</style>