<template>
    <div class="pluginDetail" v-if="pluginsData">
        <PageTitle title="添加插件">
            <Breadcrumb>
                <BreadcrumbItem to="/pluginlist">插件管理中心</BreadcrumbItem>
                <BreadcrumbItem>{{pluginsData.name}}</BreadcrumbItem>
            </Breadcrumb>
        </PageTitle>
        <div class="pagebox">
            <div class="header">
                <div class="info">
                    <img class="iconbg" :src="pluginsData.avatar"/>
                    <span class="title">{{pluginsData.name}}</span>
                    <span>
                        <span v-if="pluginsData.isAdd === 1" class="status">已添加</span>
                        <span v-else class="status">未添加</span>
                    </span>

                </div>
                <div class="btn">
                    <template v-if="+pluginsData.enableAdd">
                        <Button v-if="+pluginsData.isAdd === 1"
                            @click="onUnstall()">
                            取消添加
                        </Button>
                        <Button v-else type="primary" @click="onInstall()">添加功能</Button>
                    </template>

                    <Button v-else disabled type="disabled">暂无权限</Button>
                </div>
            </div>

            <dl class="main">
                <dt class="tit">申请条件</dt>
                <dd class="content">
                    <p v-for="(item, index) in pluginsData.relApplies" :key="'relApplies' + index">
                        {{item.desc}}
                    </p>
                    <p v-if="!pluginsData.relApplies || pluginsData.relApplies.length < 1">暂无</p>
                </dd>

                <dt class="tit">功能介绍</dt>
                <dd class="content">
                    {{pluginsData.introduction || '暂无'}}
                </dd>

                <dt class="tit">声明</dt>
                <dd class="content">{{pluginsData.statement || '暂无'}}</dd>
            </dl>
        </div>
    </div>
</template>

<script>
/**
 * @file PluginDetail.vue
 * @desc 组件详情
 * @author bEnd
*/

import {mapActions} from 'vuex';

export default {
    name: 'PluginDetail',
    data() {
        this.getPluginList();
        return {
            pluginsData: null
        };
    },
    computed: {
        canInstall() {
            // 没有依赖的插件或者依赖的插件已经全部安装
            const relPlugins = this.pluginsData.relPlugins;
            if (!relPlugins.length) {
                return true;
            }
            return relPlugins.every(plugin => Number(plugin.isAdd) === 1);
        }
    },
    methods: {
        ...mapActions({
            updateMenu: 'Menu/updateMenu'
        }),
        onInstall() {
            // 调用安装钩子
            this.bEnd.onInstall(this.pluginsData.routerName).then(() => {
                this.$http.post('/plugin/add', {
                    pluginId: this.pluginsData.pluginId
                }).then(res => {
                    if (res.data.code === 0) {
                        this.updateMenu({
                            routerName: this.pluginsData.routerName,
                            type: 'add',
                            pluginId: this.pluginsData.pluginId
                        });
                        this.getPluginList('add');
                    }
                    else {
                        this.$Message.error('数据请求错误');
                    }
                }).catch(err => {
                    this.$Message.error('服务请求异常');
                });
            });
        },
        onUnstall() {
            this.$http.post('/plugin/del', {
                pluginId: this.pluginsData.pluginId,
                routerName: this.pluginsData.routerName
            }).then(res => {
                if (res.data.code === 0) {
                    this.updateMenu({
                        routerName: this.pluginsData.routerName,
                        type: 'del',
                        pluginId: this.pluginsData.pluginId
                    });
                    this.getPluginList('del');
                }
                else {
                    this.$Message.error('数据请求错误');
                }
            }).catch(err => {
                this.$Message.error('服务请求异常');
            });
        },
        getPluginList(type) {
            this.$http.post('/plugin/info?type=' + type, {
                pluginId: this.$route.query.id
            }).then(res => {
                if (res.data.code === 0) {
                    this.pluginsData = res.data.data;
                }
                else {
                    this.$Message.error('数据请求错误');
                }
            }).catch(err => {
                this.$Message.error('服务请求异常');
            });
        }
    }
};

</script>

<style scoped lang="stylus">
.pluginDetail

    .header
        display flex
        margin-bottom 30px
        height 76px
        padding 20px 16px
        justify-content space-between
        align-items center
        background-color #F9F9F9
        border-radius 4px

        .info
            display flex
            justify-content flex-start
            align-items center

            .iconbg
                // background-color #B3BFC7
                size 40px
                margin-right 16px
                display inline-block
                vertical-align top

            .title
                font-size 16px
                color #333
                position relative
                margin-right 16px
                line-height 2
                font-weight 700

                &:after
                    content ''
                    absolute right -9px top 8px
                    width 1px
                    background-color #eee
                    height 18px

            .status
                color #999
                font-size 14px
                line-height 3.4

        // 调整按钮样式
        .btn
            text-align right
            line-height 39px

            .du-btn
                border-color #457eff
                color #457eff
                background-color transparent

                &:hover
                    background-color #c4d5fa
                    border-color #457eff

                &.du-btn-primary
                    color #fff
                    background-color #457eff

                    &:hover
                        background-color #235ddc

                &.du-btn-disabled
                    border-color #d7d7d7
                    color #9d9d9d
                    background-color #e9e9e9

    .main
        margin-bottom -34px

        .tit
            font-weight 700
            font-size 16px
            color #333
            line-height 1
            position relative
            padding 0 0 9px 12px

            &:before
                width 4px
                height 16px
                background #457EFF
                absolute left 2px top -1px
                content ''

        .content
            padding 0 0 30px 10px
            font-size 14px
            color #333
            line-height 2

            .auth-url
                position relative
                margin-left 10px
                padding-left 10px

                &:before
                    content ''
                    absolute left 0 top 4px
                    size 1px 12px
                    background #eee

            ul, ol
                padding-left 18px
                li
                    padding-left 18px

                    &:before
                        content ''
</style>