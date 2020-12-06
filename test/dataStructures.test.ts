import { readFileSync } from "fs"
import { Graph, Arc, Node } from "../src"
import Queue from "../src/dataStructures/queue"

describe("Data structures", () => {
    describe("Queue", () => {
        const queue = new Queue()

        it("Initial queue should be empty", () => {
            expect(queue.size()).toBe(0)
        })

        it("Should enqueue and dequeue a value", () => {
            queue.enqueue(1)

            expect(queue.size()).toBe(1)
            expect(queue.dequeue()).toBe(1)
            expect(queue.size()).toBe(0)
        })

        it("Should peek a value", () => {
            queue.enqueue(1)

            const value = queue.peek()

            expect(value).toBe(1)
            expect(queue.size()).toBe(1)
        })
    })

    describe("Graph", () => {
        it("Should create an empty graph", () => {
            const graph = new Graph()

            expect(graph.size()).toBe(0)
        })

        it("Should add, remove and modify nodes in a graph", () => {
            const graph = new Graph()
            const node1 = new Node(1, 2)
            const node2 = new Node(2, 3)

            node2.balance = 0

            graph.addNode(node1)
            graph.addNode(node2)

            expect(graph.size()).toBe(2)
            expect(graph.getNode(1)).toBe(node1)
            expect(graph.getNode(2).balance).toBe(0)

            graph.removeNode(2)

            expect(() => graph.getNode(2)).toThrow()
            expect(() => graph.addNode(node1)).toThrow()
            expect(() => graph.removeNode(2)).toThrow()
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

            expect(node1.size()).toBe(1)
            expect(node1.getArc(2).cost).toBe(10)
            expect(node2.getArc(1).head).toBe(node1.id)

            node1.removeArc(2)

            expect(() => node1.getArc(2)).toThrow()
            expect(() => node2.addArc(arc2)).toThrow()
            expect(() => node1.removeArc(2)).toThrow()
        })

        it("Should create a graph using external graph data", () => {
            const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))
            const graph = new Graph(graphData)

            expect(graph.size()).toBeGreaterThan(0)
            expect(graph.checkIntegrity()).toBeTruthy()
        })

        it("Should create a copy of a graph", () => {
            const graphData = JSON.parse(readFileSync("./data/graph1.json", "utf8"))
            const graph = new Graph(graphData)
            const graphCopy = graph.copy()

            expect(graph.size()).toEqual(graphCopy.size())
            graph.getNodes().forEach((node) => expect(node.size()).toEqual(graphCopy.getNode(node.id).size()))
        })
    })
})
