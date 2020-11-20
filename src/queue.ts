export default class Queue {
    private front: number
    private end: number
    private store: Record<number, any>

    constructor() {
        this.front = 0
        this.end = 0
        this.store = {}
    }

    /**
     * Adds an item to the end of the queue.
     * @param {any} The value to store.
     */
    enqueue(value: any) {
        this.store[this.end] = value
        this.end++
    }

    /**
     * Removes an item from the queue and return its value.
     * @return {any | undefined} The value stored in item.
     */
    dequeue(): any | undefined {
        if (this.front === this.end) {
            return undefined
        }

        const value = this.store[this.front]

        delete this.store[this.front]
        this.front++

        return value
    }

    /**
     * Returns the current size of the queue.
     * @return {number} Size of the queue.
     */
    size(): number {
        return this.end - this.front
    }

    /**
     * Returns the item at front of the queue without dequeueing.
     * @return {any | undefined} The value stored in the item.
     */
    peek(): any | undefined {
        if (this.size() === 0) {
            return undefined
        }

        return this.store[this.front]
    }
}
