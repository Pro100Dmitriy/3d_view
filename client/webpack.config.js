const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


module.exports = {
    mode: 'production', // development - production
    devtool: 'inline-source-map',
    entry : {
        app: './assets/js/app'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot: true,
        static: './dist/',
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