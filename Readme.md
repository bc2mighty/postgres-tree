### Event Management Application

* [Installation](#Installation)
* [Application Structure](#Application Structure)

#### Installation
###### Clone the repo
```
git clone https://github.com/bc2mighty/event-management.git
```
###### Navigate to the root of the project and install all npm packages with the command below:
```
npm i
```
###### Copy the env file and rename the env file to your Postgres database configuration
```
cp env.example .env
```
###### Start the application with the following command:
```
npm run start:dev
```
###### Download a sample postman collection to make calls to the REST APIs provided in this project. Ensure you replace the root URL with the PORT that the application is running on.
[Postman Doc](Event_Management.postman_collection.json)

#### Application Structure
##### 1. Database Schema
###### The project uses label tree (also known as ltree) database structure which is faster than Recursive Common Table Expression (CTE) and Static Tree Schema. The documentation for this can be found in <a  target="_blank" href="https://www.postgresql.org/docs/9.1/ltree.html">Postgres ltree</a>. This technique reduces the complexity of tree traversal queries to simple wildcard sort of expressions like `Label1` to match the root of the tree, `Label1.*` to match descendants of `Label1`, and `*.Label1.*` to match both ancestors and descendants of `Label1`
###### The Table and ltree extensions are created as soon as the application starts running.
##### 2. Architecture
###### The project partially uses an MVC architecture, even though no model is created. No model is created because Sequelize ORM does not have a way to use an ltree extension when creating a model unless one uses a raw query. Hence why the model is represented by raw queries.