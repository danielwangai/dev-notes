import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PATHS = {
  app: path.join(__dirname, 'app'), // index.js file of app directory
  build: path.join(__dirname, 'dist'),
}

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body',
})

/**
 * process.env.npm_lifecycle_event - equal to the value of the script command being run
 * defined in scripts of package.json
 * e.g. start - for development, productiion or test
*/
const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'production'

process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
	'process.env': {
	NODE_ENV: JSON.stringify('production'),
  },
})

const baseConfigurations = {
  // shared configurations for both development and production
  devtool: 'cheap-module-inline-source-map', // aid in debugging
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js'
  },
  module: {
    // transformations handled here
    loaders: [
      {test: /\.js$|\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.scss$/,
        use: [{
          loader: "style-loader!sass-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]" // creates style nodes from JS strings
        },
      ]},
    ],
  },
}

const developmentConfigurations = {
  devtool: 'cheap-module-inline-source-map',/**
    the best option for production because:-
       -	it displays the correct line number for errors
       - has the smallest(at time of coding) size after bundling
  */
  devServer: {
    contentBase: PATHS.build,
    hot: true, // requires HMR
    inline: true,// webpack-dev-server client entry is added to the bundle which refreshes the page on change
    progress: true,
  },
  plugins: [
    HtmlWebpackPluginConfig, // simplifies creation of HTML files to serve your webpack bundles
    new webpack.HotModuleReplacementPlugin(),// exchanges, adds, or removes modules while app is running
  ],
}

const productionConfigurations = {
  devtool: 'cheap-module-source-map',
  plugins: [
    HtmlWebpackPluginConfig,
    productionPlugin,
  ],
}

export default Object.assign(
  {},
  baseConfigurations,
  isProduction === true ?  productionConfigurations : developmentConfigurations
)
