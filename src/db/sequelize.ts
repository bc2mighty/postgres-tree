import { Sequelize } from "sequelize"

const {
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env;
console.log({
    DB_HOST,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
})
const sequelize = new Sequelize(DB_NAME as string, DB_USERNAME as string, DB_PASSWORD, {
    host: DB_HOST as string,
    dialect: 'postgres'
});

(async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

/**
 * Create an ltree extension to use in creating paths for categories
 */
sequelize.query('CREATE EXTENSION IF NOT EXISTS ltree');

/**
 * Create categories database
 */
sequelize.query(`
    CREATE TABLE IF NOT EXISTS categories (
        id 	          SERIAL PRIMARY KEY ,
        label         VARCHAR(50),
        labelPath     VARCHAR(250),
        fullPath      ltree
    );
`);

export default sequelize; 