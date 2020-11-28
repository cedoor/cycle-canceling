import { readFileSync } from "fs"
import { edmondsKarp } from "../src"

describe("Maximum flow algorithms", () => {
    const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))

    describe("Edmonds Karp", () => {
        it("Should calculate the correct maximum flow of the graph", () => {
            const [, maximumFlow] = edmondsKarp(graphData)

            expect(maximumFlow).toBe(25)
        })
    })
})
