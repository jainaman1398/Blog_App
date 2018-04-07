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
  
 ## 1) Register
  ![alt text](https://github.com/jainaman1398/Blog_app/blob/master/images/register.png)
      ```bash
     POST /register
      ```
      Allows user to register herself on the platform with basic information
        >Username, password, firstname, lastname, blogURL
        
## 2) Login
 ![alt text](https://github.com/jainaman1398/Blog_app/blob/master/images/login.png)
 ```bash
 POST /login
 
 ```
         authenticates the user and provides him with an access_token in response.this access_token must be used for his authentication when he makes any request
         ```
         For example if he makes a request to /blogpost he will need to send the access_token(which he got as a response when he made a request for login) with the body of request 
         ```
##  3) Follow 
  ![alt text](https://github.com/jainaman1398/Blog_app/blob/master/images/follow.png)
  
  ```bash
  PUT /follow/{username}
  ```
      Allows you to follow new user. You need to send the user's name whom you want to follow as params
      and your access_token with the body of request to authenticate yourself
      
## 4) Creating Blogpost
![alt text](https://github.com/jainaman1398/Blog_app/blob/master/images/blogpost.png)

```bash
POST /  blogpost
```
    Allows user to create a blog post with following parameters
       ...Title, content
      You need to send the access_token with the body of request to authenticate yourself
      
 ## 5) Getting blog feed of users you follow
 ![alt text](https://github.com/jainaman1398/Blog_app/blob/master/images/got_blogs.png)
 
 ```bash
 GET /feed
 
 ```
     Returns all blog posts of users you follow and you need to send the access_token with the body of request to authenticate yourself
