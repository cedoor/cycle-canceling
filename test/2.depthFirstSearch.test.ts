import { assert } from "chai"
import { readFileSync } from "fs"
import createGraph from "../src/graph"
import depthFirstSearch, { getPath } from "../src/depthFirstSearch"

describe("Depth First Search algorithm tests", () => {
    it("Should visit the graph and retrieve paths between the source node and the other nodes", () => {
        const graphData = JSON.parse(readFileSync("./data/simpleGraph.json", "utf8"))
        const graph = createGraph(graphData)
        const visitedNodes = depthFirstSearch(graph)

        assert.deepEqual(getPath(visitedNodes, 4), [1, 2, 4])
    })
})
