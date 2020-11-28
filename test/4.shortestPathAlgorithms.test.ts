import { readFileSync } from "fs"
import { bellmanFord } from "../src"

describe("Shortest path algorithms", () => {
    const graphData = JSON.parse(readFileSync("./data/graph2.json", "utf8"))

    describe("Bellman Ford", () => {
        it("Should find the negative cycle in the graph", () => {
            const negativeCycle = bellmanFord(graphData, 1)

            expect(negativeCycle).toEqual([2, 3, 1])
        })
    })
})
