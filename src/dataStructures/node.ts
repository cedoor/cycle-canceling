import Arc from "./arc"

/**
 * The Node class contains the methods to add, remove and
 * modify the arcs of the node in a constant time. Each node
 * contains id, balance and a map of outgoing arcs.
 */
export default class Node {
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
