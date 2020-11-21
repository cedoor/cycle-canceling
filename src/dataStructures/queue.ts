/**
 * Queue data structure allows you to perform FIFO
 * operations in constant time. JavaScript arrays
 * have 'shift' and 'push' methods but 'shift' take linear time.
 */
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
     * Time complexity: O(1).
     * @param {any} The value to store.
     */
    enqueue(value: any) {
        this.store[this.end] = value
        this.end++
    }

    /**
     * Removes an item from the queue and return its value.
     * Time complexity: O(1).
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
     * Time complexity: O(1).
     * @return {number} Size of the queue.
     */
    size(): number {
        return this.end - this.front
    }

    /**
     * Returns the item at front of the queue without dequeuing.
     * Time complexity: O(1).
     * @return {any | undefined} The value stored in the item.
     */
    peek(): any | undefined {
        if (this.size() === 0) {
            return undefined
        }

        return this.store[this.front]
    }
}
