<template>
    <div class="pluginlist">
        <PageTitle title="功能管理中心"></PageTitle>

        <div class="pagebox">
            <div class="plugin-container" v-for="(plugin, idx) in pluginlist" :key="idx">
                <template v-for="item in plugin">
                    <router-link
                        :to="{name: 'plugindetail', query: {id: item.pluginId}}"
                        :key="item.pluginId"
                        class="plugin pageshadow"
                    >
                        <div>
                            <img class="plugin-avatar" :src="item.avatar">

                            <div class="plugin-content">
                                <div class="plugin-content-title">
                                    {{item.name}}
                                    <div class="plugin-status-add" v-if="item.isAdd"><span class="added-icon"></span>已添加</div>
                                </div>

                                <div class="plugin-content-desc">{{item.desc}}</div>
                            </div>
                        </div>

                        <div class="apply">
                            <p>
                                <span class="tit">申请条件</span>
                                <span class="con" v-if="item.enableAdd === 0">（未满足）</span>
                                <span class="detail">查看详情</span>
                            </p>
                            <ul class="conlist">
                                <li v-for="(subItem, index) in item.relApplies" :key="'subItem' + index">{{subItem.desc}}</li>
                                <li v-if="!item.relApplies || item.relApplies.length < 1">暂无</li>
                            </ul>
                        </div>
                    </router-link>
                </template>
            </div>
            <Page v-if="pluginsData.total>pluginsData.ps" :total="pluginsData.total" @on-change="changePage" show-total :page-size="pluginsData.ps"></Page>
        </div>
    </div>
</template>

<script>
/**
 * @file PluginList 插件市场
 * @author bEnd
*/
import Util from '../../utils/util';

const API_LIST = '/plugin/list';
export default {
    name: 'pluginlist',
    data() {
        return {
            pluginsData: {
                total: 0,
                ps: 0,
                pn: 0
            },
            pluginlist: []
        };
    },
    methods: {
        changePage(page) {
            this.$http.post(API_LIST, {
                ps: 14,
                pn: page
            }).then(res => {
                if (res.data.code === 0) {
                    let list = Util.chunk(res.data.data.list, 2);

                    this.pluginsData = res.data.data;
                    this.pluginlist = list;
                }
                else {
                    this.$Message.error('数据请求错误');
                }
            }).catch(err => {
                this.$Message.error('服务请求异常');
            });
        }
    },
    created() {
        this.changePage(1);
    }
};

</script>

<style scoped lang="stylus">
.pluginlist

    .plugin-container
        clearfix()

    .plugin
        float left
        box-sizing border-box
        size 440px 120px
        padding 24px
        margin-bottom 15px
        position relative
        clearfix()

        &:nth-child(2n)
            margin-left 10px

        &-avatar
            size 40px
            display inline-block
            margin-right 14px
            vertical-align top

        &-content
            position relative
            top 3px
            display inline-block
            width 298px
            color #333

            .plugin-status-add
                position absolute
                margin-left 12px
                top -3px
                display inline-block
                font-size 12px
                background rgba(99, 206, 129, .1)
                border 1px solid rgba(99, 206, 129, .2)
                border-radius 100px
                padding 2px 6px 2px 25px

                .added-icon
                    position absolute
                    left 4px
                    size 16px
                    background url(./i-added@2x.png) 0 0 no-repeat
                    background-size contain

            &-title
                margin-bottom 12px
                font-size 16px
                line-height 16px
                width 180px
                color #333
                font-weight 700
                overflow ellipsis

            &-desc
                color #999
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                overflow hidden
                line-height 1.6

        .apply
            absolute top 0 left 0
            size 440px 120px
            padding 24px
            font-size 14px
            background-color #fff
            opacity 0
            transition opacity 0.3s ease-in-out

            &:hover
                opacity 1

            .tit
                color #333
                font-weight 700

            .con
                color #FF0000

            .con, .tit
                font-size 16px
                line-height 1

            .detail
                float right
                color #457Eff

                &:hover
                    color #1D59E0
            
            .conlist
                margin-top 10px
                line-height 1.6
                color #999

                li
                    position relative
                    padding-left 10px

                    &:before
                        content ''
                        size 4px
                        background-color #999
                        absolute left 0 top 9px
                        border-radius 100%

    >>>.du-page
        text-align right
        margin-top 32px
            
</style>

