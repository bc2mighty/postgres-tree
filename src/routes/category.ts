import { Router, Request, Response } from "express";
import sequelize from "../db/sequelize";
import { QueryTypes } from "sequelize";
import { CategoryAttributes } from "../types/category.type";
import { fetchSubTree, removeSubTree } from "../db/queries";
import { transformDbTree } from "../utils/transformer";
import { log } from "console";
export const router = Router();

router.post('/', async(req: Request, res: Response) => {
    try {
        let parent, queryResponse;
        const {label, parentId} = req.body;
        const labelPath = label.replace(/ /g, '_')
        let fullPath = labelPath;
        // check if parent exists and reset fullPath
        if(parentId) {
            queryResponse = await sequelize.query<CategoryAttributes>('SELECT fullPath from categories where id = ?', {
                type: QueryTypes.SELECT,
                replacements: [parentId],
            })
            console.log(queryResponse);
            let [parent] = queryResponse
            if(parent) fullPath = `${parent?.fullpath}.${labelPath}`
        }
        // check if fullpath exists and return false
        if(fullPath) {
            queryResponse = await sequelize.query<CategoryAttributes & {count: string}>('SELECT count(*) from categories where fullPath = ?', {
                type: QueryTypes.SELECT,
                replacements: [fullPath],
            })
            let [countObj] = queryResponse;
            if(countObj && Number(countObj.count) > 0) {
                return res.status(400).json({
                    message: 'Category Exists already'
                })
            }
        }
        queryResponse = await sequelize.query('INSERT INTO categories(label, labelPath, fullPath) VALUES(?, ?, ?)', {
            type: QueryTypes.INSERT,
            replacements: [
                label,
                labelPath,
                fullPath,
            ]
        })
        return res.status(201).json({
            message: 'Category Created Successfully'
        })
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
});

router.get('/:id', async(req: Request, res: Response) => {
    const {id} = req.params;
    let queryResponse;
    try {
        queryResponse = await fetchSubTree(id as string);
        console.log(`queryResponse: `, queryResponse);
        
        let subTree = await transformDbTree(queryResponse);
        
        return res.status(200).json(subTree.root);
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
});

router.delete('/:id', async(req: Request, res: Response) => {
    const {id} = req.params;
    let queryResponse;
    try {
        queryResponse = await removeSubTree(id as string);
        
        return res.sendStatus(204);
    } catch(error) {
        console.log(error);
        return res.status(400).json({
            message: 'Bad Request'
        })
    }
})