> [Globals](../globals.md) / ["dataStructures/graph"](../modules/_datastructures_graph_.md) / Graph

# Class: Graph

## Hierarchy

* **Graph**

## Index

### Constructors

* [constructor](_datastructures_graph_.graph.md#constructor)

### Properties

* [nodes](_datastructures_graph_.graph.md#nodes)

### Methods

* [addNode](_datastructures_graph_.graph.md#addnode)
* [checkIntegrity](_datastructures_graph_.graph.md#checkintegrity)
* [getNode](_datastructures_graph_.graph.md#getnode)

## Constructors

### constructor

\+ **new Graph**(`graphData?`: [GraphData](../modules/_datastructures_graph_.md#graphdata)): [Graph](_datastructures_graph_.graph.md)

*Defined in [dataStructures/graph.ts:2](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L2)*

#### Parameters:

Name | Type |
------ | ------ |
`graphData?` | [GraphData](../modules/_datastructures_graph_.md#graphdata) |

**Returns:** [Graph](_datastructures_graph_.graph.md)

## Properties

### nodes

• `Private` **nodes**: Map\<number, [Node](_datastructures_graph_.node.md)>

*Defined in [dataStructures/graph.ts:2](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L2)*

## Methods

### addNode

▸ **addNode**(`node`: [Node](_datastructures_graph_.node.md)): void

*Defined in [dataStructures/graph.ts:17](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | [Node](_datastructures_graph_.node.md) |

**Returns:** void

___

### checkIntegrity

▸ **checkIntegrity**(): boolean

*Defined in [dataStructures/graph.ts:31](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L31)*

**Returns:** boolean

___

### getNode

▸ **getNode**(`id`: number): [Node](_datastructures_graph_.node.md)

*Defined in [dataStructures/graph.ts:21](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L21)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | number |

**Returns:** [Node](_datastructures_graph_.node.md)
