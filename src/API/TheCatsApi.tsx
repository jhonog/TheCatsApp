import axios from "axios";

const theCatsApi = axios.create({
  baseURL: `https://api.thecatapi.com/v1/`,
  headers: {
    'x-api-key': 'bda53789-d59e-46cd-9bc4-2936630fde39'
  }
});

export default theCatsApi;


