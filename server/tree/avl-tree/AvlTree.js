const BinarySearchTree = require('../binary-search-tree/BinarySearchTree')
const BinarySearchTreeNode = require('../binary-search-tree/BinarySearchTreeNode')

class AvlTree extends BinarySearchTree {
	/**
	 * @param {*} value
	 */
	insert(value, word) {
		// Do the normal BST insert.
		super.insert(value, word)

		// Let's move up to the root and check balance factors along the way.
		let currentNode = this.root.find(value)
		while (currentNode) {
			this.balance(currentNode)
			currentNode = currentNode.parent
		}
	}

	/**
	 * @param {*} value
	 * @return {boolean}
	 */
	remove(value) {
		// Do standard BST removal.
		super.remove(value)

		// Balance the tree starting from the root node.
		this.balance(this.root)
	}

	/**
	 * @param {BinarySearchTreeNode} node
	 */
	balance(node) {
		if (node.balanceFactor < -1) {
			if (node.right.right === null) {
				this.rotateRight(node.right)
			}
			this.rotateLeft(node)
		} else if (node.balanceFactor > 1) {
			if (node.left.left === null) {
				this.rotateLeft(node.left)
			}
			this.rotateRight(node)
		}
	}

	// Left rotate at given node
	rotateLeft(rootNode) {
		const rightNode = rootNode.right
		const rightNodeLeftChild = rightNode.left
		const rightNodeRightChild = rightNode.right
		const newNode = new BinarySearchTreeNode(rootNode.value, rootNode.word)

		newNode.setRight(rightNodeLeftChild)
		newNode.setLeft(rootNode.left)
		rootNode.setValue(rightNode.value, rightNode.word)
		rootNode.setLeft(newNode)
		rootNode.setRight(rightNodeRightChild)
	}

	// Right rotate at given node
	rotateRight(rootNode) {
		const leftNode = rootNode.left
		const leftNodeLeftChild = leftNode.left
		const leftNodeRightChild = leftNode.right
		const newNode = new BinarySearchTreeNode(rootNode.value, rootNode.word)

		newNode.setLeft(leftNodeRightChild)
		newNode.setRight(rootNode.right)
		rootNode.setValue(leftNode.value, leftNode.word)
		rootNode.setLeft(leftNodeLeftChild)
		rootNode.setRight(newNode)
	}

	/**
	 * @param {BinarySearchTreeNode} rootNode
	 */
	rotateLeftLeft(rootNode) {
		// Detach left node from root node.
		const leftNode = rootNode.left
		rootNode.setLeft(null)

		// Make left node to be a child of rootNode's parent.
		if (rootNode.parent) {
			rootNode.parent.setLeft(leftNode)
		} else if (rootNode === this.root) {
			// If root node is root then make left node to be a new root.
			this.root = leftNode
		}

		// If left node has a right child then detach it and
		// attach it as a left child for rootNode.
		if (leftNode.right) {
			rootNode.setLeft(leftNode.right)
		}

		// Attach rootNode to the right of leftNode.
		leftNode.setRight(rootNode)
	}

	/**
	 * @param {BinarySearchTreeNode} rootNode
	 */
	rotateLeftRight(rootNode) {
		// Detach left node from rootNode since it is going to be replaced.
		const leftNode = rootNode.left
		rootNode.setLeft(null)

		// Detach right node from leftNode.
		const leftRightNode = leftNode.right
		leftNode.setRight(null)

		// Preserve leftRightNode's left subtree.
		if (leftRightNode.left) {
			leftNode.setRight(leftRightNode.left)
			leftRightNode.setLeft(null)
		}

		// Attach leftRightNode to the rootNode.
		rootNode.setLeft(leftRightNode)

		// Attach leftNode as left node for leftRight node.
		leftRightNode.setLeft(leftNode)

		// Do left-left rotation.
		this.rotateLeftLeft(rootNode)
	}

	/**
	 * @param {BinarySearchTreeNode} rootNode
	 */
	rotateRightLeft(rootNode) {
		// Detach right node from rootNode since it is going to be replaced.
		const rightNode = rootNode.right
		rootNode.setRight(null)

		// Detach left node from rightNode.
		const rightLeftNode = rightNode.left
		rightNode.setLeft(null)

		if (rightLeftNode.right) {
			rightNode.setLeft(rightLeftNode.right)
			rightLeftNode.setRight(null)
		}

		// Attach rightLeftNode to the rootNode.
		rootNode.setRight(rightLeftNode)

		// Attach rightNode as right node for rightLeft node.
		rightLeftNode.setRight(rightNode)

		// Do right-right rotation.
		this.rotateRightRight(rootNode)
	}

	/**
	 * @param {BinarySearchTreeNode} rootNode
	 */
	rotateRightRight(rootNode) {
		// Detach right node from root node.
		const rightNode = rootNode.right
		rootNode.setRight(null)

		// Make right node to be a child of rootNode's parent.
		if (rootNode.parent) {
			rootNode.parent.setRight(rightNode)
		} else if (rootNode === this.root) {
			// If root node is root then make right node to be a new root.
			this.root = rightNode
		}

		// If right node has a left child then detach it and
		// attach it as a right child for rootNode.
		if (rightNode.left) {
			rootNode.setRight(rightNode.left)
		}

		// Attach rootNode to the left of rightNode.
		rightNode.setLeft(rootNode)
	}
}

module.exports = AvlTree
