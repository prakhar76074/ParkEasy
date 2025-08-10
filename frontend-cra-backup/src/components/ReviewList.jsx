import React, { useEffect, useState } from 'react';
import { getReviewsBySpot, getAverageForSpot, deleteReview } from '../services/ReviewService';
import ReviewForm from './ReviewForm';

const ReviewList = ({ spotId }) => {
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || null;

  const load = async () => {
    setLoading(true);
    try {
      const [rRes, aRes] = await Promise.all([getReviewsBySpot(spotId), getAverageForSpot(spotId)]);
      setReviews(rRes.data);
      setAvg(aRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (spotId) load();
  }, [spotId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete review?')) return;
    try {
      await deleteReview(id);
      load();
    } catch (err) {
      console.error(err);
      alert('Failed to delete.');
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold">Reviews</h3>
          <div className="text-sm text-gray-500">{avg.count} reviews — Avg: {avg.average.toFixed(1)} ★</div>
        </div>
      </div>

      {user && !editing && (
        <div className="mb-4">
          <button onClick={() => setEditing({})} className="bg-green-600 text-white px-4 py-2 rounded">Write a review</button>
        </div>
      )}

      {editing && (
        <div className="mb-4">
          <ReviewForm spotId={spotId} existing={editing.id ? editing : null} onSaved={() => { setEditing(null); load(); }} />
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-3">
          {reviews.map(review => (
            <div key={review.id} className="bg-white p-3 rounded shadow-sm flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {/* <div className="font-semibold">User: {review.userId.toString().slice(0,8)}</div> */}
                  <div className="font-semibold">User: {review.username}</div>
                 
                  <div className="text-yellow-600 font-medium">{review.rating} ★</div>
                </div>
                <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
                <div className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleString()}</div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {user && user.id === review.userId && (
                  <>
                    <button onClick={() => setEditing(review)} className="text-blue-600 text-sm">Edit</button>
                    <button onClick={() => handleDelete(review.id)} className="text-red-600 text-sm">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
