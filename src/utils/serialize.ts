import { CategoryAttributes } from "../types/category.type";
import { Tree } from "./tree";

/**
 * 
 * @param dbTreeResult the database query result from the tree database
 * @returns 
 */
export const transformDbTree = async(dbTreeResult: CategoryAttributes[]) => {
    if(!dbTreeResult.length) return false;

    const rootNodePath = dbTreeResult[0].fullpath.split('.');

    // Stores the id of every node visited
    const treeKeys = {
        [`${rootNodePath[rootNodePath.length - 1]}`]: dbTreeResult[0].id,
    }
    let parentNodeKey = dbTreeResult[0].id, newKey = null;

    // Created a new Tree
    const tree = new Tree(dbTreeResult[0].id, rootNodePath[rootNodePath.length - 1]);
    
    // Iterate through the query results and create a tree structure
    for(let i = 1; i < dbTreeResult.length;i++) {
        let {id, fullpath} = dbTreeResult[i];
        let splitPath = fullpath.split('.')
        if(!treeKeys[splitPath[splitPath.length - 2]]) continue;
        parentNodeKey = treeKeys[splitPath[splitPath.length - 2]].toString() as unknown as any;
        newKey = Number(`${id}`)
        treeKeys[splitPath[splitPath.length - 1]] = newKey;
        
        tree.insert(id, Number(parentNodeKey), splitPath[splitPath.length - 1])
    }
    
    // Return the hierarchical tree structure
    return JSON.parse(JSON.stringify(tree));
}