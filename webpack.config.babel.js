import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import GoogleFontsPlugin from 'google-fonts-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: 'index.html',
  inject: 'body',
})

const { NODE_ENV } = process.env

const config = {
  entry: ['./app/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig, // simplifies creation of HTML files to serve your webpack bundles
    new ExtractTextPlugin('bundle.styles.css'),
  ],
  devServer: {
    overlay: true,
    stats: {
      colors: true,
      modules: false,
    },
  },
}

if (NODE_ENV === 'production') {
  config.devtool = 'cheap-module-source-map'
  config.module.rules = [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    },
    ...config.module.rules,
  ]
  config.plugins = [
    ...config.plugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ]
} else {
  config.devtool = 'cheap-module-inline-source-map'
  /* the best option for production because:-
    - it displays the correct line number for errors
    - has the smallest(at time of coding) size after bundling
  */
  config.entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    ...config.entry,
  ]
  config.devServer = {
    contentBase: './dist',
    hot: true,
    ...config.devServer,
  }
  config.module.rules = [
    {
      test: /\.scss/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    },
    ...config.module.rules,
  ]
  config.plugins = [
    ...config.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new GoogleFontsPlugin({
      fonts: [
        {family: 'Montserrat'},
      ],
    }),
  ]
}

export default config
