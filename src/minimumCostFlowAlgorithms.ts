import Graph, { Arc } from "./dataStructures/graph"
import { edmondsKarp } from "./maximumFlowAlgorithms"
import { bellmanFord } from "./shortestPathAlgorithms"
import { setResidualGraph } from "./utils"

/**
 * @param {Graph}
 * @param {number}
 * @param {number}
 */
export function cycleCanceling(graph: Graph, sourceNodeId: number, sinkNodeId: number): [number, number] {
    const maximumFlow = edmondsKarp(graph, sourceNodeId, sinkNodeId)

    setResidualGraph(graph)

    let negativeCycle = bellmanFord(graph, sourceNodeId)

    while (negativeCycle) {
        const residualCapacity = getResidualCapacity(graph, negativeCycle)

        sendFlow(graph, negativeCycle, residualCapacity)

        negativeCycle = bellmanFord(graph, sourceNodeId)
    }

    // Calculates the minimum cost.
    let minimumCost = 0
    for (const node of graph.getNodes()) {
        for (const arc of node.getArcs()) {
            if (arc.cost < 0) {
                minimumCost -= arc.cost
            }
        }
    }

    return [maximumFlow, minimumCost]
}

/**
 * Returns the arc minimum capacity of the path.
 * Time complexity: O(n).
 * @param {Graph} Graph containing the path.
 * @param {number[]} Path of the nodes.
 * @returns {number} Minimum capacity.
 */
function getResidualCapacity(graph: Graph, negativeCycle: number[]): number {
    let residualCapacity = Infinity

    for (let i = 0; i < negativeCycle.length - 1; i++) {
        const node = graph.getNode(negativeCycle[i])
        const arc = node.getArc(negativeCycle[i + 1])

        if (arc.flow < residualCapacity) {
            residualCapacity = arc.flow
        }
    }

    return residualCapacity
}

/**
 * Augments the path in the graph updating the flow of the arcs.
 * Time complexity: O(n).
 * @param {Graph} Graph containing the path.
 * @param {number[]} Path of the nodes.
 * @param {number} Capacity to carry in the path.
 */
function sendFlow(graph: Graph, negativeCycle: number[], flow: number) {
    for (let i = 0; i < negativeCycle.length - 1; i++) {
        const node = graph.getNode(negativeCycle[i])
        const arc = node.getArc(negativeCycle[i + 1])
        const adjacentNode = graph.getNode(arc.head)

        if (arc.flow === flow) {
            node.removeArc(adjacentNode.id)
        } else {
            arc.flow -= flow
        }

        if (!adjacentNode.hasArc(node.id)) {
            adjacentNode.addArc(new Arc(node.id, -arc.cost, arc.capacity, flow))
        } else {
            const reverseArc = adjacentNode.getArc(node.id)

            reverseArc.flow += flow
        }
    }
}
