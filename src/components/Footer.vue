<template>
    <div class="footer">
        <div class="main">
            <p class="line">
                &copy;{{new Date().getFullYear()}} bEnd
            </p>
        </div>
    </div>
</template>

<script>
/**
 * @file footer
 * @author bEnd
*/

export default {
    name: 'Footer'
};

</script>

<style scoped lang="stylus">
.footer
    margin-top 60px
    height 81px

    .main
        font-size 14px
        color #999
        line-height 2
        opacity 0.65

        .line
            border-top 1px solid rgba(151, 151, 151, .19)

</style>
