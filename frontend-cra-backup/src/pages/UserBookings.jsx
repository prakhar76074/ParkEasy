import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const UserBookings = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/bookings/user/${user.id}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">My Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600">You have not made any bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border p-4 rounded shadow">
                <p><strong>Spot Title:</strong> {booking.spotTitle}</p>
                <p><strong>From:</strong> {new Date(booking.startTime).toLocaleString()}</p>
                <p><strong>To:</strong> {new Date(booking.endTime).toLocaleString()}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={
                    booking.status === 'APPROVED'
                      ? 'text-green-600'
                      : booking.status === 'REJECTED'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }>
                    {booking.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
