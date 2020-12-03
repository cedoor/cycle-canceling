/**
 * The Arc class contains the parameters of an arc in a
 * directed graph: head node, cost, capacity and flow.
 */
export default class Arc {
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
