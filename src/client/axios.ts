/** @format */

import axios from "axios";
import config from '../config/config'

const client = axios.create({
  baseURL: config.BASE_URL,
  // withCredentials: true,
});

axios.defaults.headers.common['Content-type'] = 'application/json'

export const setAxiosHeaderAuthorization = (bearerToken?: string): void => {
  if (bearerToken) {
    client.defaults.headers.common.Authorization = bearerToken;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
};

export default client;
