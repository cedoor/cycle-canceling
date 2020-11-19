import { assert } from "chai"
import { readFileSync } from "fs"
import createGraph, { Arc, Graph, Node } from "../src/graph"

describe("Graph data structure", () => {
    it("Should create a graph with a node", () => {
        const graph = new Graph()
        const arc = new Arc(2, 2, 4, 5)
        const node = new Node(1, 2, [arc])

        graph.addNode(node)

        assert.deepEqual(graph.getNode(1), node)
    })

    it("Should create a graph using external graph data", () => {
        const graphData = JSON.parse(readFileSync("./data/simpleGraph.json", "utf8"))
        const graph = createGraph(graphData)

        assert.deepEqual(graph.checkIntegrity(), true)
    })
})
