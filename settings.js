var baseURLApi;
var nodeEnv = process.env.NODE_ENV || 'development';


if (nodeEnv === 'development') {
  baseURLApi = process.env.baseURL_API_DEV;
} else {
  baseURLApi = process.env.OPENSHIFT_APP_DNS || process.env.baseURL_API_PROD;
}

var config = {
  baseUrlApi: baseURLApi || '//localhost:4010',
  jwtTokenSecret: process.env.jwtTokenSecret || '91fe211053c6377ddfd218a061f96'
};

module.exports = config;
