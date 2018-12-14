<template>
    <h3 @click="setItem">{{ title }}</h3>
</template>

<script>
export default {
    data() {
        return {
            title: "Hello World"
        }
    },
    methods: {
        setItem() {
            window.localStorage.setItem("a", null)
            var a = window.localStorage.getItem("a")
            console.log(typeof(a))
        }
    }
}
</script>

<style>
    h3 {
        margin-top: 0px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: pink;
    }
</style>

