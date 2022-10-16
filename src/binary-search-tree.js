const { NotImplementedError } = require('../extensions/index.js');
const {min} = require("mocha/lib/reporters");

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor(params) {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    let newNode = new Node(data);
    if (!this.treeRoot) {
      this.treeRoot = newNode;
    } else {
      this.addRecursion(this.treeRoot, newNode);
    }

  }

  addRecursion(currentNode, newNode) {
    if (currentNode.data > newNode.data) {
      if (currentNode.leftLeaf) {
        this.addRecursion(currentNode.leftLeaf, newNode);
      } else {
        currentNode.leftLeaf = newNode;
        newNode.parrent = currentNode;
      }
    } else {
      if (currentNode.rightLeaf) {
        this.addRecursion(currentNode.rightLeaf, newNode);
      } else {
        currentNode.rightLeaf = newNode;
        newNode.parrent = currentNode;
      }
    }
  }

  has(data) {
     return this.find(data) !== null;
  }

  find(data) {
    if (!this.treeRoot) {
     return null;
    } else {
      return this.findRecursion(this.treeRoot, data);
    }
  }

  findRecursion(currentNode, data) {
    if (data === currentNode.data) {
      return currentNode;
    } else if (data > currentNode.data) {
      if (currentNode.rightLeaf) {
        return this.findRecursion(currentNode.rightLeaf, data)
      } else {
        return null;
      }
    } else {
      if (currentNode.leftLeaf) {
        return this.findRecursion(currentNode.leftLeaf, data)
      } else {
        return null;
      }
    }
  }

  remove(data) {
    if (!this.treeRoot || !this.has(data)) {
      return;
    }

    let currentNode = this.find(data);
    let parentNode = currentNode.parrent;

    if(!parentNode) {
      if (currentNode.leftLeaf && currentNode.rightLeaf) {
        this.treeRoot = currentNode.rightLeaf;
        let minValue = this.minInternal(currentNode.rightLeaf);
        minValue.leftLeaf = currentNode.leftLeaf;
        currentNode.leftLeaf.parrent = minValue;
      } else if (currentNode.leftLeaf) {
        this.treeRoot = currentNode.leftLeaf;
      } else if (currentNode.rightLeaf) {
        this.treeRoot = currentNode.rightLeaf;
      } else {
        this.treeRoot = null;
      }
    } else if (currentNode.data > parentNode.data) {
      if (currentNode.leftLeaf && currentNode.rightLeaf) {
        parentNode.rightLeaf = currentNode.rightLeaf;
        currentNode.rightLeaf.parrent = parentNode;
        let minValue = this.minInternal(currentNode.rightLeaf);
        minValue.leftLeaf = currentNode.leftLeaf;
        currentNode.leftLeaf.parrent = minValue;
      } else if (currentNode.leftLeaf) {
        parentNode.rightLeaf = currentNode.leftLeaf;
        currentNode.leftLeaf.parrent = parentNode;
      } else if (currentNode.rightLeaf) {
        parentNode.rightLeaf = currentNode.rightLeaf;
        currentNode.rightLeaf.parrent = parentNode;
      } else {
        parentNode.rightLeaf = null;
      }
    } else {
      if (currentNode.leftLeaf && currentNode.rightLeaf) {
        parentNode.leftLeaf = currentNode.rightLeaf;
        currentNode.rightLeaf.parrent = parentNode;
        let minValue = this.minInternal(currentNode.rightLeaf);
        minValue.leftLeaf = currentNode.leftLeaf;
        currentNode.leftLeaf.parrent = minValue;
      } else if (currentNode.leftLeaf) {
        parentNode.leftLeaf = currentNode.leftLeaf;
        currentNode.leftLeaf.parrent = parentNode;
      } else if (currentNode.rightLeaf) {
        parentNode.rightLeaf = currentNode.rightLeaf;
        currentNode.rightLeaf.parrent = parentNode;
      } else {
        parentNode.leftLeaf = null;
      }
    }
  }

  min() {
    if (!this.treeRoot) {
      return null;
    }
    let node = this.minInternal(this.treeRoot);
    return node ? node.data : null;
  }

  minInternal(currentNode) {
    while (true) {
      if (currentNode.leftLeaf) {
        currentNode = currentNode.leftLeaf;
      } else {
        return currentNode;
      }
    }
  }

  max() {
    if (!this.treeRoot) {
      return null;
    }

    let node = this.maxInternal(this.treeRoot);
    return node ? node.data : null;
  }
  maxInternal(currentNode) {
    while (true) {
      if (currentNode.rightLeaf) {
        currentNode = currentNode.rightLeaf;
      } else {
        return currentNode;
      }
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.rightLeaf = null;
    this.leftLeaf = null;
    this.parrent = null;
  }
}

module.exports = {
  BinarySearchTree
};