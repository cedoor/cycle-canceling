**[cycle-canceling](../README.md)**

> [Globals](../globals.md) / "searchAlgorithms/bfs"

# Module: "searchAlgorithms/bfs"

## Index

### Functions

* [bfs](_searchalgorithms_bfs_.md#bfs)

## Functions

### bfs

▸ **bfs**(`graph`: [Graph](../classes/_datastructures_graph_.graph.md), `sourceNode`: number, `sinkNode`: number): number[] \| undefined

*Defined in [searchAlgorithms/bfs.ts:15](https://github.com/cedoor/cycle-canceling/blob/639af49/src/searchAlgorithms/bfs.ts#L15)*

Modified version of the Breadth-First Search algorithm to identify
a specific directed path between a source node and a sink node.
The algorithm return an array with the nodes of the path.
Time complexity: O(n + m).

#### Parameters:

Name | Type |
------ | ------ |
`graph` | [Graph](../classes/_datastructures_graph_.graph.md) |
`sourceNode` | number |
`sinkNode` | number |

**Returns:** number[] \| undefined

Path between source node and sink node.
