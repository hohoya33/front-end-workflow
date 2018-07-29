module.exports = {
    entry: {
        app: './resource/assets/js/app.js'
    },
    output: {
        path: __dirname + '/public/assets/js/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
}