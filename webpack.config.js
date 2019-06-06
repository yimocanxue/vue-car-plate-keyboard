const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
/**
 * CSS提取，webpack3请使用extract-text-webpack-plugin
 * 为了便于开发环境热重载，务必只在生产环境才进行提取
 * 具体使用见https://github.com/webpack-contrib/mini-css-extract-plugin
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const lastCssLoader = isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader';

const webpackConfig = {
    entry: isProduction ? './src/lib/index.js' : './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: `${package.name}.js`
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
      
    },
    devtool: isProduction ? '#source-map' : '#cheap-eval-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            // 它会被应用到普通的`.js`文件以及`.vue`文件的<script>块
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => {
                    /node_modules/.test(file) && !/\.vue\.js/.test(file) && !/\.vue\.esm\.js/.test(file)
                }
            },
            // 它会被应用到普通的`.css`文件和`.vue`文件的<style>块
            {
                test: /\.css$/,
                use: [
                    lastCssLoader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 它会被应用到普通的`.sass`文件和`.vue`文件的<style lang="scss">块
            {
                test: /\.sass$/,
                use: [
                    lastCssLoader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            intentedSyntax: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        /**
         * @vue-loader V15新增
         * 这个插件是必须的，它的职责是将定义过的其它规则复制并应用到.vue文件里的相应语言快
         * 例如，如果有一条匹配/\.js$/的规则，那么它会应用的.vue文件里的<script>块
         */
        new VueLoaderPlugin()
    ],
    /**
     * webpack4+新增属性，在webpack3以及以下版本，需要使用DefinePlugin插件
     * 会将
     */
    mode: process.env.NODE_ENV    

}

const devPlugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
    })
];
const devConfig = {
    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: true,
        contentBase: false,
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true,
        clientLogLevel: 'warning',
    }
};
const prodPlugins = [
    new MiniCssExtractPlugin({
        filename: "styles.css"
    })
];
const prodConfig = {
};
webpackConfig.plugins.push(...(isProduction ? prodPlugins : devPlugins));

Object.assign(webpackConfig, isProduction ? prodConfig : devConfig);

if (isProduction) {
    webpackConfig.output.filename = 'index.js';
    webpackConfig.output.publicPath = '/dist/';
    webpackConfig.output.library = package.name;
    webpackConfig.output.libraryTarget = 'umd';
    webpackConfig.output.umdNamedDefine = true;
}


module.exports = webpackConfig