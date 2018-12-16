/**
 * @file proxy.js
 * @author bEnd
 */

module.exports = {
    hosts: {
        test: {
            proxy: 'http://bend.com:8500',
            receiver: 'http://bend.com:8500/receiver.php',
            path: '/home/users/bend/data'
        }
    },
    use: 'test'
};
