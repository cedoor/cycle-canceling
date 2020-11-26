import { readFileSync } from "fs"
import Graph from "../src/dataStructures/graph"
import { cycleCanceling } from "../src/minimumCostFlowAlgorithms"

describe("Minimum cost flow algorithms", () => {
    describe("Cycle-canceling", () => {
        it("Should calculate the correct maximum flow and minimum cost of the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))
            const graph = new Graph(graphData)

            const [maximumFlow, minimumCost] = cycleCanceling(graph)

            expect(maximumFlow).toBe(25)
            expect(minimumCost).toBe(20)
        })

        it("Should calculate the correct maximum flow and minimum cost of the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph3.json", "utf8"))
            const graph = new Graph(graphData)

            const [maximumFlow, minimumCost] = cycleCanceling(graph)

            expect(maximumFlow).toBe(25)
            expect(minimumCost).toBe(33)
        })
    })
})
