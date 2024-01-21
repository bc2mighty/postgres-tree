import { CategoryAttributes } from "../types/category.type";
import { Tree } from "./tree";

export const transformDbTree = async(dbTreeResult: CategoryAttributes[]) => {
    if(!dbTreeResult.length) return [];

    const rootNodePath = dbTreeResult[0].fullpath.split('.')
    const treeKeys = {
        [`${rootNodePath[rootNodePath.length - 1]}`]: dbTreeResult[0].id,
    }
    
    let parentNodeKey = dbTreeResult[0].id, newKey = null;
    const tree = new Tree(dbTreeResult[0].id, rootNodePath[rootNodePath.length - 1]);
    
    for(let i = 1; i < dbTreeResult.length;i++) {
        let {id, fullpath} = dbTreeResult[i];
        let splitPath = fullpath.split('.')
        if(!treeKeys[splitPath[splitPath.length - 2]]) continue;
        parentNodeKey = treeKeys[splitPath[splitPath.length - 2]].toString() as unknown as any;
        newKey = Number(`${id}`)
        treeKeys[splitPath[splitPath.length - 1]] = newKey;
        
        tree.insert(id, Number(parentNodeKey), splitPath[splitPath.length - 1])
    }
    
    return JSON.parse(JSON.stringify(tree));
}