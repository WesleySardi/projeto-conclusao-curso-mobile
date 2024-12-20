//const BASE_URL = 'http://10.0.2.2:5000';
//const BASE_URL = 'http://192.168.0.14:8080';
const BASE_URL = 'http://zlo-main-app.us-east-1.elasticbeanstalk.com';
const AUTH_URL =
  'http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com';
const ENCRYPT_URL = 'http://zlo-third-party-access.s3-website-us-east-1.amazonaws.com';

const URLs = {
  BASIC: `${BASE_URL}`,
  AUTH: `${AUTH_URL}`,
  ENCRYPT: `${ENCRYPT_URL}`,
};

export default URLs;
