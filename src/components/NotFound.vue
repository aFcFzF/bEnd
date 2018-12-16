<template>
    <div class="error">
        <h1 class="error-title">
            出错啦
        </h1>
        <div class="error-text">
            {{msgText}}
        </div>
    </div>
</template>

<script>
/**
 * @file NotFound 错误页
 * @author bEnd
*/
export default {
    name: 'NotFound',
    props: {
        msg: ''
    },
    computed: {
        msgText() {
            let msg = '你所访问的页面不存在，或你暂时没有相关的操作权限.';
            return this.$route.query.msg || this.msg || msg;
        }
    }
};

</script>

<style scoped lang="stylus">
.error
    margin auto
    color #999

    .error-text,
    .error-title
        text-align center

    .error-title
        margin-top 200px
        color #666
</style>
