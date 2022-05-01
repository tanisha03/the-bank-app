import axios from 'axios';

export const service = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});