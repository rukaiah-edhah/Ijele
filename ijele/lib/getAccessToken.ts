import axios from 'axios'; 
import qs from 'qs'; // Import qs for converting objects to URL-encoded strings
import { TokenResponse } from './interfaces';

/**
 * Function to get the access token from Amadeus API.
 * @returns {Promise<string>} The access token.
 * @throws Will throw an error if unable to retrieve the access token.
 */
const getAccessToken = async (): Promise<string> => {
  try {
    const data = qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    });

    const response = await axios.post<TokenResponse>('https://api.amadeus.com/v1/security/oauth2/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Access token retrieved:', response.data.access_token);
    return response.data.access_token;
  } catch (error: any) {
    if (error.response) {
      console.error('Error retrieving access token:', error.response.data);
    } else {
      console.error('Error retrieving access token:', error.message);
    }
    throw error;
  }
};

export default getAccessToken; 
