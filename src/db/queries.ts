import { QueryTypes } from "sequelize"
import sequelize from "./sequelize"
import { CategoryAttributes } from "../types/category.type";

export const createCategory = async(label: string, labelPath: string, fullPath: string) => {
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
 * @param fullPath 
 * @returns 
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