import Graph from "./dataStructures/graph"
import { edmondsKarp } from "./maximumFlowAlgorithms"
import { bellmanFord } from "./shortestPathAlgorithms"
import { getResidualCapacity, sendFlow, setResidualGraph } from "./utils"

/**
 * The Cycle-Canceling algorithm is a minimum-cost flow problem
 * and starting from a feasible graph obtained with a maximum flow algorithm
 * and as long as negative cost cycles exist augment the flow along this cycles.
 * This implementation uses the Edmonds-Karp algorithm to solve the maximum flow problem,
 * and the Bellman-Fort algorithm to find the negative cycles.
 * Time complexity: O (n * m^2 * C * U).
 * @param {Graph} The graph to visit.
 * @returns {[number, number]} The maximum flow and the minimum cost.
 */
export function cycleCanceling(graph: Graph): [number, number] {
    const [optimalGraph, maximumFlow] = edmondsKarp(graph)
    const sourceNodeId = optimalGraph.size() - 1

    setResidualGraph(optimalGraph)

    let negativeCycle = bellmanFord(optimalGraph, sourceNodeId)

    while (negativeCycle) {
        const residualCapacity = getResidualCapacity(optimalGraph, negativeCycle)

        sendFlow(optimalGraph, negativeCycle, residualCapacity)

        negativeCycle = bellmanFord(optimalGraph, sourceNodeId)
    }

    // Calculates the minimum cost.
    let minimumCost = 0
    for (const node of optimalGraph.getNodes()) {
        for (const arc of node.getArcs()) {
            if (arc.cost < 0) {
                minimumCost -= arc.cost
            }
        }
    }

    return [maximumFlow, minimumCost]
}
