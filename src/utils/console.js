/**
 * @file console.js
 * @author bEnd
 */
// 避免IE非调试模式下报错
if (!window.console) {
    window.console = {
        log() {},
        warn() {},
        error() {}
    };
}

const version = window.navigator.userAgent.match(/^.*?windows\s*NT\s*(\d+\.\d+).*$/i);
if (version && version[1] < '6.3') {
    let style = document.createElement('style');
    style.innerHTML = 'body{font-family: "Microsoft YaHei",seguiemj;}';
    document.head.appendChild(style);
}
export default {};
