import { Request, Response } from "express";
import { createNewCategory, fetchFullPath, fetchSubTree, fullPathExists, moveSubTree, removeSubTree } from "../db/queries";
import { transformDbTree } from "../utils/serialize";

/**
 * 
 * @param req: Request
 * @param res: Response
 * @returns status code 201 when a category is created
 * or 400 if something goes wrong, with a clear message
 */
export const addCategory = async(req: Request, res: Response) => {
    try {
        let queryResult;
        const {label, parentId} = req.body;
        const labelPath = label.toString().replace(/ /g, '_')
        let fullPath = labelPath;
        
        // check if parent category exists and reset fullPath
        if(parentId) {
            let [parent] = await fetchFullPath(parentId)
            if(!parent) {
                return res.status(400).json({
                    message: `Parent Category with id '${parentId}' not found`
                })
            }
            if(parent) fullPath = `${parent?.fullpath}.${labelPath}`
        }

        // check if new category fullpath exists
        if(fullPath) {
            let count = await fullPathExists(fullPath);
            if(Number(count) > 0) {
                return res.status(400).json({
                    message: 'Category exists already in this path'
                })
            }
        }
        // queryResult = await createNewCategory(label, labelPath, fullPath);
        return res.status(201).json({
            message: 'Category Created Successfully'
        })
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
}

/**
 * 
 * @param req: Express Request
 * @param res: Express Response
 * @returns Subtree of category with the id provided in req.body
 */
export const getCategorySubTree = async(req: Request, res: Response) => {
    const {id} = req.params;
    let queryResult;
    try {
        queryResult = await fetchSubTree(id as string);
        
        let subTree = await transformDbTree(queryResult);
        
        return res.status(!subTree ? 404 : 200).json(
            !subTree 
                ? {message: `No Category found with id: ${id}`}
                : subTree.root
            );
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
}

/**
 * 
 * @param req: Express Request
 * @param res: Express Response
 * @returns a message saying that the sub tree has been moved to a new parent
 * or an error message and appropriate status code if something goes wrong
 */
export const updateCategorySubTree = async(req: Request, res: Response) => {
    const {categoryId, newParentId} = req.body;
    try {
        const [categoryFullPath] = await fetchFullPath(categoryId);
        if(!categoryFullPath) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }
        
        const [parentFullPath] = await fetchFullPath(newParentId);
        if(!parentFullPath) {
            return res.status(404).json({
                message: 'Parent Category not found',
            });
        }
        await moveSubTree(parentFullPath.fullpath, categoryFullPath.fullpath);
        
        return res.status(200).json({
            message: `Category moved successfully`
        });
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
}

/**
 * 
 * @param req: Express Request
 * @param res: Express Response
 * @returns a message stating that a category has been removed
 * or an error message and appropriate status code if something goes wrong
 */
export const removeCategorySubtree = async(req: Request, res: Response) => {
    const {id} = req.params;
    let queryResult;
    try {
        const [categoryFullPath] = await fetchFullPath(id);
        if(!categoryFullPath) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }

        queryResult = await removeSubTree(id as string);
        
        return res.status(200).json({message: 'Category Removed Successfully'});
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
}