"use client";

import React,{useState} from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane } from 'lucide-react';

function FlightResults({results, className }) {
  const searchResults = results;  
  const [loading, setLoading] = useState(false);
  function calculateDuration(departureTime, arrivalTime) {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
  
    const diffMs = arrival - departure;
    const hours = Math.floor(diffMs / 3600000); // Convert ms to hours
    const minutes = Math.floor((diffMs % 3600000) / 60000); // Remaining minutes
  
    return `${hours}h ${minutes}m`;
  }
  
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Flight Results</h2>
      <div className="space-y-4">
        {/* {dummyFlights.map((flight) => (
          <Card key={flight.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{flight.airline}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-semibold">{flight.departure}</span>
                    <ArrowRight className="mx-2" />
                    <span className="text-lg font-semibold">{flight.arrival}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Duration: {flight.duration}</p>                  
                </div>                
                <div className="text-right">
                  <p className="text-2xl font-bold">£{flight.price.toFixed(2)}</p>
                  <Button className="mt-2">
                    Select <Plane className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))} */}
        {searchResults && (
  <div className="text-2xl mb-4">
    <div className="space-y-4">
      {searchResults.map((result) => {
        const segment = result.itineraries[0].segments[0]; // Assuming single itinerary and single segment for simplicity
        const price = result.price;

        return (
          <Card key={result.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                {/* Left Section: Flight Details */}
                <div>
                  <h3 className="font-bold">
                    {segment.carrierCode} {segment.number}
                  </h3>
                  <div className="border-t border-gray-300 my-2"></div> {/* Separating Line */}
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-semibold">
                      {segment.departure.iataCode}
                    </span>
                    <ArrowRight className="mx-2" />
                    <span className="text-lg font-semibold">
                      {segment.arrival.iataCode}
                    </span>
                  </div>
                  <p className="text-lg font-semibold ">
                    Duration: {calculateDuration(segment.departure.at, segment.arrival.at)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                  Departure at: {new Date(segment.departure.at).toLocaleString()}              
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Arrival at: {new Date(segment.arrival.at).toLocaleString()}                 
                  </p>
                  
                </div>

                {/* Right Section: Price and Booking */}
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {price.total} {price.currency}
                  </p>
                  <Button className="mt-2">
                    Select <Plane className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
)}

        {/* {loading && <LoadingSpinner />} */}
        {/* {searchResults && (
          <div className='container mx-auto px-4 my-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchResults.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <CardHeader className="bg-gray-100 p-4">
                <CardTitle className="text-lg font-semibold">{result.itineraries[0].segments[0].carrierCode} {result.itineraries[0].segments[0].number}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold">{result.itineraries[0].segments[0].departure.iataCode}</div>
                  <Plane className="text-blue-500" />
                  <div className="text-2xl font-bold">{result.itineraries[0].segments[0].arrival.iataCode}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{new Date(result.itineraries[0].segments[0].departure.at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-medium">{new Date(result.itineraries[0].segments[0].arrival.at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Flight</p>
                    <p className="font-medium">{result.itineraries[0].segments[0].carrierCode} {result.itineraries[0].segments[0].number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">{result.price.total} {result.price.currency}</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-500 hover:bg-green-600  text-black">Book Now</Button>
              </CardContent>
            </Card>
          ))} 
          </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default FlightResults;
