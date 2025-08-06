import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const HostBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const hostId = user?.id;

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:8083/api/bookings/host/${hostId}`);
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hostId) fetchBookings();
  }, [hostId]);

  const updateBookingStatus = async (bookingId, action) => {
    try {
      await axios.post(`http://localhost:8083/api/bookings/${bookingId}/${action}`);
      fetchBookings(); // refresh list
    } catch (err) {
      console.error(`Failed to ${action} booking`, err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Pending Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded p-4 shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{booking.spotTitle}</h3>
                  <p className="text-gray-600 text-sm">User: {booking.userId}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(booking.startTime).toLocaleString()} → {new Date(booking.endTime).toLocaleString()}
                  </p>
                  <p className={`mt-1 font-medium ${booking.status === 'PENDING' ? 'text-yellow-600' : booking.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {booking.status}
                  </p>
                </div>

                {booking.status === 'PENDING' && (
                  <div className="space-x-2">
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'approve')}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'reject')}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostBookings;
