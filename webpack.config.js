const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, "dist")
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devServer: {
        
    },
    module: {
        rules: [
            // Todos los archivos con una extensión '.ts' o '.tsx' serán manejados por 'awesome-typescript-loader
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // Todos los archivos de salida '.js' tendrán cualquier mapa de origen re-procesado por 'gestor de mapas de origen'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]

    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
}