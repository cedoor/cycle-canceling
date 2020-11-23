import { assert } from "chai"
import { readFileSync } from "fs"
import Graph from "../src/dataStructures/graph"
import { cycleCanceling } from "../src/minimumCostFlowAlgorithms"

describe("Minimum cost flow algorithms", () => {
    describe("Cycle-canceling", () => {
        it("Should calculate the correct maximum flow and minimum cost of the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))
            const graph = new Graph(graphData)

            const [maximumFlow, minimumCost] = cycleCanceling(graph, 1, 5)

            assert.deepEqual(maximumFlow, 25)
            assert.deepEqual(minimumCost, 20)
        })

        it("Should calculate the correct maximum flow and minimum cost of the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph3.json", "utf8"))
            const graph = new Graph(graphData)

            const [maximumFlow, minimumCost] = cycleCanceling(graph, 1, 6)

            assert.deepEqual(maximumFlow, 25)
            assert.deepEqual(minimumCost, 33)
        })
    })
})
