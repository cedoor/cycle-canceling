import { assert } from "chai"
import { readFileSync } from "fs"
import Graph, { Arc, Node } from "../src/dataStructures/graph"
import Queue from "../src/dataStructures/queue"

describe("Data structures", () => {
    describe("Queue", () => {
        const queue = new Queue()

        it("Initial queue should be empty", () => {
            assert.equal(queue.size(), 0)
        })

        it("Should enqueue and dequeue a value", () => {
            queue.enqueue(1)

            assert.equal(queue.size(), 1)
            assert.equal(queue.dequeue(), 1)
            assert.equal(queue.size(), 0)
        })

        it("Should peek a value", () => {
            queue.enqueue(1)

            const value = queue.peek()

            assert.equal(value, 1)
            assert.equal(queue.size(), 1)
        })
    })

    describe("Graph", () => {
        it("Should create an empty graph", () => {
            const graph = new Graph()

            assert.deepEqual(graph.size(), 0)
        })

        it("Should add, remove and modify nodes in a graph", () => {
            const graph = new Graph()
            const node1 = new Node(1, 2)
            const node2 = new Node(2, 3)

            node2.balance = 0

            graph.addNode(node1)
            graph.addNode(node2)

            assert.deepEqual(graph.size(), 2)
            assert.deepEqual(graph.getNode(1), node1)
            assert.deepEqual(graph.getNode(2).balance, 0)

            graph.removeNode(2)

            assert.throw(() => graph.getNode(2))
            assert.throw(() => graph.addNode(node1))
            assert.throw(() => graph.removeNode(2))
        })

        it("Should add, remove and modify arcs in a node", () => {
            const graph = new Graph()
            const node1 = new Node(1, 2)
            const node2 = new Node(2, 3)
            const arc1 = new Arc(2, 5, 10)
            const arc2 = new Arc(1, 3, 14)

            graph.addNode(node1)
            graph.addNode(node2)

            arc1.cost = 10

            node1.addArc(arc1)
            node2.addArc(arc2)

            assert.deepEqual(node1.size(), 1)
            assert.deepEqual(node1.getArc(2).cost, 10)
            assert.deepEqual(node2.getArc(1).head, node1.id)

            node1.removeArc(2)

            assert.throw(() => node1.getArc(2))
            assert.throw(() => node2.addArc(arc2))
            assert.throw(() => node1.removeArc(2))
        })

        it("Should create a graph using external graph data", () => {
            const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))
            const graph = new Graph(graphData)

            assert.isAtLeast(graph.size(), 0)
            assert.deepEqual(graph.checkIntegrity(), true)
        })
    })
})
