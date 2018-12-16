<template>
    <div class="header">
        <router-link class="logo" to="{name: 'home'}">
            <img class="icon" src="../assets/img/bend.png">
        </router-link>

        <div class="user">
            <div class="avatar">
                <img :src="userInfo.avatar" width="32" height="32">
            </div>
            <div class="name">
                {{userInfo.name}}
            </div>
        </div>
    </div>
</template>

<script>
/**
 * @file bEnd header
 * @author bEnd
*/

import {mapState} from 'vuex';

export default {
    name: 'Header',
    computed: {
        ...mapState({
            userInfo: state => state.Account.userInfo
        })
    }
};
</script>

<style scoped lang="stylus">
.header
    position relative
    size 100% 72px
    line-height 72px
    padding 0 32px
    background-color #fff
    box-shadow 0 0 33px 0 rgba(108, 108, 108, .04)
    clearfix()
    fixed left 0 top 0
    z-index 100

    .logo        
        .icon
            width 150px
            vertical-align middle

    .user
        display flex
        float right
        margin-top 15px

        .avatar
            display inline-block
            size 40px
            vertical-align middle
            margin-right 10px

            img
                min-width 100%
                min-height 100%
                border-radius 50%

        .name
            display flex
            justify-content center
            flex-direction column
            align-items flex-start
            font-size 14px
            color #333
            line-height 14px
</style>
