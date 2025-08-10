import axios from 'axios';
const BASE = process.env.REACT_APP_REVIEW_API || 'http://localhost:8084/api/reviews';

export function createReview(payload) {
  return axios.post(BASE, payload);
}
export function getReviewsBySpot(spotId) {
  return axios.get(`${BASE}/spot/${spotId}`);
}
export function getAverageForSpot(spotId) {
  return axios.get(`${BASE}/spot/${spotId}/average`);
}
export function getReviewsByUser(userId) {
  return axios.get(`${BASE}/user/${userId}`);
}
export function updateReview(id, payload) {
  return axios.put(`${BASE}/${id}`, payload);
}
export function deleteReview(id) {
  return axios.delete(`${BASE}/${id}`);
}
