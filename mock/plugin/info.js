/**
 * @file info.js 异步插件详情
 * @desc api plugin detail
 * @author bEnd
 */

module.exports = function (req, res, next) {
    let result = {
        code: 0,
        msg: 'success',
        fallback: false,
        data: {
            pluginId: 6,
            routerName: 'example',
            name: '插件名称',
            desc: 'bEnd解决方案，让B端平台用户降低理解成本，简化操作步骤，缩短跳转流程，从而快捷、方便、个性、定制化地享受线上运营服务',
            introduction: 'bEnd解决方案，让B端平台用户降低理解成本，简化操作步骤，缩短跳转流程，从而快捷、方便、个性、定制化地享受线上运营服务',
            statement: '请勿使用模板发送色情低俗、暴力血腥、政治谣言等各类违反法律法规及相关政策规定的信息',
            avatar: 'http://www.ld12.com/upimg358/allimg/c150617/143452O0515030-31O50.jpg',
            isAdd: 1,
            enableAdd: 1,
            relPlugins: [{id: '1', desc: '依赖info插件'}],
            relApplies: [{
                id: '1',
                desc: '完成bEnd认证'
            },
            {
                id: '2',
                desc: '注册bEnd高级认证用户'
            }]
        }
    };
    if (req.query.type === 'del') {
        result.data.isAdd = 0;
        return result;
    }
    return result;
};
