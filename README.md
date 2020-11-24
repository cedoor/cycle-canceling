<p align="center">
    <h1 align="center">
        Cycle canceling algorithm <sup>work in progress</sup>
    </h1>
    <p align="center">TypeScript implementation of the cycle-canceling algorithm.</p>
</p>
    
<p align="center">
    <a href="https://github.com/cedoor/cycle-canceling/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/cedoor/cycle-canceling.svg?style=flat-square">
    </a>
    <a href="https://travis-ci.org/github/cedoor/cycle-canceling" target="_blank">
        <img src="https://img.shields.io/travis/cedoor/cycle-canceling?style=flat-square">
    </a>
    <img src="https://img.shields.io/github/languages/top/cedoor/cycle-canceling?style=flat-square">
</p>

The Cycle-Canceling algorithm solves the minimum-cost flow problem starting from a feasible graph obtained with a maximum flow algorithm and, as long as negative cost cycles exist, augment the flow along this cycles. This implementation uses the Edmonds-Karp algorithm to solve the maximum flow problem in O(n * m^2), and the Bellman-Fort algorithm to find the negative cycles in O(m * n). The total time complexity of this implementation is O(n * m^2 * C * U).

___

## Table of Contents
- 🛠 [Install](#install)
- 🕹 [Usage](#usage)
- 🔬 [Development](#development)
  - [Rules](#scroll-rules)
    - [Commits](https://github.com/cedoor/cedoor/tree/main/git#commits-rules)
    - [Branches](https://github.com/cedoor/cedoor/tree/main/git#branch-rules)
- 🧾 [MIT License](https://github.com/cedoor/cycle-canceling/blob/master/LICENSE)
- ☎️ [Contacts](#contacts)
  - [Developers](#developers)

## Install

With the following installed packages:
- git
- node
- yarn or npm

Clone the repo and install the dependencies from npm.

```bash
git clone https://github.com/cedoor/cycle-canceling.git
cd cycle-canceling
yarn # or npm i
```

## Usage

## Contacts
### Developers
* e-mail : me@cedoor.dev
* github : [@cedoor](https://github.com/cedoor)
* website : https://cedoor.dev
