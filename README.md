# microblog-express-node
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/sudogem/microblog-express-node/trend.png)](https://bitdeli.com/free "Bitdeli Badge")   

A simple microblogging web application written in AngularJS as frontend and NodeJS/ExpressJS for backend

### Features:    
* CRUD(Create, Read, Update & Delete) functionality:
  * Articles

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
* node.js (https://nodejs.org)   
* ExpressJS (https://expressjs.com)
* HTML/CSS   
* AngularJS (https://angularjs.org/)   
* Jade Templating   
* Now UI Kit (https://github.com/creativetimofficial/now-ui-kit)
* PM2 (https://github.com/Unitech/pm2)   

#### Developer   
microblog-express-node &copy; 2015 Arman Ortega. Released under the MIT License.
