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

#### How to deploy to OpenShift:   
Signup OpenShift v3 account here https://www.openshift.com
Read the getting started guide here https://docs.openshift.com/online/getting_started/beyond_the_basics.html
Download and install the OpenShift CLI(oc.zip) https://console.starter-us-west-2.openshift.com/console/command-line
