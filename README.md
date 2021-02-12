# GRAPHQL CRUD APP

This is sample application developed using Graphql, KnexJS and Postgresql with NodejS

## Installation Steps

* Used node version 10.16.2
* Used psql version 10
* Create a new project folder and give the following commands

1. npm init
2. npm i express body-parser cors graphql express-graphql apollo-server-express knex pg

### Run below files to create Table and insert data into psql

* Navigate to migrations in cmd and run create_books.js (node create_books.js)
* Navigate to seeds in cmd and run insert_data.js (node insert_data.js)

Now application is ready to run by launching url http://localhost:3000/graphql

# Added

* Returning Id for Delete Operation
* CRUD Operations for Author
* Retrieving Books and Authors
* Searching Books
* Searching Location

