import { readFileSync } from "fs"
import Graph from "../src/dataStructures/graph"
import { bellmanFord } from "../src/shortestPathAlgorithms"

describe("Shortest path algorithms", () => {
    const graphData = JSON.parse(readFileSync("./data/graph2.json", "utf8"))

    describe("Bellman Ford", () => {
        it("Should find the negative cycle in the graph", () => {
            const graph = new Graph(graphData)

            const negativeCycle = bellmanFord(graph, 1)

            expect(negativeCycle).toEqual([2, 3, 1])
        })
    })
})
