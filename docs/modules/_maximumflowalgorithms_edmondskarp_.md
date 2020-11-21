**[cycle-canceling](../README.md)**

> [Globals](../globals.md) / "maximumFlowAlgorithms/edmondsKarp"

# Module: "maximumFlowAlgorithms/edmondsKarp"

## Index

### Functions

* [edmondsKarp](_maximumflowalgorithms_edmondskarp_.md#edmondskarp)
* [getMinimumCapacity](_maximumflowalgorithms_edmondskarp_.md#getminimumcapacity)
* [updateResidualCapacities](_maximumflowalgorithms_edmondskarp_.md#updateresidualcapacities)

## Functions

### edmondsKarp

▸ **edmondsKarp**(`graph`: [Graph](../classes/_datastructures_graph_.graph.md), `sourceNode`: number, `sinkNode`: number): number

*Defined in [maximumFlowAlgorithms/edmondsKarp.ts:17](https://github.com/cedoor/cycle-canceling/blob/639af49/src/maximumFlowAlgorithms/edmondsKarp.ts#L17)*

Edmonds–Karp algorithm (https://doi.org/10.1145%2F321694.321699) is an
implementation of the Ford–Fulkerson method for computing the maximum
flow between two nodes in a flow network. The algorithm uses the
Breadth First Search algorithm to find the augmenting path between the
source and the sink node, and increment the maximum flow with the minimum
arc capacity for each path creating the residual graph.
Time complexity: O(n * m^2).

#### Parameters:

Name | Type |
------ | ------ |
`graph` | [Graph](../classes/_datastructures_graph_.graph.md) |
`sourceNode` | number |
`sinkNode` | number |

**Returns:** number

Maximum flow from the source to the sink node.

___

### getMinimumCapacity

▸ **getMinimumCapacity**(`graph`: [Graph](../classes/_datastructures_graph_.graph.md), `path`: number[]): number

*Defined in [maximumFlowAlgorithms/edmondsKarp.ts:43](https://github.com/cedoor/cycle-canceling/blob/639af49/src/maximumFlowAlgorithms/edmondsKarp.ts#L43)*

Returns the arc minimum capacity of the path.
Time complexity: O(n).

#### Parameters:

Name | Type |
------ | ------ |
`graph` | [Graph](../classes/_datastructures_graph_.graph.md) |
`path` | number[] |

**Returns:** number

Minimum capacity.

___

### updateResidualCapacities

▸ **updateResidualCapacities**(`graph`: [Graph](../classes/_datastructures_graph_.graph.md), `path`: number[], `capacity`: number): void

*Defined in [maximumFlowAlgorithms/edmondsKarp.ts:66](https://github.com/cedoor/cycle-canceling/blob/639af49/src/maximumFlowAlgorithms/edmondsKarp.ts#L66)*

Augments the path in the graph updating the capacities and
building a residual graph.
Time complexity: O(n).

#### Parameters:

Name | Type |
------ | ------ |
`graph` | [Graph](../classes/_datastructures_graph_.graph.md) |
`path` | number[] |
`capacity` | number |

**Returns:** void
