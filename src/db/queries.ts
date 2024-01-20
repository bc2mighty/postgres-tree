import { QueryTypes } from "sequelize"
import sequelize from "./sequelize"
import { CategoryAttributes } from "../types/category.type";

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
        type: QueryTypes.SELECT,
        replacements: [Number(id)],
    })
    return true;
}

const runQuery = async(query: string, replacements: any[], type: string) => {
    
}