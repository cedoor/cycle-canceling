import Graph, { GraphData } from "./dataStructures/graph"
import { cycleCanceling as _cycleCanceling } from "./minimumCostFlowAlgorithms"

export default function cycleCanceling(graphData: GraphData): [number, number] {
    const graph = new Graph(graphData)

    return _cycleCanceling(graph)
}
