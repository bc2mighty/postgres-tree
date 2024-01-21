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

sequelize.query('CREATE EXTENSION IF NOT EXISTS ltree');
sequelize.query(`
    CREATE TABLE IF NOT EXISTS categories (
        id 	          SERIAL PRIMARY KEY ,
        folder         VARCHAR(50),
        folderPath     VARCHAR(50),
        fullPath      ltree
    );
`);
//CHECK (label ~* '^[A-Za-z0-9_]$'),
 //CHECK (labelPath ~* '^[A-Za-z0-9_]$'),
export default sequelize; 