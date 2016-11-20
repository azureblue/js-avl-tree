/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */
'use strict';

/**
 * Creates a new AVL Tree node..
 *
 * @param {Object} key The key of the new node.
 */
var Node = function (key) {
  this.left = null;
  this.right = null;
  this.key = key;
  this.height = null;
};

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
  this.height = Math.max(this.getLeftHeight(), this.getRightHeight()) + 1;
  other.height = Math.max(other.getLeftHeight(), this.height) + 1;
  return other;
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
  this.height = Math.max(this.getLeftHeight(), this.getRightHeight()) + 1;
  other.height = Math.max(other.getRightHeight(), this.height) + 1;
  return other;
};

/**
 * Convenience function to get the height of the left child of the node, returning -1 if the node
 * is null.
 *
 * @return {number} The height of the left child, or -1 if it doesn't exist.
 */
Node.prototype.getLeftHeight = function () {
  if (!this.left) {
    return -1;
  }
  return this.left.height;
};

/**
 * Convenience function to get the height of the right child of the node, returning -1 if the node
 * is null.
 *
 * @return {number} The height of the right child, or -1 if it doesn't exist.
 */
Node.prototype.getRightHeight = function () {
  if (!this.right) {
    return -1;
  }
  return this.right.height;
};

module.exports = Node;
