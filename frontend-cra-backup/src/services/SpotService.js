
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8081/api/spots',
});


export const createSpot = (spot) => API.post('', spot); // ← no trailing slash
export const getSpots = () => API.get('');
export const getAllSpots = () => API.get('');
export const getSpotById = (id) => API.get(`/${id}`);
export const getSpotsByHostId = (hostId) => API.get(`/host/${hostId}`)
// export const getSpotsByHost = async (hostId) => {
//   const res = await fetch(`http://localhost:8081/api/spots/host/${hostId}`);
//   return await res.json();
// };
export const updateSpot = (id, spot) => API.put(`/${id}`, spot);
export const deleteSpot = (id) => API.delete(`/${id}`);
export const getAvailableSpots = () => API.get('/available');
export const searchSpots = (params) =>
  axios.get('/api/spots/search', { params });