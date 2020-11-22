import { assert } from "chai"
import { readFileSync } from "fs"
import Graph from "../src/dataStructures/graph"
import bellmanFord from "../src/shortestPathAlgorithms/bellmanFord"

describe("Shortest path algorithms", () => {
    const graphData = JSON.parse(readFileSync("./data/graph2.json", "utf8"))

    describe("Bellman Ford", () => {
        it("Should find the negative cycle in the graph", () => {
            const graph = new Graph(graphData)

            const negativeCycle = bellmanFord(graph, 1)

            assert.deepEqual(negativeCycle, [2, 3, 1])
        })
    })
})
