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
 * The Node class contains the methods to add, remove and
 * modify the arcs of the node in a constant time. Each node
 * contains id, balance and a map of outgoing arcs.
 */
export class Node {
    id: number
    balance: number

    // Map of the outgoing arcs in which the key is the arc head.
    private arcs: Map<number, Arc>

    constructor(id: number, balance: number, arcs: Arc[] = []) {
        this.id = id
        this.balance = balance
        this.arcs = new Map(arcs.map((arc) => [arc.head, arc]))
    }

    /**
     * Adds an arc in the node.
     * @param {Arc} The arc to add.
     */
    addArc(arc: Arc) {
        if (this.hasArc(arc.head)) {
            throw Error(`Arc with head ${arc.head} already exists`)
        }

        this.arcs.set(arc.head, arc)
    }

    /**
     * Removes an arc from the node.
     * @param {number} The head of arc the to remove.
     */
    removeArc(head: number) {
        if (!this.hasArc(head)) {
            throw Error(`Arc with head ${head} does not exists`)
        }

        this.arcs.delete(head)
    }

    /**
     * Returns an arc from the node.
     * @param {number} The head of the arc to return.
     * @returns {Arc} The arc to return.
     */
    getArc(head: number): Arc {
        const arc = this.arcs.get(head)

        if (!arc) {
            throw Error(`Arc with head ${head} does not exists`)
        }

        return arc
    }

    /**
     * Checks if there is an arc in the node.
     * @param {number} The head of the arc to check.
     * @param {boolean} True if the arc exists, false otherwise.
     */
    hasArc(head: number): boolean {
        return this.arcs.has(head)
    }

    /**
     * Returns all the arcs of the node.
     * @returns {Arc[]} The node arcs.
     */
    getArcs(): Arc[] {
        return Array.from(this.arcs.values())
    }

    /**
     * Returns the number of the arcs of the node.
     * @returns {number} The number of the node arcs.
     */
    size(): number {
        return this.arcs.size
    }
}

/**
 * The Arc class contains the parameters of an arc in a
 * directed graph: head node, cost, capacity and flow.
 */
export class Arc {
    head: number
    cost: number
    capacity: number
    flow: number

    constructor(head: number, cost: number, capacity: number, flow = 0) {
        this.head = head
        this.cost = cost
        this.capacity = capacity
        this.flow = flow
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
