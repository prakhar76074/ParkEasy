
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8081/api/spots',
});

export const createSpot = (spot) => API.post('', spot); // ← no trailing slash
export const getSpots = () => API.get('');