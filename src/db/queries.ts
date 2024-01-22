import { QueryTypes } from "sequelize"
import sequelize from "./sequelize"
import { CategoryAttributes } from "../types/category.type";

/**
 * 
 * @param label the name of the new category
 * @param labelPath spaces in label param that has been replaced by underscores
 * @param fullPath full tree path of the new category to be created
 * @returns the query result after inseriting a new category into the categories table
 */
export const createNewCategory = async(label: string, labelPath: string, fullPath: string) => {
    let query = 'INSERT INTO categories(label, labelPath, fullPath) VALUES(?, ?, ?)';
    const result = await sequelize.query(query, {
        type: QueryTypes.INSERT,
        replacements: [
            label,
            labelPath,
            fullPath,
        ]
    })
    return result;
}

/**
 * 
 * @param id the id of the root category which we want to fetch it's sub tree
 * @returns descendant categories of the root category
 */
export const fetchSubTree = async (id: string): Promise<CategoryAttributes[]> => {
    let query = `
        SELECT id, label, fullPath
        FROM categories
        WHERE fullPath <@ (
            SELECT fullPath
            FROM categories
            WHERE id = ?
        );
    `
    const result = await sequelize.query<CategoryAttributes>(query, {
        type: QueryTypes.SELECT,
        replacements: [Number(id)],
    })
    return result;
}

/**
 * 
 * @param id the id of the category which we want to fetch it's fullPath
 * @returns the fullPath column of the category
 */
export const fetchFullPath = async(id: string) => {
    let query = 'SELECT fullPath from categories where id = ?';
    const result = await sequelize.query<CategoryAttributes>(query, {
        type: QueryTypes.SELECT,
        replacements: [Number(id)],
    })
    return result;
}

/**
 * 
 * @param fullPath the fullPath of the category that we want to check
 * @returns count of the number of such fullPath that exists in the table
 */
export const fullPathExists = async(fullPath: string) => {
    let query = 'SELECT count(*) from categories where fullPath = ?';
    const result = await sequelize.query<CategoryAttributes & {count: string}>(query, {
        type: QueryTypes.SELECT,
        replacements: [fullPath],
    })
    const [{count}] = result;
    return count;
}

/**
 * 
 * @param parentFullPath fullPath of the parent category we want to bring a category into
 * @param categoryFullPath fullPath of the child category we want to move to a new parent
 * @returns true if the the operation is successful
 */
export const moveSubTree = async(parentFullPath: string, categoryFullPath: string) => {
    let query = `
        UPDATE categories 
        SET fullPath = ? || subpath(fullPath, nlevel(?) - 1, nlevel(fullPath))
        WHERE fullPath ~ ?;
    `;
    await sequelize.query(query, {
        type: QueryTypes.UPDATE,
        replacements: [
            parentFullPath,
            categoryFullPath,
            `${categoryFullPath}.*`
        ],
    })
    
    return true;
}

/**
 * 
 * @param id the id of the category we want to remove from the tree
 * @returns true if subtree is removed successfully
 */
export const removeSubTree = async(id: string): Promise<boolean> => {
    let query = `
        DELETE FROM categories where id IN(
        SELECT id
        FROM categories
        WHERE fullPath <@ (
            SELECT fullPath
            FROM categories
            WHERE id = ?
        )
        );
    `
    await sequelize.query(query, {
        type: QueryTypes.DELETE,
        replacements: [Number(id)],
    })
    return true;
}