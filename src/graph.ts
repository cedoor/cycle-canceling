export class Graph {
    private nodes: Map<number, Node>

    constructor() {
        this.nodes = new Map()
    }

    addNode(node: Node) {
        this.nodes.set(node.id, node)
    }

    getNode(id: number): Node {
        const node = this.nodes.get(id)

        if (!node) {
            throw Error(`Node with id ${id} does not exists`)
        }

        return node
    }

    checkIntegrity(): boolean {
        for (const node of this.nodes) {
            for (const arc of node[1].getArcs()) {
                if (!this.nodes.has(arc[1].head)) {
                    return false
                }
            }
        }

        return true
    }
}

export class Node {
    id: number
    balance: number

    private arcs: Map<number, Arc> // Outgoing arcs.

    constructor(id: number, balance: number, arcs: Arc[] = []) {
        this.id = id
        this.balance = balance
        this.arcs = new Map(arcs.map((arc) => [arc.head, arc]))
    }

    getArcs() {
        return this.arcs
    }
}

export class Arc {
    cost: number
    capacity: number
    maximumCapacity: number
    head: number

    constructor(cost: number, capacity: number, maximumCapacity: number, head: number) {
        this.cost = cost
        this.capacity = capacity
        this.maximumCapacity = maximumCapacity
        this.head = head
    }
}

export type GraphData = [[number, number, [[number, number, number, number]]]]

export default function createGraph(graphData: GraphData) {
    const graph = new Graph()

    for (const n of graphData) {
        const arcs = n[2] ? n[2].map((arc) => new Arc(...arc)) : []
        const node = new Node(n[0], n[1], arcs)

        graph.addNode(node)
    }

    return graph
}
