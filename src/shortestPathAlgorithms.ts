import Graph, { GraphData } from "./dataStructures/graph"
import { retrievePath } from "./utils"

/**
 * The Bellman–Ford algorithm finds the shortest paths of a directed graph.
 * In this implementation the algorithm is used to detect negative cycles.
 * Time complexity: O(n * m).
 * @param {Graph | GraphData} The graph to visit.
 * @param {number} The source node.
 * @returns {number[] | undefined} The path of the negative cycle.
 */
export function bellmanFord(graph: Graph | GraphData, sourceNodeId: number): number[] | undefined {
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
}
