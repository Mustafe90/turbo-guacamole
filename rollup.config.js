import resolve from "@rollup/plugin-node-resolve"
import babel from "rollup-plugin-babel"
import serve from "rollup-plugin-serve"
import liveReload from "rollup-plugin-livereload"

export default {

    input: "src/index.js",
    output: {
        file: "public/bundle.js",
        format: "iife",
        name: "bundle" //Todo: Make this the name of the project
    },
    plugins: [
        resolve(),
        babel({
            exclude: "node_modules/**"
        }),
        //Todo: Enable hot re-loading
        serve({
            port: 8008,
            https: false,
            open: true,
            verbose: true,
            contentBase: ["public"]
        }),
        liveReload({
            watch: "public",
            verbose: true
        })
    ]
};
