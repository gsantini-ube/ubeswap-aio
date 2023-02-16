const path = require("path");

module.exports = {
    webpack: {
        configure: (config, { env, paths }) => {
            paths.appBuild = config.output.path = path.resolve("../../build/v3");

            config.module.rules.push({
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve("babel-loader"),
                        options: {
                            presets: [require("@babel/preset-typescript").default, [require("@babel/preset-react").default, { runtime: "automatic" }], require("@babel/preset-env").default],
                        },
                    },
                ],
            });

            config.resolve.extensions.push(".ts", ".tsx");

            return config;
        },
    },
    eslint: {
        enable: false,
    },
    typescript: { enableTypeChecking: false },
};
