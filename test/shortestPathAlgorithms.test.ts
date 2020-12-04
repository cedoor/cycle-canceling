import { readFileSync } from "fs"
import { bellmanFord } from "../src"

describe("Shortest path algorithms", () => {
    describe("Bellman Ford", () => {
        it("Should find the negative cycle in the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph2.json", "utf8"))
            const negativeCycle = bellmanFord(graphData, 1)

            expect(negativeCycle).toEqual([2, 3, 1])
        })
    })

    describe("Bellman Ford", () => {
        it("Should find the negative cycle in the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))
            const tree = bellmanFord(graphData, 1) as Map<number, [number, number]>

            expect(tree).toBeInstanceOf(Map)
            expect(tree.get(5)).toEqual([3, 8])
        })
    })
})
