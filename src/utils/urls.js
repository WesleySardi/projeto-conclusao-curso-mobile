const BASE_URL = 'http://10.0.2.2:8080';
const AUTH_URL =
  'http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com';

const URLs = {
  BASIC: `${BASE_URL}`,
  AUTH: `${BASE_URL}`,

  LOGIN: `${AUTH_URL}/auth/login`,
  REGISTER: `${AUTH_URL}/auth/register`,

  GET_PRODUCTS: `${BASE_URL}/products`,
  GET_PRODUCT_BY_ID: `${BASE_URL}/products/${id}`,
  CREATE_PRODUCT: `${BASE_URL}/products/new`,

  GET_USERS: `${BASE_URL}/users`,
  GET_USER_BY_ID: `${BASE_URL}/users/${id}`,
};

export default URLs;
