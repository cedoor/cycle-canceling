// rollup.config.js
import typescript from "@rollup/plugin-typescript"
import pkg from "./package.json"

export default {
    input: "src/index.ts",
    output: {
        name: pkg.name,
        file: pkg.main,
        format: "umd"
    },
    plugins: [typescript()]
}
