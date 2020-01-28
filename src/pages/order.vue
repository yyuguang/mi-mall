<template>
    <div>
        <router-view></router-view>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavFooter from "../components/nav-footer";
    import ServiceBar from "../components/service-bar";

    export default {
        name: "order",
        components: {
            ServiceBar,
            NavFooter
        },
        data() {
            return {
                title: '',
                tip: ''
            }
        }
    }
</script>

<style scoped>

</style>