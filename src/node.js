/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 * Copyright 2017 azureblue <https://github.com/azureblue>
 */
'use strict';

/**
 * Creates a new AVL Tree node.
 *
 * @private
 * @param {Object} key The key of the new node.
 * @param {Object} value The value of the new node.
 */
function Node (key, value) {
  this.left = null;
  this.right = null;
  this.height = null;
  this.weight = 1;
  this.key = key;
  this.value = value;
}

/**
 * Performs a right rotate on this node.
 *
 *       b                           a
 *      / \                         / \
 *     a   e -> b.rotateRight() -> c   b
 *    / \                             / \
 *   c   d                           d   e
 *
 * @return {Node} The root of the sub-tree; the node where this node used to be.
 */
Node.prototype.rotateRight = function () {
  var other = this.left;
  this.left = other.right;
  other.right = this;
  this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
  other.height = Math.max(other.leftHeight(), this.height) + 1;
  this.updateWeight();
  other.updateWeight();
  return other;
};

Node.prototype.updateWeight = function () {
  this.weight = 1;
  if (this.left)
    this.weight += this.left.weight;
  if (this.right)
    this.weight += this.right.weight;
};

/**
 * Performs a left rotate on this node.
 *
 *     a                              b
 *    / \                            / \
 *   c   b   -> a.rotateLeft() ->   a   e
 *      / \                        / \
 *     d   e                      c   d
 *
 * @return {Node} The root of the sub-tree; the node where this node used to be.
 */
Node.prototype.rotateLeft = function () {
  var other = this.right;
  this.right = other.left;
  other.left = this;
  this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
  other.height = Math.max(other.rightHeight(), this.height) + 1;
  this.updateWeight();
  other.updateWeight();
  return other;
};

/**
 * Convenience function to get the height of the left child of the node,
 * returning -1 if the node is null.
 *
 * @return {number} The height of the left child, or -1 if it doesn't exist.
 */
Node.prototype.leftHeight = function () {
  if (!this.left) {
    return -1;
  }
  return this.left.height;
};

/**
 * Convenience function to get the height of the right child of the node,
 * returning -1 if the node is null.
 *
 * @return {number} The height of the right child, or -1 if it doesn't exist.
 */
Node.prototype.rightHeight = function () {
  if (!this.right) {
    return -1;
  }
  return this.right.height;
};

Node.prototype.leftWeight = function () {
    if (!this.left) {
        return 0;
    }
    return this.left.weight;
};

Node.prototype.rightWeight = function () {
    if (!this.right) {
        return 0;
    }
    return this.right.weight;
};
