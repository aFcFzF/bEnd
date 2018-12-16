<template>
    <div class="app-main">
        <layout-Header v-if="layout.header"></layout-Header>
        <div class="wrapper">
            <layout-Sidebar class="sidebar"></layout-Sidebar>
            <div id="container" class="container">
                <router-view class="main"></router-view>
                <layout-Footer v-if="layout.footer"></layout-Footer>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * @file app入口
 * @author bEnd
 * @update 2018-09-17
*/
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import {mapState} from 'vuex';

// 登录形式的页面，此类页面有特殊样式
export default {
    name: 'app',
    components: {
        'layout-Header': Header,
        'layout-Footer': Footer,
        'layout-Sidebar': Sidebar
    },
    computed: {
        ...mapState({
            layout: state => state.layout
        })
    }
};
</script>

<style scoped lang="stylus">
.app-main
    position relative
    height 100%

    .wrapper
        display flex
        size 100% 100%
        margin 0 auto
        overflow hidden

        // 对左侧菜单reset
        .sidebar
            size 210px auto
            background inherit
            overflow-y auto
            margin-top 80px
            box-sizing border-box
            padding 25px

        .container
            flex 1
            margin-top 80px
            box-sizing border-box
            padding 24px
            overflow-y auto

            .main
                min-height 500px
                clearfix()

        .select
            width 100%
            margin 80px 0

        .autofit
            width 100%
            margin 0 auto

    .autofit
       width 100%
       margin 0 auto
 
    .wrapper-login
        min-width 1200px
        background #fff
        overflow-x hidden

        .container
            text-align center
            margin-bottom 10px

</style>
