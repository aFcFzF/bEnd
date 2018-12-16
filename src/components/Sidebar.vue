<template>
    <Menu
        ref="leftMenu"
        class="menu"
        width="188"
        :theme="theme"
        :active-name="activeName"
        :open-names="[openTag]"
        accordion
    >
        <Submenu name="home">
            <template slot="title">
                <router-link :to="{name: 'home'}">
                    <img class="icon" src="../assets/img/home.png">
                    <span>首页</span>
                </router-link>
            </template>
        </Submenu>
        <Submenu :name="index + 1" v-for="(item, index) in menuList" :key="index">
            <template slot="title">
                <!-- <img class="icon" :src="item.avatar" > -->
                <router-link v-if="item.routerName" :to="{name: item.routerName}">
                    <img class="icon" src="../assets/img/logo.png">
                    <span>{{item.name}}</span>
                </router-link>
                <p v-else>
                    <img class="icon" src="../assets/img/logo.png">
                    <span>{{item.name}}</span>
                </p>
            </template>
            <div v-if="item.list">
                <MenuItem :name="subItem.routerName" v-for="(subItem, i) in item.list" :key="'subitem' + i">
                    <router-link v-if="subItem.routerName" :to="{name: subItem.routerName}">
                        {{subItem.name}}
                    </router-link>
                </MenuItem>
            </div>
        </Submenu>

        <Submenu name="settings">
            <template slot="title">
                <router-link :to="{name: 'setting'}">
                    <img class="icon" src="../assets/img/setting.png">
                    <span>设置</span>
                </router-link>
            </template>
        </Submenu>

        <Submenu name="pluginlist">
            <template slot="title">
                <router-link :to="{name: 'pluginlist'}">
                    <Button class="menu-add-btn" icon="plus">
                        添加插件
                    </Button>
                </router-link>
            </template>
        </Submenu>
    </Menu>
</template>
<script>
/**
 * @file Sidebar.vue 边栏，树形菜单
 * @author bEnd
*/
import {mapState} from 'vuex';

export default {
    name: 'Sidebar',
    data() {
        return {
            theme: 'light'
        };
    },
    computed: {
        ...mapState({
            menuList: state => state.Menu.menuList
        }),
        activeName() {
            return this.$route.name;
        },
        openTag() {
            return this.openNames || this.activeName;
        }
    }
};

</script>

<style lang="stylus" scoped>
.menu
    .menu-add-btn
        width 100%

    >>>.du-menu-submenu-title
        display flex

        a
            flex 1
            color #333

        .router-link-exact-active
            color #457eff
</style>

