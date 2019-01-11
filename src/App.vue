<template>
    <div id="app">
        <!-- {{ msg }} -->
        <!-- <Header></Header> -->
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>
 
<script>
import Header from "./todo/header.vue"
import Todo from "./todo/todo.vue"

import Footer from "./todo/footer.jsx"
export default {
    data() {
        return {
            msg: 'hello vue+webpack'
        }
    },
    components: {
        Header,
        Footer,
        Todo
    }
}
</script>
    
<style lang="stylus" scoped>
#app{
    position absolute
    left 0px
    top 0px
    right 0px
    bottom 0px
}
#cover{
    position absolute
    left 0px
    top 0px
    right 0px
    bottom 0px
    background #999
    opacity 0.9
    z-index -1
}
</style>
 
