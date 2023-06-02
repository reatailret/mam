
var PrintChunksPlugin = function() {};
PrintChunksPlugin.prototype.apply = function(compiler) {
  compiler.hooks.thisCompilation.tap("TestWebpackPlugin", (compilation) => {
    
    compilation.hooks.succeedModule.tap(
      {
        name: 'MyPlugin',
      },
      (modules, records) => {
       // console.log('modules', modules);
        
      }
    );
    compilation.hooks.processAssets.tap(
      {
        name: 'MyPlugin',
        stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE, // see below for more stages
        additionalAssets: (assets) => {
          console.log("ADDITIONAL");
          Object.entries(assets).forEach(([pathname, source]) => {
            const assetInfo = compilation.assetsInfo.get(pathname);
            console.log(`— ${pathname}`, source);
            console.log(`— ${pathname}`, assetInfo);
            
          });
        },
      },
      (assets) => {
        console.log('List of assets and their sizes:');
        Object.entries(assets).forEach(([pathname, source]) => {
          const assetInfo = compilation.assetsInfo.get(pathname);
          console.log(`— ${pathname}`, source);
          console.log(`— ${pathname}`, assetInfo);
          
        });
      }
    );
    
  })
};
const webpack = require('webpack');
const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');
 

const config = {
  entry: './my/demo/-/web.js',
  output: {
    path: path.resolve(__dirname, '../my/demo/-/'),
    filename: '[name].[contenthash].pack.js',
    //clean: true,
    
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../my/demo/-/'),
	  
    },
    compress: true,
    port: 9000,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  plugins: [
    new PrintChunksPlugin(),
	new HtmlWebpackPlugin({
		templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body mol_view_root> <div mol_view_root="$my_demo"></div> <div id=\"app\"></div></body></html>',
		filename: 'index.html',
	  })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: '[name].bundle.js',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;
