import { assert } from "chai"
import { performance } from "perf_hooks"
import Queue from "../src/queue"

describe("Queue data structure", () => {
    describe("Basic methods", () => {
        const queue = new Queue()

        it("Initial queue should be empty", () => {
            assert.equal(queue.size(), 0)
        })

        it("Should enqueue and dequeue a value", () => {
            queue.enqueue(1)

            assert.equal(queue.size(), 1)
            assert.equal(queue.dequeue(), 1)
            assert.equal(queue.size(), 0)
        })

        it("Should peek a value", () => {
            queue.enqueue(1)

            const value = queue.peek()

            assert.equal(value, 1)
            assert.equal(queue.size(), 1)
        })
    })

    describe("Performance", () => {
        const iterations = 100000

        it("Should be faster than an array (with O(n) shift method)", () => {
            const t0 = performance.now()

            const customQueue = new Queue()
            for (let i = 0; i < iterations; i++) {
                customQueue.enqueue(i)
                if (i % 10 === 0) customQueue.dequeue()
            }

            const t1 = performance.now()

            const arrayQueue = []
            for (let i = 0; i < iterations; i++) {
                arrayQueue.push(i)
                if (i % 10 === 0) arrayQueue.shift()
            }

            const t2 = performance.now()

            assert.isAtMost((t1 - t0) * 10, t2 - t1)
        })
    })
})
