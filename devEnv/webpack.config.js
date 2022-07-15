const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        // output 설정에 따라서, 출력 파일명이 바뀜
        main: './src/app.js',
        // sub: './src/sub.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    }
}