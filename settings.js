var config = {
  baseUrlApi:  (process.env.NODE_ENV === 'development') ? 'http://localhost:4010': 'http://angularblogexpressrev1-sudogem.rhcloud.com',
  jwtTokenSecret: process.env.jwtTokenSecret || '91fe211053c6377ddfd218a061f96'
};

module.exports = config;
