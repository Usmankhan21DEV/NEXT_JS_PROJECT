import { NextResponse } from 'next/server';
import axios from 'axios';
//import Amadeus from 'amadeus';
// export async function POST(request) {
//   try {
//     const { depdate, passcount, travelClass, fromLocation, toLocation } = await request.json();
    


//     // Step 1: Fetch Access Token
//     const tokenResponse = await axios.post(
//       'https://test.api.amadeus.com/v1/security/oauth2/token',
//       new URLSearchParams({
//         grant_type: 'client_credentials',
//         client_id: 'sWgCbVp5sr1DtGdSYDORr6YtHuM687dC', // Use environment variables
//         client_secret: 'B6UEmhtgIluOqopF',
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );

//     const accessToken = tokenResponse.data.access_token;

//     // Step 2: Fetch Flight Offers
//     const flightResponse = await axios.get(
//       'https://test.api.amadeus.com/v2/shopping/flight-offers',
//       {
//         params: {
//           originLocationCode: fromLocation,
//           destinationLocationCode: toLocation,
//           departureDate: depdate,
//           adults: passcount,
//           travelClass,
//           currencyCode: 'USD',
//           max: '10',
//         },
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     // Return the flight data
//     return NextResponse.json({
//       success: true,
//       data: flightResponse.data.data,
//     });
//   } catch (error) {
//     console.error('Error fetching flight offers:', error.response?.data || error.message);
//     return NextResponse.json({
//       success: false,
//       error: error.response?.data || error.message,
//     });
//   }
// }



export async function POST(request) {
  try {   
    const Amadeus = require('amadeus');
    const amadeus = new Amadeus({
      clientId: 'sWgCbVp5sr1DtGdSYDORr6YtHuM687dC',
      clientSecret: 'B6UEmhtgIluOqopF',
    });
    const { fromLocation, toLocation, depdate, passcount } = await request.json(); 
    console.log("Worked till here");
    //console.log(fromLocation, toLocation, depdate, passcount);
    const [flightOffersResponse, checkInLinksResponse] = await Promise.allSettled([
      amadeus.shopping.flightOffersSearch.get({
        originLocationCode: fromLocation,
        destinationLocationCode: toLocation,
        departureDate: depdate,
        adults: passcount,
        currencyCode: 'USD',
      }),
      amadeus.referenceData.urls.checkinLinks.get({ airlineCode: 'BA' }),
    ]);
    
    const flightOffers = flightOffersResponse.status === 'fulfilled' ? flightOffersResponse.value.data : null;
    const checkInLinks = checkInLinksResponse.status === 'fulfilled' ? checkInLinksResponse.value.data : null;
    //const resutl = await  await amadeus.booking.flightOrders()
    if (flightOffersResponse.status === 'rejected') {
      console.error('Error fetching flight offers:', flightOffersResponse.reason);
    }
    if (checkInLinksResponse.status === 'rejected') {
      console.error('Error fetching check-in links:', checkInLinksResponse.reason);
    }
    return NextResponse.json({
      success: true,
      checkInLinks,
      checkInLinksResponse,
      flightOffers,
      
    });
    
  } catch (error) {
    console.error('Error fetching flight offers:', error.message);
    console.error('Full Error Object:', error);
    console.error('Error Response Data:', error.response?.data || 'No response data');
    console.error('Error Response Status:', error.response?.status || 'No status');
    console.error('Error Stack:', error.stack);
  
    return NextResponse.json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
  
}
