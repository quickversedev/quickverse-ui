// src/hooks/useFetchUpdateData.js
import {useState, useEffect} from 'react';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';

const useFetchUpdateData = () => {
  const [updateData, setUpdateData] = useState({
    min_required_version: '',
    ios_url: '',
    android_url: '',
    latest_version: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0); // Track retry attempts

  const fetchUpdateData = async () => {
    setLoading(true);
    setError(null);
    const token = await fetchToken();

    try {
      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v1/initialConfig`,
        {
          headers: {
            Authorization: token,
          },
        },
      ); // Replace with your API endpoint
      // const response = {
      //   data: {
      //     minVersion: '1',
      //     appStoreURL: 'http://www.google.com',
      //     playStoreURL: 'http://www.facebook.com',
      //     latestVersion: '4',
      //   },
      // };
      console.log('Fetched update data:', response.data);
      setUpdateData({
        min_required_version: response.data.minVersion,
        ios_url: response.data.appStoreURL,
        android_url: response.data.playStoreURL,
        latest_version: response.data.latestVersion,
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
