> [Globals](../globals.md) / ["dataStructures/graph"](../modules/_datastructures_graph_.md) / Node

# Class: Node

## Hierarchy

* **Node**

## Index

### Constructors

* [constructor](_datastructures_graph_.node.md#constructor)

### Properties

* [arcs](_datastructures_graph_.node.md#arcs)
* [balance](_datastructures_graph_.node.md#balance)
* [id](_datastructures_graph_.node.md#id)

### Methods

* [addArc](_datastructures_graph_.node.md#addarc)
* [getArc](_datastructures_graph_.node.md#getarc)
* [getArcs](_datastructures_graph_.node.md#getarcs)
* [hasArc](_datastructures_graph_.node.md#hasarc)
* [removeArc](_datastructures_graph_.node.md#removearc)

## Constructors

### constructor

\+ **new Node**(`id`: number, `balance`: number, `arcs?`: [Arc](_datastructures_graph_.arc.md)[]): [Node](_datastructures_graph_.node.md)

*Defined in [dataStructures/graph.ts:48](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L48)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`id` | number | - |
`balance` | number | - |
`arcs` | [Arc](_datastructures_graph_.arc.md)[] | [] |

**Returns:** [Node](_datastructures_graph_.node.md)

## Properties

### arcs

• `Private` **arcs**: Map\<number, [Arc](_datastructures_graph_.arc.md)>

*Defined in [dataStructures/graph.ts:48](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L48)*

___

### balance

•  **balance**: number

*Defined in [dataStructures/graph.ts:46](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L46)*

___

### id

•  **id**: number

*Defined in [dataStructures/graph.ts:45](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L45)*

## Methods

### addArc

▸ **addArc**(`head`: number, `cost`: number, `capacity`: number, `maximumCapacity`: number): void

*Defined in [dataStructures/graph.ts:56](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L56)*

#### Parameters:

Name | Type |
------ | ------ |
`head` | number |
`cost` | number |
`capacity` | number |
`maximumCapacity` | number |

**Returns:** void

___

### getArc

▸ **getArc**(`head`: number): [Arc](_datastructures_graph_.arc.md)

*Defined in [dataStructures/graph.ts:70](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L70)*

#### Parameters:

Name | Type |
------ | ------ |
`head` | number |

**Returns:** [Arc](_datastructures_graph_.arc.md)

___

### getArcs

▸ **getArcs**(): Map\<number, [Arc](_datastructures_graph_.arc.md)>

*Defined in [dataStructures/graph.ts:80](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L80)*

**Returns:** Map\<number, [Arc](_datastructures_graph_.arc.md)>

___

### hasArc

▸ **hasArc**(`head`: number): boolean

*Defined in [dataStructures/graph.ts:66](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`head` | number |

**Returns:** boolean

___

### removeArc

▸ **removeArc**(`head`: number): void

*Defined in [dataStructures/graph.ts:62](https://github.com/cedoor/cycle-canceling/blob/62db7a4/src/dataStructures/graph.ts#L62)*

#### Parameters:

Name | Type |
------ | ------ |
`head` | number |

**Returns:** void
