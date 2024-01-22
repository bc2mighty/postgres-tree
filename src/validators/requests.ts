import { NextFunction, Request, Response } from "express";

export const validateCategoryParams = async(req: Request, res: Response, next: NextFunction) => {
    if (!req.body?.label || typeof req.body?.label !== 'string') {
        return res.status(400).json({
            error: 'Label can not be empty'
        })
    }

    if(req.body?.parentId && !Number.isInteger(req.body.parentId)) {
        return res.status(400).json({
            error: 'parent id must be an integer'
        })
    }
    next();
}

export const validateIdInParams = async(req: Request, res: Response, next: NextFunction) => {
    if(!req.params?.id || Number.isNaN(Number(req.params?.id))) {
        return res.status(400).json({
            error: 'route id must be an integer'
        })
    }
    next();
}

export const validateUpdateParams = async(req: Request, res: Response, next: NextFunction) => {
    const {newParentId, categoryId} = req.body;
    console.log(newParentId, categoryId);

    if(!Number.isInteger(newParentId)) {
        return res.status(400).json({
            error: 'new parent id must be an integer'
        })
    }
    
    if(!Number.isInteger(categoryId)) {
        return res.status(400).json({
            error: 'category id must be an integer'
        })
    }
    
    next();
}