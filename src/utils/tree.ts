import { FolderAttributes } from "../types/category.type";

export class TreeNode<FolderAttributes> {
    key: number;
    id: number;
    label: string;
    children: Array<FolderAttributes>;

    constructor(id: number, key: number, value: string, parent = null) {
      this.key = key;
      this.id = id;
      this.label = value;
      this.children = [];
    }
  
    get isLeaf() {
      return this.children.length === 0;
    }
  
    get hasChildren() {
      return !this.isLeaf;
    }
}

export class Tree {
  root: FolderAttributes;
  constructor(id: number, key: number, value: string) {
    this.root = new TreeNode(id, key, value);
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

  insert(id: number, parentNodeKey: number, key: number, value: string) {
    let nodes = this.postOrderTraversal();
    if(!Array.isArray(nodes)) nodes = [nodes];
    for (let node of nodes) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(id, key, value));
        return true;
      }
    }
    return false;
  }
}