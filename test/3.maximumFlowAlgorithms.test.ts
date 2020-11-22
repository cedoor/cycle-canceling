import { assert } from "chai"
import { readFileSync } from "fs"
import Graph from "../src/dataStructures/graph"
import edmondsKarp from "../src/maximumFlowAlgorithms/edmondsKarp"

describe("Maximum flow algorithms", () => {
    const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))

    describe("Edmonds Karp", () => {
        it("Should calculate the correct maximum flow of the graph", () => {
            const graph = new Graph(graphData)
            const maximumFlow = edmondsKarp(graph, 1, 4)

            assert.deepEqual(maximumFlow, 4)
        })
    })
})
