<p align="center">
    <h1 align="center">
        Network flow algorithms
    </h1>
    <p align="center">TypeScript implementation of some network flow algorithms.</p>
</p>
    
<p align="center">
    <a href="https://github.com/cedoor/network-flow-algorithms/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/cedoor/network-flow-algorithms.svg?style=flat-square">
    </a>
    <a href="https://travis-ci.org/github/cedoor/network-flow-algorithms" target="_blank">
        <img src="https://img.shields.io/travis/cedoor/network-flow-algorithms?style=flat-square">
    </a>
    <img src="https://img.shields.io/github/languages/top/cedoor/network-flow-algorithms?style=flat-square">
</p>


## Implemented algorithms

* Search problem
    * [**Depth-first search**](https://nfa.cedoor.dev/globals.html#dfs): *O(n + m)* = *O(m)*
    * [**Breadth-first search**](https://nfa.cedoor.dev/globals.html#bfs): *O(n + m)* = *O(m)*
* Shortest path problem
    * [**Bellman-Ford**](https://nfa.cedoor.dev/globals.html#bellmanford): *O(n * m)*
* Maximum flow problem
    * [**Edmonds-Karp**](https://nfa.cedoor.dev/globals.html#edmondskarp): *O(n * m^2)*
* Minimum-cost flow problem
    * [**Cycle-canceling**](https://nfa.cedoor.dev/globals.html#cyclecanceling): *O(n * m^2 * C * U)*
    
Where: 
* n: n° of nodes,
* m: n° of arcs,
* C: largest magnitude of any arc cost,
* U: largest magnitude of any supply/demand or finite arc capacity.

> The algorithms use the concepts, definitions and notations expressed in the book *Network Flows: Theory, Algorithms, and Applications, Ravindra K. Ahuja, Thomas L. Magnanti, and James B. Orlin*.

___

## Table of Contents
- 🛠 [Install](#install)
- 🕹 [Usage](#usage)
- 🔬 [Development](#development)
  - [Rules](#scroll-rules)
    - [Commits](https://github.com/cedoor/cedoor/tree/main/git#commits-rules)
    - [Branches](https://github.com/cedoor/cedoor/tree/main/git#branch-rules)
- 🧾 [MIT License](https://github.com/cedoor/network-flow-algorithms/blob/master/LICENSE)
- ☎️ [Contacts](#contacts)
  - [Developers](#developers)

## Install

### npm or yarn

You can install utils package with npm:

```bash
npm i @cedoor/nfa --save
```
or with yarn:

```bash
yarn add @cedoor/nfa
```

### CDN

You can also load it using a `script` tap using [unpkg](https://unpkg.com/):

```bash
<script src="https://unpkg.com/@cedoor/nfa/"></script>
```

or [JSDelivr](https://www.jsdelivr.com/):

```bash
<script src="https://cdn.jsdelivr.net/npm/@cedoor/nfa/"></script>
```

## Usage

The library documentation is automatically generated with [TypeDoc](https://typedoc.org/) and published on [nfa.cedoor.dev](https://nfa.cedoor.dev)
and can be used on Node.js and browsers with different types of modules (AMD, CommonJS, ES modules). Here some examples:

```javascript
// Imports the module with ES modules.
import { Graph, Node, Arc, dfs, bellmanFord, edmondsKarp, cycleCanceling } from "@cedoor/nfa"
// Or with commonJS modules.
// const { Graph, Node, Arc, dfs, bellmanFord, edmondsKarp, cycleCanceling } = require("@cedoor/nfa")
// Or with the global variable 'nfo' on the browser side.

const graph = new Graph()

// Creates the nodes with the outgoing arcs.
const node1 = new Node(1, 10, [new Arc(2, 3, 10), new Arc(3, 5, 18)])
const node2 = new Node(2, 0, [new Arc(3, 8, 12)])
const node3 = new Node(3, 0, [new Arc(4, 4, 20)])
const node4 = new Node(4, -10, [])

graph.addNode(node1)
graph.addNode(node2)
graph.addNode(node3)
graph.addNode(node4)

const tree = dfs(graph, 1)
const tree2 = bellmanFord(graph, 1)
const [, maximumFlow] = edmondsKarp(graph)
const [, , minimumCost] = cycleCanceling(graph)

// 'tree' is a JS Map containing node/previous-node pairs.
// The source node always has -1 as its previous node.
console.log(tree) // Map { 1 => -1, 2 => 1, 3 => 1, 4 => 3 }

// 'tree2' is a JS Map containing node/[previous-node, distance] pairs.
console.log(tree2) // Map { 2 => [ 1, 3 ], 3 => [ 1, 5 ], 4 => [ 3, 9 ] }
console.log(maximumFlow) // 10
console.log(minimumCost) // 9
```

Algorithms can also take the `graph` parameter as JSON:

```json
[
    {
        "id": 1,
        "balance": 10,
        "arcs": [
            {
                "head": 2,
                "cost": 3,
                "capacity": 10,
                "flow": 0
            },
            {
                "head": 3,
                "cost": 5,
                "capacity": 18,
                "flow": 0
            }
        ]
    },
    {
        "id": 2,
        "balance": 0,
        "arcs": [
            {
                "head": 3,
                "cost": 8,
                "capacity": 12,
                "flow": 0
            }
        ]
    },
    {
        "id": 3,
        "balance": 0,
        "arcs": [
            {
                "head": 4,
                "cost": 4,
                "capacity": 20,
                "flow": 0
            }
        ]
    },
    {
        "id": 4,
        "balance": -10,
        "arcs": []
    }
]
```

## Contacts
### Developers
* e-mail : me@cedoor.dev
* github : [@cedoor](https://github.com/cedoor)
* website : https://cedoor.dev
