# microblog-express-node
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/sudogem/microblog-express-node/trend.png)](https://bitdeli.com/free "Bitdeli Badge")   

A simple microblogging web application written in AngularJS as frontend and NodeJS + ExpressJS for backend

### Features:    
* CRUD(Create, Read, Update & Delete) functionality:
  * Articles

#### How to install:   
$ git clone --depth=1 https://github.com/sudogem/microblog-express-node.git    
$ cd microblog-express-node      
$ npm install   
$ npm start   

#### How to deploy to Bluemix:   
Signup Bluemix account here [https://console.ng.bluemix.net/registration]   
$ bluemix api https://api.ng.bluemix.net   
$ bluemix login -u <IBM ID or email> -o "<ORG>" -s "<SPACE>"   
  then you will prompted to enter you password   
$ cf help <-- To list all commands   
$ cf apps <-- To list all apps   
$ cd <APP DIR> e.g $ cd microblog-express-node/    
$ cf create-service mysql 100 mysql-db    
$ cf push app_name -m 512m   

Sample live preview: http://nodeblog-v1.mybluemix.net/#/   

#### Technology stacks:   
* node.js   
* ExpressJS
* HTML/CSS   
* AngularJS   
* Jade Templating

#### Developer   
microblog-express-node &copy; 2015 Arman Ortega. Released under the MIT License.
