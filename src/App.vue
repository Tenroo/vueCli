<template>
    <div id="test">
        <!-- {{ msg }} -->
        <Header></Header>
    </div>
</template>
 
<script>
import Header from "./head/index.vue"
export default {
    data() {
        return {
            msg: 'hello vue+webpack'
        }
    },
    components: {
        Header
    }
}
</script>
 
<style>
#test{
    color: aqua;
}
</style>
 
