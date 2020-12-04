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
 * @returns {[Map<number, number>, Map<number, number>] | number[]} The path of the negative cycle.
 */
export default function bellmanFord(
    graph: Graph | GraphData,
    sourceNodeId: number
): Map<number, [number, number]> | number[] {
    if (!(graph instanceof Graph)) {
        graph = new Graph(graph)
    }

    const distances = new Map<number, number>()
    const predecessors = new Map<number, number>()

    const nodes = graph.getNodes()

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

    for (const node of nodes) {
        for (const arc of node.getArcs()) {
            const nodeDistance = distances.get(node.id) as number
            const adjacentNodeDistance = distances.get(arc.head) as number

            if (adjacentNodeDistance > nodeDistance + arc.cost) {
                return retrievePath(predecessors, node.id)
            }
        }
    }

    return new Map(Array.from(predecessors).map((entry) => [entry[0], [entry[1], distances.get(entry[0]) as number]]))
}
