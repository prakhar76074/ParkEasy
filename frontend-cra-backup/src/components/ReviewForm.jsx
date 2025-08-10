import React, { useState, useEffect } from 'react';
import { createReview, updateReview } from '../services/ReviewService';

const ReviewForm = ({ spotId, existing, onSaved }) => {
  // existing = optional existing review for edit {id, rating, comment}
  const [rating, setRating] = useState(existing?.rating || 5);
  const [comment, setComment] = useState(existing?.comment || '');
  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    setRating(existing?.rating || 5);
    setComment(existing?.comment || '');
  }, [existing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert('Please login to leave a review.');
      return;
    }

    const payload = {
      spotId,
      userId: user.id,
      rating: Number(rating),
      comment
    };

    try {
      if (existing) {
        await updateReview(existing.id, payload);
      } else {
        await createReview(payload);
      }
      onSaved && onSaved();
    } catch (err) {
      console.error(err);
      alert('Failed to save review.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold mb-2">{existing ? 'Edit your review' : 'Leave a review'}</h4>
      <div className="mb-2">
        <label className="block text-sm">Rating</label>
        <select value={rating} onChange={e => setRating(e.target.value)} className="border p-2 rounded">
          {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} ★</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm">Comment</label>
        <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3}
          className="w-full border p-2 rounded" placeholder="Tell others about this spot" />
      </div>

      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {existing ? 'Update' : 'Submit'}
        </button>
        {existing && <button type="button" onClick={() => onSaved && onSaved()} className="px-4 py-2 border rounded">Cancel</button>}
      </div>
    </form>
  );
};

export default ReviewForm;
