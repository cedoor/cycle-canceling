export default class Graph {
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

    addNode(node: Node) {
        if (this.hasNode(node.id)) {
            throw Error(`Node with id ${node.id} already exists`)
        }

        this.nodes.set(node.id, node)
    }

    removeNode(id: number) {
        if (!this.hasNode(id)) {
            throw Error(`Node with id ${id} does not exists`)
        }

        this.nodes.delete(id)
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

    addArc(arc: Arc) {
        if (this.hasArc(arc.head)) {
            throw Error(`Arc with head ${arc.head} already exists`)
        }

        this.arcs.set(arc.head, arc)
    }

    removeArc(head: number) {
        if (!this.hasArc(head)) {
            throw Error(`Arc with head ${head} does not exists`)
        }

        this.arcs.delete(head)
    }

    getArc(head: number): Arc {
        const arc = this.arcs.get(head)

        if (!arc) {
            throw Error(`Arc with head ${head} does not exists`)
        }

        return arc
    }

    hasArc(head: number): boolean {
        return this.arcs.has(head)
    }

    getArcs(): Arc[] {
        return Array.from(this.arcs.values())
    }
}

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

export type GraphData = [
    {
        id: number
        balance: number
        arcs: [
            {
                head: number
                cost: number
                capacity: number
            }
        ]
    }
]
