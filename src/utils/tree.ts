import { FolderAttributes } from "../types/category.type";

/**
 * A class that represents  each category
 */
export class TreeNode<FolderAttributes> {
    id: number;
    label: string;
    children: Array<FolderAttributes>;

    constructor(id: number, value: string) {
      this.id = id;
      this.label = value;
      this.children = [];
    }
}

/**
 * The tree class that serializes the query result fetched from the tree database
 */
export class Tree {
  root: FolderAttributes;
  constructor(id: number, value: string) {
    this.root = new TreeNode(id, value);
  }

  /**
   * 
   * @param node accepts an instance of TreeNode Class
   * @returns an array of TreeNode class after a traversal
   */
  postOrderTraversal(node = this.root): any {
    if (node.children.length === 0) {
      return node;
    } else {
      var arr: Array<FolderAttributes> = [];
      for (var i = 0; i < node.children.length; i++) {
        var children = this.postOrderTraversal(node.children[i]);
        arr = arr.concat(children);
      }
      arr.push(node);
      return arr;
    }
  }

  /**
   * 
   * @param id the id of an instance of a TreeNode class
   * @param parentNodeId id of the TreeNode instance that we want to add to it's children
   * @param value 
   * @returns true if it adds the child Node
   * @returns false if it doesn't add the child Node
   */
  insert(id: number, parentNodeId: number, value: string) {
    let nodes = this.postOrderTraversal();
    if(!Array.isArray(nodes)) nodes = [nodes];
    for (let node of nodes) {
      if (node.id === parentNodeId) {
        node.children.push(new TreeNode(id, value));
        return true;
      }
    }
    return false;
  }
}