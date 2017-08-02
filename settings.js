var config = {
  baseUrlApi:  (process.env.OPENSHIFT_APP_UUID !== undefined) ? '//angularblogexpressrev1-sudogem.rhcloud.com' : '//localhost:4010',
  jwtTokenSecret: process.env.jwtTokenSecret || '91fe211053c6377ddfd218a061f96'
};

module.exports = config;
