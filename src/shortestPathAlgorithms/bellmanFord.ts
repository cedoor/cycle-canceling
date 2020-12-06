import Graph, { GraphData } from "../dataStructures/graph"
import { retrievePath } from "../utils"

/**
 * The Bellman–Ford algorithm finds the shortest paths of a directed graph.
 * The algorithm returns a map with the nodes and their predecessors and a map
 * with the nodes and their distances from the source node.
 * If there are negative cycles the algorithm returns the path of the cycle.
 * Time complexity: O(n * m).
 * @param {Graph | GraphData} The graph to visit.
 * @param {number} The source node.
 * @returns {Map<number, [number, number]> | number[]} A map with distances and predecessors
 * or the path of the negative cycle.
 */
export default function bellmanFord(
    graph: Graph | GraphData,
    sourceNodeId: number
): Map<number, [number, number]> | number[] {
    if (!(graph instanceof Graph)) {
        graph = new Graph(graph)
    }

    // Creates a map for the distances from the source node for each node
    // and a map to save the nodes of the paths and their predecessors.
    const distances = new Map<number, number>()
    const predecessors = new Map<number, number>()

    const nodes = graph.getNodes()

    // Initializes all the node distances with infinity except the source node with 0.
    for (const node of nodes) {
        distances.set(node.id, Infinity)
    }

    distances.set(sourceNodeId, 0)

    for (let i = 0; i < graph.size() - 1; i++) {
        for (const node of nodes) {
            for (const arc of node.getArcs()) {
                const nodeDistance = distances.get(node.id) as number
                const adjacentNodeDistance = distances.get(arc.head) as number

                if (adjacentNodeDistance > nodeDistance + arc.cost) {
                    distances.set(arc.head, nodeDistance + arc.cost)
                    predecessors.set(arc.head, node.id)
                }
            }
        }
    }

    // If still for some node the condition is not respected then there is a negative cycle.
    for (const node of nodes) {
        for (const arc of node.getArcs()) {
            const nodeDistance = distances.get(node.id) as number
            const adjacentNodeDistance = distances.get(arc.head) as number

            if (adjacentNodeDistance > nodeDistance + arc.cost) {
                return retrievePath(predecessors, node.id)
            }
        }
    }

    // Merge distances and predecessors in an unique map.
    return new Map(Array.from(predecessors).map((entry) => [entry[0], [entry[1], distances.get(entry[0]) as number]]))
}
