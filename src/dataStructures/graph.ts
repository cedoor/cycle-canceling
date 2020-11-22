export default class Graph {
    private nodes: Map<number, Node>

    constructor(graphData?: GraphData) {
        this.nodes = new Map()

        if (graphData) {
            for (const node of graphData) {
                const arcs = node.arcs
                    ? node.arcs.map((arc) => new Arc(arc.head, arc.cost, arc.capacity, arc.maximumCapacity))
                    : []

                this.addNode(new Node(node.id, node.balance, arcs))
            }
        }
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

    hasNode(id: number): boolean {
        return this.nodes.has(id)
    }

    getNodes(): Node[] {
        return Array.from(this.nodes.values())
    }

    size(): number {
        return this.nodes.size
    }

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

    addArc(head: number, cost: number, capacity: number, maximumCapacity: number) {
        const arc = new Arc(head, cost, capacity, maximumCapacity)

        this.arcs.set(head, arc)
    }

    removeArc(head: number) {
        this.arcs.delete(head)
    }

    hasArc(head: number): boolean {
        return this.arcs.has(head)
    }

    getArc(head: number): Arc {
        const arc = this.arcs.get(head)

        if (!arc) {
            throw Error(`Arc with head ${head} does not exists`)
        }

        return arc
    }

    getArcs(): Arc[] {
        return Array.from(this.arcs.values())
    }
}

export class Arc {
    head: number
    cost: number
    capacity: number
    maximumCapacity: number

    constructor(head: number, cost: number, capacity: number, maximumCapacity: number) {
        this.cost = cost
        this.capacity = capacity
        this.maximumCapacity = maximumCapacity
        this.head = head
    }
}

export type GraphData = [
    {
        id: number
        balance: number
        arcs: [
            {
                head: number
                cost: number
                capacity: number
                maximumCapacity: number
            }
        ]
    }
]
