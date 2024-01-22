import { createNewCategory } from "../db/queries";
import sequelize from "../db/sequelize";

jest.mock('../db/queries', () => {
    return {
        createNewCategory: jest.fn().mockReturnValue({message: 'Category created successfully'}),
        fullPathExists: jest.fn().mockReturnValue([{count: 1}])
    }
})

jest.mock("../db/sequelize", () => {
    return {
        query: jest.fn(),
        authenticate: jest.fn()
    }
})

describe('Query Mocks', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should create a category', async() => {
        const label = '1', labelPath = '1', fullPath = '1';
        const result = await createNewCategory(label, labelPath, fullPath);
        console.log(result);
        expect(createNewCategory).toHaveBeenCalled();
        expect(result).toHaveProperty('message')
    })

    test('should call seqeulize methods', async() => {
        expect(sequelize.query).toHaveBeenCalled();
    })
})