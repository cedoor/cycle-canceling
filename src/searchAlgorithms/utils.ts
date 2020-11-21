/**
 * Retrieves the path from the sink node to the source node
 * starting from the nodes visited by the search algorithm.
 * The source node has a parent node with '0' id.
 * @param {Map<number, number>} Visited nodes.
 * @param {number} Sink node.
 * @returns {number[]} Path from the source node to the sink node.
 */
export function retrievePath(visitedNodes: Map<number, number>, sinkNode: number): number[] {
    // Path starts from the sink node.
    const path = [sinkNode]

    // While loop stops when the last path node is the source node.
    while (visitedNodes.get(path[path.length - 1]) !== 0) {
        const previousNode = visitedNodes.get(path[path.length - 1]) as number

        path.push(previousNode)
    }

    // Returns a reversed array, ordered from the source to the sink node.
    return path.reverse()
}
