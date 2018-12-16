/**
 * @desc 自增util
 * @file util.js
 * @author bEnd
 */

let Util = {};

// 字符串长度计算，一个中文占两个字节
function getStrLength(str) {
    if (!str) {
        return 0;
    }

    let cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
}

// 字符串截取
function subStr(str = '', len) {
    if (!len) {
        return str;
    }

    let r = /[^\x00-\xff]/g;
    if (str.replace(r, 'mm').length <= len) {
        return str;
    }

    let m = Math.floor(len / 2);
    for (let i = m; i < str.length; i++) {
        if (str.substr(0, i).replace(r, 'mm').length >= len) {
            return str.substr(0, i);
        }
    }
    return str;
}

// 数据分组
function chunk(arr, size) {
    let result = [];

    size = window.parseInt(size) || 2;

    for (let x = 0; x < Math.ceil(arr.length / size); x++) {
        let start = x * size;
        let end = start + size;

        result.push(arr.slice(start, end));
    }

    return result;
}


/**
 * 检测url是否是一个合法链接
 *
 * @param {string} url 网址连接
 * @return {bollean} url是否合法
 */
function isValidUrl(url) {
    if (!url || !url.trim()) {
        return false;
    }
    const reg = /(http|https):\/\/[\w-_]+(\.[\w-_]+)+([\w-\.,@?^=%&:/~\+#]*[\w-@?^=%&/~\+#])?/;
    return reg.test(url);
}

Util = {
    getStrLength,
    subStr,
    chunk,
    isValidUrl
};

export default Util;
