# microblog-express-node

A simple microblogging web application written in AngularJS as frontend and NodeJS/ExpressJS for backend

### Features:    
* Blog Post CRUD(Create, Read, Update & Delete)   
* User Login using Passport-HTTP     

### Requirements:   
node v8.1.0  
npm v5.0.3   
angular v1.3.15   

#### How to install:   
$ git clone --depth=1 https://github.com/sudogem/microblog-express-node.git    
$ cd microblog-express-node      
$ npm install   
$ npm start   

#### Running app using PM2:   
$ NODE_PORT=4010 pm2 start --name mblog -i 1 ./bin/www   
$ pm2 delete mblog   ## To remove mblog process   

#### How to run ALL the test:     
$ npm test    

#### How to run a single file to test:     
$ mocha test/{Filename}.js    

#### Technology stacks:   
* [node.js](https://nodejs.org)   
* [Express](https://expressjs.com)
* [HTML/CSS](https://www.w3.org/standards/webdesign/htmlcss)   
* [Angular](https://angularjs.org/)   
* [Pug](https://pugjs.org)   
* [Now UI Kit](https://github.com/creativetimofficial/now-ui-kit)
* [PM2](https://github.com/Unitech/pm2)   

### Screenshots:   
Demo account   
account: user@mail.com   
pass: test   

![Home (default)](/screenshots/home-default.png)   

![Login page](/screenshots/login-page.png)   

![Home (logged in)](/screenshots/home-authenticated.png)   

![Add post](/screenshots/add-post.png)   

![Edit post](/screenshots/edit-post.png)   

#### Developer   
[microblog-express-node](http://angularblogexpressrev1-sudogem.rhcloud.com) &copy; 2015 Arman Ortega. Released under the MIT License.
