const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const MODE = 'production' // production - development

let outputpath
if( MODE === 'development' ){
    outputpath = path.resolve(__dirname, 'dist/dev')
}else{
    outputpath = path.resolve(__dirname, 'dist/prod')
}


module.exports = {
    mode: MODE,
    devtool: 'inline-source-map',
    entry : {
        app: './assets/js/app'
    },
    output: {
        filename: '[name].js',
        path: outputpath
    },
    devServer: {
        hot: true,
        static: './dist/dev',
        liveReload: true,
        port: '1234',
        watchFiles: ['./**/*'],
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                secure: false
            }
        },
        // static: {
        //     directory: path.join(__dirname, './assets/models')
        // }
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
        noParse: [require.resolve('typescript/lib/typescript.js')]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' })
    ]
}