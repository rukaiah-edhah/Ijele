    import axios from 'axios'; 
    import getAccessToken from '../getAccessToken'; 
    import { FlightOffersPrice } from '../interfaces';

    /**
     * Function to get hotels by city code from Amadeus API.
     * @returns {Promise<HotelDataResponse>} The data of hotels.
     * @throws an error if unable to retrieve the hotels.
     */
    const getFlightOffersPrice = async (): Promise<FlightOffersPrice> => {
    try {
        const accessToken = await getAccessToken();

        const response = await axios.post<FlightOffersPrice>('https://test.api.amadeus.com/v1/shopping/flight-offers/pricing?forceClass=false', {
        headers: {
            Authorization: `Bearer ${accessToken}`, 
            // 'Secondary-Authorization': `Bearer ${accessToken}`,
            // 'Content-Type': 'application/json',
        },
        });

        console.log('flight price retrieved:', response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
        console.error('Error retrieving hotels:', error.response.data);
        } else {
        console.error('Error retrieving hotels:', error.message);
        }
        throw error; 
    }
    };

    export default getFlightOffersPrice; 


    