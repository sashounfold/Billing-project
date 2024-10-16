import React, { useState } from 'react';
import axios from 'axios';

function TimeTracker() {
  const [tracking, setTracking] = useState(false);
  const [userId, setUserId] = useState('');
  const [duration, setDuration] = useState(null);

  const startTracking = async () => {
    await axios.post('http://localhost:3000/start-tracking', { userId });
    setTracking(true);
  };

  const stopTracking = async () => {
    const response = await axios.post('http://localhost:3000/stop-tracking', { userId });
    setDuration(response.data.duration);
    setTracking(false);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter User ID" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
      />
      {!tracking ? (
        <button onClick={startTracking}>Start Tracking</button>
      ) : (
        <button onClick={stopTracking}>Stop Tracking</button>
      )}
      {duration && <p>Tracked Duration: {duration} seconds</p>}
    </div>
  );
}

export default TimeTracker;
