import calculatePath from "./dfs"
import { Graph } from "./graph"

/**
 * Ford–Fulkerson algorithm to calculate the maximum flow.
 * O(nm^2)
 */
export default function calculateMaximumFlow(graph: Graph, sourceNode: number, sinkNode: number): number {
    let maximumflow = 0
    let path = calculatePath(graph, sourceNode, sinkNode)

    while (path) {
        const minimumCapacity = getMinimumCapacity(graph, path)

        maximumflow += minimumCapacity

        updateResidualCapacities(graph, path, minimumCapacity)

        path = calculatePath(graph, sourceNode, sinkNode)
    }

    return maximumflow
}

/**
 * O(n), n = path.length
 */
function getMinimumCapacity(graph: Graph, path: number[]): number {
    let minimumCapacity = Infinity

    for (let i = 0; i < path.length - 1; i++) {
        const node = graph.getNode(path[i])
        const arc = node.getArc(path[i + 1])

        if (arc.capacity < minimumCapacity) {
            minimumCapacity = arc.capacity
        }
    }

    return minimumCapacity
}

/**
 * O(n), n = path.length
 */
function updateResidualCapacities(graph: Graph, path: number[], capacity: number) {
    for (let i = 0; i < path.length - 1; i++) {
        const node = graph.getNode(path[i])
        const arc = node.getArc(path[i + 1])
        const adjacentNode = graph.getNode(arc.head)

        if (arc.capacity === capacity) {
            node.removeArc(adjacentNode.id)
        } else {
            arc.capacity -= capacity
        }

        if (!adjacentNode.hasArc(node.id)) {
            adjacentNode.addArc(node.id, arc.cost, capacity, arc.maximumCapacity)
        } else {
            const reverseArc = adjacentNode.getArc(node.id)

            reverseArc.capacity += capacity
        }
    }
}
