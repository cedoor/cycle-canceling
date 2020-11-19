import { assert } from "chai"
import { readFileSync } from "fs"
import createGraph from "../src/graph"
import calculateMaximumFlow from "../src/maximumFlow"

describe("Maximum flow algorithms", () => {
    it("Should calculate the correct maximum flow of the graph", () => {
        const graphData = JSON.parse(readFileSync("./data/simpleGraph.json", "utf8"))
        const graph = createGraph(graphData)
        const maximumFlow = calculateMaximumFlow(graph, 1, 4)

        assert.deepEqual(maximumFlow, 4)
    })
})
