**[cycle-canceling](../README.md)**

> [Globals](../globals.md) / "searchAlgorithms/dfs"

# Module: "searchAlgorithms/dfs"

## Index

### Functions

* [dfs](_searchalgorithms_dfs_.md#dfs)

## Functions

### dfs

▸ **dfs**(`graph`: [Graph](../classes/_datastructures_graph_.graph.md), `sourceNode`: number, `sinkNode`: number): number[] \| undefined

*Defined in [searchAlgorithms/dfs.ts:14](https://github.com/cedoor/cycle-canceling/blob/639af49/src/searchAlgorithms/dfs.ts#L14)*

Modified version of the Depth-First Search algorithm to identify
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
