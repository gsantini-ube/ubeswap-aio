const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];
packages.push(path.join(__dirname, "../ubeswap-components"));

module.exports = {
    webpack: {
        configure: (config, { env, paths }) => {
            paths.appBuild = config.output.path = path.resolve("../../build/v3");

            const { isFound, match } = getLoader(config, loaderByName("babel-loader"));
            if (isFound) {
                const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];
                match.loader.include = include.concat(packages);
            }

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
