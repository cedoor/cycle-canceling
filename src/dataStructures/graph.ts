import Node from "./node"
import Arc from "./arc"

/**
 * The Graph class is a data structure that allow you to create a directed
 * graph, in which to add, remove and modify nodes and arcs
 * in constant time. Nodes and arcs are stored in maps.
 */
export default class Graph {
    // Map of the nodes in which the key is the node id.
    private nodes: Map<number, Node>

    constructor(graphData?: GraphData) {
        this.nodes = new Map()

        if (graphData) {
            for (const node of graphData) {
                const arcs = node.arcs ? node.arcs.map((arc) => new Arc(arc.head, arc.cost, arc.capacity)) : []

                this.addNode(new Node(node.id, node.balance, arcs))
            }
        }
    }

    /**
     * Adds a node in the graph.
     * @param {Node} The node to add.
     */
    addNode(node: Node) {
        if (this.hasNode(node.id)) {
            throw Error(`Node with id ${node.id} already exists`)
        }

        this.nodes.set(node.id, node)
    }

    /**
     * Removes a node from the graph.
     * @param {number} The id of the node to remove.
     */
    removeNode(id: number) {
        if (!this.hasNode(id)) {
            throw Error(`Node with id ${id} does not exists`)
        }

        this.nodes.delete(id)
    }

    /**
     * Returns a node from the graph.
     * @param {number} The id of the node to return.
     * @returns {Node} The node to return.
     */
    getNode(id: number): Node {
        const node = this.nodes.get(id)

        if (!node) {
            throw Error(`Node with id ${id} does not exists`)
        }

        return node
    }

    /**
     * Checks if there is a node in the graph.
     * @param {number} The id of the node to check.
     * @param {boolean} True if the node exists, false otherwise.
     */
    hasNode(id: number): boolean {
        return this.nodes.has(id)
    }

    /**
     * Returns all the nodes of the graph.
     * @returns {Node[]} The graph nodes.
     */
    getNodes(): Node[] {
        return Array.from(this.nodes.values())
    }

    /**
     * Returns the number of the nodes of the graph.
     * @returns {number} The number of the graph nodes.
     */
    size(): number {
        return this.nodes.size
    }

    /**
     * Returns an instance of the copy of the current graph.
     */
    copy(): Graph {
        return new Graph(this.export())
    }

    /**
     * Checks the integrity of the graph. All the arcs
     * must have an existing head node.
     * @returns {number} True if the graph is correct, false otherwise.
     */
    checkIntegrity(): boolean {
        for (const node of this.getNodes()) {
            for (const arc of node.getArcs()) {
                if (!this.hasNode(arc.head)) {
                    return false
                }
            }
        }

        return true
    }

    /**
     * Returns the graph data of the graph.
     * @returns {GraphData} The graph data.
     */
    export(): GraphData {
        const graphData: GraphData = []

        for (const node of this.getNodes()) {
            const arcs = node.getArcs().map((arc) => ({
                head: arc.head,
                cost: arc.cost,
                capacity: arc.capacity,
                flow: arc.flow
            }))

            graphData.push({
                id: node.id,
                balance: node.balance,
                arcs
            })
        }

        return graphData
    }
}

/**
 * Type used to define the structure of the graph data
 * which can be passed into the graph class constructor
 * to create a graph using external data (i.e. JSON data).
 */
export type GraphData = {
    id: number
    balance: number
    arcs: {
        head: number
        cost: number
        capacity: number
        flow?: number
    }[]
}[]
