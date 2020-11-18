import { Graph } from "./graph"

/**
 * Depth First Search algorithm to identify all directed
 * paths from the source to the other nodes. The first node
 * (id = 1) of the graph is considered the source node.
 * The algorithm return a map of key-values in which the
 * key is the visited node and the value is the previous node,
 * with which you can reconstruct the paths.
 * @param: graph to visit.
 * @returns: map with the visited nodes.
 */
export default function depthFirstSearch(graph: Graph): Map<number, number> {
    const visitedNodes = new Map<number, number>()
    const stack = [1]

    visitedNodes.set(1, 0)

    while (stack.length) {
        const nodeId = stack.pop() as number
        const adjacentArcs = graph.getNode(nodeId).arcs

        if (adjacentArcs && adjacentArcs.size > 0) {
            for (const adjacentArc of adjacentArcs) {
                const adjacentNode = adjacentArc.head
                if (!visitedNodes.has(adjacentNode)) {
                    visitedNodes.set(adjacentNode, nodeId)
                    stack.push(adjacentNode)
                }
            }
        }
    }

    return visitedNodes
}

export function getPath(visitedNodes: Map<number, number>, sinkNode: number): number[] {
    const path = [sinkNode]

    while (path[path.length - 1] !== 0) {
        const previousNode = visitedNodes.get(path[path.length - 1]) as number

        path.push(previousNode)
    }

    path.pop()
    return path.reverse()
}
