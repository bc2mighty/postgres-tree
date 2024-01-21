import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { app } from './src';
import { Sequelize, DataType } from "sequelize";
import { 
    createCategory
} from './src/db/queries';

const mockedSequelize = new Sequelize({
    dialect: 'postgres'
});

describe('GET /', () => {
    test('/application has started running', async() => {
        
    })
})

/**
 * 
// import sequelize from '../db/sequelize';
// jest.mock('../db/sequelize');

// const mockedSequelize = new Sequelize({
//     dialect: 'postgres'
// });

// jest.mock('sequelize', () => {
//     return {
//       ...jest.requireActual('sequelize'),
//       default: jest.fn(() => ({
//         define: jest.fn(),
//         sync: jest.fn(),
//         findOne: jest.fn(),
//         create: jest.fn(),
//         query: jest.fn(() => {
            
//         }),
//       })),
//       __esModule: true,
//     };
// });
// jest.mock('sequelize', async() => {
//     const mSequelize = {
//       authenticate: jest.fn(),
//       query: jest.fn(),
//     };
//     const actualSequelize = jest.requireActual('sequelize');
//     return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
// });

// describe('Sequelize', () => {
//     afterAll(() => {
//         jest.resetAllMocks();
//     });
//     test('should create a category', () => {
//         expect(sequelize.define).toHaveBeenCalled();
//         // expect(DataTypes.INTEGER).toBeDefined();
//     })
// })
 */