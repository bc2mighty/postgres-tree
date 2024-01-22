import { createNewCategory } from "../db/queries";
const createCategoryMock = jest.fn()

describe('Query Mocks', () => {
    test('should create a category', async() => {
        const label = '1', labelPath = '1', fullPath = '1';
        createCategoryMock.mockReturnValue([]);
        const result = await createNewCategory(label, labelPath, fullPath);
        expect(result).toBe([])
    })
})