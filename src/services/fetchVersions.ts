// src/hooks/useFetchUpdateData.js
import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetchUpdateData = () => {
  const [updateData, setUpdateData] = useState({
    min_required_version: '',
    ios_url: '',
    android_url: '',
    latest_version: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0); // Track retry attempts

  const fetchUpdateData = async () => {
    setLoading(true);
    setError(null);

    try {
      // const response = await axios.get('https://your-server.com/api/version'); // Replace with your API endpoint
      const response = {
        data: {
          min_required_version: '3',
          ios_url: 'http://www.google.com',
          android_url: 'http://www.facebook.com',
          latest_version: '4',
        },
      };
      setUpdateData({
        min_required_version: response.data.min_required_version,
        ios_url: response.data.ios_url,
        android_url: response.data.android_url,
        latest_version: response.data.latest_version,
      });
    } catch (err) {
      setError(err);
      console.error('Error fetching update data:', err);
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    setRetryCount(prev => prev + 1); // Increment retry count
  };

  useEffect(() => {
    fetchUpdateData();
  }, [retryCount]); // Refetch data when retryCount changes

  return {updateData, loading, error, retry};
};

export default useFetchUpdateData;
