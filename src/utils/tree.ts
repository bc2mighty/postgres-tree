import { FolderAttributes } from "../types/category.type";

export class TreeNode<FolderAttributes> {
    // key: number;
    id: number;
    label: string;
    children: Array<FolderAttributes>;

    constructor(id: number, value: string, parent = null) {
      // this.key = key;
      this.id = id;
      this.label = value;
      this.children = [];
    }
}

export class Tree {
  root: FolderAttributes;
  constructor(id: number, value: string) {
    this.root = new TreeNode(id, value);
  }

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