import { assert } from "chai"
import { performance } from "perf_hooks"
import Queue from "../src/queue"

describe("Queue data structure", () => {
    const iterations = 100000

    it("Should be faster than an array (with shift O(n) function", () => {
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
