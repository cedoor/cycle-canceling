**[cycle-canceling](../README.md)**

> [Globals](../globals.md) / ["dataStructures/queue"](../modules/_datastructures_queue_.md) / Queue

# Class: Queue

Queue data structure allows you to perform FIFO
operations in constant time. JavaScript arrays
have 'shift' and 'push' methods but 'shift' take linear time.

## Hierarchy

* **Queue**

## Index

### Constructors

* [constructor](_datastructures_queue_.queue.md#constructor)

### Properties

* [end](_datastructures_queue_.queue.md#end)
* [front](_datastructures_queue_.queue.md#front)
* [store](_datastructures_queue_.queue.md#store)

### Methods

* [dequeue](_datastructures_queue_.queue.md#dequeue)
* [enqueue](_datastructures_queue_.queue.md#enqueue)
* [peek](_datastructures_queue_.queue.md#peek)
* [size](_datastructures_queue_.queue.md#size)

## Constructors

### constructor

\+ **new Queue**(): [Queue](_datastructures_queue_.queue.md)

*Defined in [dataStructures/queue.ts:9](https://github.com/cedoor/cycle-canceling/blob/639af49/src/dataStructures/queue.ts#L9)*

**Returns:** [Queue](_datastructures_queue_.queue.md)

## Properties

### end

• `Private` **end**: number

*Defined in [dataStructures/queue.ts:8](https://github.com/cedoor/cycle-canceling/blob/639af49/src/dataStructures/queue.ts#L8)*

___

### front

• `Private` **front**: number

*Defined in [dataStructures/queue.ts:7](https://github.com/cedoor/cycle-canceling/blob/639af49/src/dataStructures/queue.ts#L7)*

___

### store

• `Private` **store**: Record\<number, any>

*Defined in [dataStructures/queue.ts:9](https://github.com/cedoor/cycle-canceling/blob/639af49/src/dataStructures/queue.ts#L9)*

## Methods

### dequeue

▸ **dequeue**(): any \| undefined

*Defined in [dataStructures/queue.ts:32](https://github.com/cedoor/cycle-canceling/blob/639af49/src/dataStructures/queue.ts#L32)*

Removes an item from the queue and return its value.
Time complexity: O(1).

**Returns:** any \| undefined

The value stored in item.

___

### enqueue

▸ **enqueue**(`value`: any): void

*Defined in [dataStructures/queue.ts:22](https://github.com/cedoor/cycle-canceling/blob/639af49/src/dataStructures/queue.ts#L22)*

Adds an item to the end of the queue.
Time complexity: O(1).

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** void

___

### peek

▸ **peek**(): any \| undefined

*Defined in [dataStructures/queue.ts:59](https://github.com/cedoor/cycle-canceling/blob/639af49/src/dataStructures/queue.ts#L59)*

Returns the item at front of the queue without dequeuing.
Time complexity: O(1).

**Returns:** any \| undefined

The value stored in the item.

___

### size

▸ **size**(): number

*Defined in [dataStructures/queue.ts:50](https://github.com/cedoor/cycle-canceling/blob/639af49/src/dataStructures/queue.ts#L50)*

Returns the current size of the queue.
Time complexity: O(1).

**Returns:** number

Size of the queue.
