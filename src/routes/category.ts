import { Router } from "express";
import { addCategory, getCategorySubTree, removeCategorySubtree, updateCategorySubTree } from "../controllers/category";
export const router = Router();

router.post('/', addCategory);

router.get('/:id', getCategorySubTree);

router.patch('/', updateCategorySubTree);

router.delete('/:id', removeCategorySubtree);