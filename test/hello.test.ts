import { assert } from "chai"
import { hello, hello2 } from "../src/hello"

describe("Hello tests", () => {
    it("Should return 1", () => {
        assert.deepEqual(hello(), 1)
    })

    it("Should return 2", () => {
        assert.deepEqual(hello2(), 2)
    })
})
