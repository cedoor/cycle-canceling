import { readFileSync } from "fs"
import { dfs, bfs } from "../src"

describe("Search algorithms", () => {
    const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))

    describe("Depth first search", () => {
        it("Should return undefined because there is no path between the source and sink nodes", () => {
            const tree = dfs(graphData, 1, 6) as Map<number, number>

            expect(tree).toBeInstanceOf(Map)
            expect(tree.get(5)).toEqual(4)
        })

        it("Should calculate the correct path between the source and sink nodes", () => {
            const path = dfs(graphData, 1, 5)

            expect(path).toEqual([1, 2, 4, 5])
        })
    })

    describe("Breadth first search", () => {
        it("Should return undefined because there is no path between the source and sink nodes", () => {
            const tree = bfs(graphData, 1, 6) as Map<number, number>

            expect(tree).toBeInstanceOf(Map)
            expect(tree.get(5)).toEqual(3)
        })

        it("Should calculate the correct path between the source and sink nodes", () => {
            const path = bfs(graphData, 1, 5)

            expect(path).toEqual([1, 3, 5])
        })
    })
})
