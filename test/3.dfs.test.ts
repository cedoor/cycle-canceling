import { assert } from "chai"
import { readFileSync } from "fs"
import createGraph from "../src/graph"
import calculatePath from "../src/dfs"

describe("Depth First Search algorithm", () => {
    it("Should return undefined because there is no path between the source and sink nodes", () => {
        const graphData = JSON.parse(readFileSync("./data/simpleGraph.json", "utf8"))
        const graph = createGraph(graphData)
        const path = calculatePath(graph, 1, 5)

        assert.deepEqual(path, undefined)
    })

    it("Should calculate the correct path between the source and sink nodes", () => {
        const graphData = JSON.parse(readFileSync("./data/simpleGraph.json", "utf8"))
        const graph = createGraph(graphData)
        const path = calculatePath(graph, 1, 4)

        assert.deepEqual(path, [1, 2, 4])
    })
})
