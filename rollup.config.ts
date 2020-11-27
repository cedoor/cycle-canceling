import sourceMaps from "rollup-plugin-sourcemaps"
import camelCase from "lodash.camelcase"
import typescript from "rollup-plugin-typescript2"

const pkg = require("./package.json")

const banner = `/**
 * @module ${camelCase(pkg.name)}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright ${pkg.author.name} ${new Date().getFullYear()}
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/`

export default {
    input: "src/index.ts",
    output: [
        { file: pkg.main, name: camelCase(pkg.name), format: "umd", banner, sourcemap: true },
        { file: pkg.module, format: "es", banner, sourcemap: true }
    ],
    watch: {
        include: "src/**"
    },
    plugins: [typescript({ useTsconfigDeclarationDir: true }), sourceMaps()]
}
