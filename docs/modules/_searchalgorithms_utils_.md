> [Globals](../globals.md) / "searchAlgorithms/utils"

# Module: "searchAlgorithms/utils"

## Index

### Functions

* [retrievePath](_searchalgorithms_utils_.md#retrievepath)

## Functions

### retrievePath

▸ **retrievePath**(`visitedNodes`: Map\<number, number>, `sinkNode`: number): number[]

*Defined in [searchAlgorithms/utils.ts:9](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/searchAlgorithms/utils.ts#L9)*

Retrieves the path from the sink node to the source node
starting from the nodes visited by the search algorithm.
The source node has a parent node with '0' id.

#### Parameters:

Name | Type |
------ | ------ |
`visitedNodes` | Map\<number, number> |
`sinkNode` | number |

**Returns:** number[]

Path from the source node to the sink node.
