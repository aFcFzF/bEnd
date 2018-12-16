/**
 * @file list.js 异步菜单api
 * @desc api plugin list
 * @author bEnd
 */

module.exports = function (req, res, next) {
    if (req.query.type === 'del') {
        return {
            code: 0,
            msg: 'success',
            data: {
                total: 0,
                pn: 1,
                ps: 14,
                pluginList: []
            }
        };
    }

    return {
        code: 0,
        msg: 'success',
        fallback: false,
        data: {
            total: 20,
            pn: 1,
            ps: 14,
            pluginList: [{
                categoryId: 7,
                name: '即插即用',
                avatar: 'http://www.ld12.com/upimg358/allimg/c150617/143452O0515030-31O50.jpg',
                pluginId: 4,
                routerName: 'example'
            }]
        }
    };
};
