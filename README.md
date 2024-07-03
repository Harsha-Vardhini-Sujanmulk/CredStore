


https://github.com/Harsha-Vardhini-Sujanmulk/CredStore/assets/134298101/d5a05e1c-970e-4ca1-a710-8c59d4c62c37





## Project Summary <br/>
This Node.js Express application provides a CRUD (Create, Read, Update, Delete) interface for managing user data in a MySQL database. It leverages the following technologies: <br/>

**Express.js:** Web framework for building web applications <br/>
**faker.js:** Library for generating realistic fake data (used for initial data population) <br/>
**mysql2:** Driver for interacting with MySQL databases <br/>
**EJS:** Templating engine for generating dynamic HTML pages <br/>

## Key Functionalities <br/>
**Get Total User Count:** Retrieves the total number of users from the database. <br/>
**Get All Users:** Fetches all user records from the database. <br/>
**Edit User:** Allows modifying a user's username (with password verification). <br/>
**Add New User:** Enables creating new user entries in the database. <br/>
**Delete User:** Provides functionality to delete users from the database (with password confirmation). <br/>

## Project Usage 
### 1. Prerequisites: <br/>
- Node.js and npm (or yarn) installed on your system. <br/>
- A MySQL database server running with a database named `delta_app` created. <br/>
- Update the database connection details (`host`, `user`, `password`) in the code (`connection` variable) if necessary. <br/>
### 2. Installation: <br/>
- Clone or download this repository. <br/>
- Navigate to the project directory in your terminal. <br/>
- Run `npm` install (or `yarn` install) to install dependencies. <br/>
### 3. Database Setup (Optional): <br/>
If you don't have a `user` table in your `delta_app` database, create it using a `MySQL` client with the following schema: <br/>
```
CREATE TABLE user ( 
  id VARCHAR(255) PRIMARY KEY, 
  username VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);  
```
### 4. Running the Application: <br/>
- Run `node app.js` (or `npm start` if using a `package.json` script) to start the server. <br/>
- The application will listen on port `8080` by default. Access it in your browser at `http://localhost:8080`. <br/>
## Additional Notes <br/>
- Error handling is implemented to provide informative messages in case of database errors. <br/>
- Consider security best practices for production use, such as: <br/>
  - Securely storing passwords (e.g., hashing) <br/>
  - Input validation to prevent malicious attacks <br/>
- Feel free to customize the application further to suit your specific needs. <br/>

