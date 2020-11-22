import { assert } from "chai"
import { readFileSync } from "fs"
import Graph from "../src/dataStructures/graph"
import dfs from "../src/searchAlgorithms/dfs"
import bfs from "../src/searchAlgorithms/bfs"

describe("Search algorithms", () => {
    const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))
    const graph = new Graph(graphData)

    describe("Depth first search", () => {
        it("Should return undefined because there is no path between the source and sink nodes", () => {
            const path = dfs(graph, 1, 5)

            assert.deepEqual(path, undefined)
        })

        it("Should calculate the correct path between the source and sink nodes", () => {
            const path = dfs(graph, 1, 4)

            assert.deepEqual(path, [1, 2, 4])
        })
    })

    describe("Breadth first search", () => {
        it("Should return undefined because there is no path between the source and sink nodes", () => {
            const path = bfs(graph, 1, 5)

            assert.deepEqual(path, undefined)
        })

        it("Should calculate the correct path between the source and sink nodes", () => {
            const path = bfs(graph, 1, 4)

            assert.deepEqual(path, [1, 3, 4])
        })
    })
})
