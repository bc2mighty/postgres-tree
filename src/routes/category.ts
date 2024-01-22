import { Router } from "express";
import { addCategory, getCategorySubTree, removeCategorySubtree, updateCategorySubTree } from "../controllers/category";
import { validateCategoryParams, validateIdInParams, validateUpdateParams } from "../validators/requests";
export const router = Router();

router.post('/', validateCategoryParams, addCategory);

router.get('/:id', validateIdInParams, getCategorySubTree);

router.patch('/', validateUpdateParams, updateCategorySubTree);

router.delete('/:id', validateIdInParams, removeCategorySubtree);