# Blog_app
REST API's for blogging Application

## STEPS TO SETUP

1) Install dependencies
```bash
  npm install
  ```
  
2) Run Node and MongoDB server
  open terminal inside root folder and type node server.js and mongod in another this will setup the node and MongoDB server ,then open      another terminal and type mongo to run mongo client
  ```bash
  npm server.js
  mongod
  mongo
  ```
  # API DOCUMENTATION
  
  1) Register
  ![alt text](https://github.com/jainaman1398/Blog_app/blob/master/images/register.png)
      ```bash
      /register
      ```
      Allows user to register herself on the platform with basic information
        >Username, password, firstname, lastname, blogURL
