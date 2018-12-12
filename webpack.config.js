var path = require('path');  //Node JS的基本包
var VueLoaderPlugin = require('vue-loader/lib/plugin');

const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development' 
// 添加变量isDev，用于读取是否为development环境
// 我们在启动服务，读取package.json里的脚本的时候，脚本中的环境变量都是存在process.env这个对象下的。
// 比如执行npm run build的时候，读取的就是package.json中script中的"build": “cross-env NODE_ENV=production webpack --config webpack.config.js”,
// 那这里可以看到环境变量NODE_ENV的值为production，那这个值就会被存到process.env这个对象下

const config = {
    mode: 'none',
    target: 'web', //webpack的编译目标是web端的

    entry: path.join(__dirname, 'src/index.js'), // 入口文件，用绝对路径，保证我们不因为路径发生错误
    
    
    //输出文件，取名为bundle.js，路径为dist文件夹
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, 
            {
            test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            name: '[name]-aaa.[ext]'
                            // outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),//一般vue、react等框架都要用到这个插件。
		//在这里定义了，在我们的js代码中是可以引用到的。
		//现在,veu/react这类框架会根据环境去区分打包，打包后的dist在开发环境中是比较大的，因为有很多类似错误的信息们可以帮助我们开发人员开发，而生产环境是比较小的，没有繁多的错误信息，我们也不希望错误信息给用户看，所以就没必要把错误信息打包进去了
		//为什么单引号里面还要双引号？因为如果没有的话，调用的时候，就成了process.env.NODE_ENV = development,这时候development就成了一个变量，所以需要写上双引号
		new HTMLPlugin()
    ]
}

if(isDev){
    // 帮助我们在页面上调试我们的代码的有很多种source-map的映射方式，不同映射方式有不同的优缺点，
        //这个值，可以让你在浏览器看到源码
    config.devtool = '#cheap-module-eval-source-map';
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',//可以通过localhost,127.0.0.1,本机的内网IP进行访问（IP的话，就可以在别人的电脑上访问）
		overlay: {
            error: true//如果编译有错误，就直接显示在网页上
            
            //  当然，在这个devServer中，还有其他的配置，比如：
            //     historyFallback对于非定义的路由的处理
            //     open: true,//启动的时候，自动打开浏览器
            //     hot: true,//热加载，不需要刷新页面就能加载出来
		}
    }

    // 当然，你需要使用热加载，还需要添加插件：
    // config.plugins.push(
	// 	new webpack.HotModuleReplacementPlugin(),
	// 	new webpack.NoEmitOnErrorsPlugin()//减少我们不需要的信息的展示
	// )
    
}

module.exports = config;

