import { readFileSync } from "fs"
import { edmondsKarp } from "../src"

describe("Maximum flow algorithms", () => {
    describe("Edmonds Karp", () => {
        it("Should calculate the correct maximum flow of the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))
            const [, maximumFlow] = edmondsKarp(graphData)

            expect(maximumFlow).toBe(25)
        })

        it("Should calculate the correct maximum flow of the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph2.json", "utf8"))
            const [, maximumFlow] = edmondsKarp(graphData)

            expect(maximumFlow).toBe(4)
        })

        it("Should calculate the correct maximum flow of the graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph4.json", "utf8"))
            const [, maximumFlow] = edmondsKarp(graphData)

            expect(maximumFlow).toBe(105)
        })
    })
})
