import axios from 'axios';
import globalConfig from '../../utils/GlobalConfig';

export const addItemToCart = async (
  vendorId: string,
  productId: string,
  AuthData: string,
): Promise<any> => {
  try {
    const url = `${globalConfig.apiBaseUrl}/v2/addCart`;

    const response = await axios.post(
      url,
      {
        shopId: vendorId,
        sku: productId,
      },
      {
        headers: {
          SessionKey: AuthData,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as any;
    if (err.response) {
      console.error(
        'Server responded with non-2xx status:',
        err.response.status,
      );
      console.error('Response data:', err.response.data);
      throw err.response.data.error.code;
    } else if (err.request) {
      console.error('No response received:', err.request);
    } else {
      console.error('Error setting up the request:', err.message);
    }
    throw error;
  }
};
