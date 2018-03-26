var webpack = require('webpack');
// var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        // hot loader needs to be enabled!
        // Add clien-tside library of webpack dev server and webpack hot module loader
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel' // react-hot! added so we can use with .js and .jsx files.
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true // added hot flag. This is not done by default so we must add it.
    },
    // react-hot-loader plugin
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
    // postcss: function () {
    //     return [autoprefixer];
    // }
};

// Uncover index.js as entrypoint and build into dist/bundle.js bundle!
// dist directory will be base of development server
// Enable .jsx files to be uncovered as well as .js --- This is done through lines 5-13