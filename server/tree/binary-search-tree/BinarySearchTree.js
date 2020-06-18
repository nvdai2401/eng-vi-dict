const BinarySearchTreeNode = require('./BinarySearchTreeNode')

class BinarySearchTree {
	/**
	 * @param {function} [nodeValueCompareFunction]
	 */
	constructor(nodeValueCompareFunction) {
		this.root = new BinarySearchTreeNode(null, null, nodeValueCompareFunction)

		// Steal node comparator from the root.
		this.nodeComparator = this.root.nodeComparator
	}

	/**
	 * @param {*} value
	 * @return {BinarySearchTreeNode}
	 */
	insert(value, word) {
		return this.root.insert(value, word)
	}

	/**
	 * @param {*} value
	 * @return {boolean}
	 */
	contains(value) {
		return this.root.contains(value)
	}

	/**
	 * @param {*} value
	 * @return {boolean}
	 */
	find(value) {
		return this.root.find(value)
	}

	/**
	 * @param {*} value
	 * @return {boolean}
	 */
	findSuggestions(value) {
		return this.root.findSuggestions(value)
	}

	/**
	 * @param {*} value
	 * @return {boolean}
	 */
	remove(value) {
		return this.root.remove(value)
	}

	/**
	 * @return {string}
	 */
	toString() {
		return this.root.toString()
	}
}

module.exports = BinarySearchTree
