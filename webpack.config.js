const path = require('path');

module.exports = {
    entry: './public/javascripts/scripts.js', // Your entry point
    "type":module,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/javascripts'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    mode: 'development', // or 'production'
};
