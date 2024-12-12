"use client";

import { useState, useEffect,Suspense } from "react";
import { redirect, useSearchParams } from "next/navigation";
import FlightResults from "./result_components/FlightResults";
import SearchForm from "./result_components/SearchFrom";
import Sidebar from "./result_components/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function FlightResultsPage() {
  const getparams = useSearchParams();
  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-2 text-gray-700">Searching for flights...</p>
      </div>
    </div>
  )
  
  const [totalobj, setTotalObj] = useState({});
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Toast configuration
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",   
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  useEffect(() => {   
    const fetchData = async () => {
      try {
      
        const depdate = getparams.get("depdate");
        const passcount = getparams.get("passcount");
        const travelClass = getparams.get("travelClass");
        const toLocation = getparams.get("toLocation");
        const fromLocation = getparams.get("fromLocation");
  
        const obj = { depdate, passcount, travelClass, fromLocation, toLocation };
        setTotalObj(obj);  
        setLoading(true);
        const response = await axios.post('/api/flight_offer', obj);
       // console.log(response.data.flightOffers);
        if (response.data.flightOffers && response.data.flightOffers.length > 0) {
          setSearchResults(response.data.flightOffers);
          Toast.fire({
            icon: "success",
            title: "Flights found!",
          });
        } else {
          setSearchResults([]);
          Toast.fire({
            icon: "error",
            title: "No flights found!",
          });
          window.location.href = "/home";
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
        Toast.fire({
          icon: "error",
          title: "Error fetching flights!",
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [getparams]);
  

  return (
    
    <div className="min-h-screen bg-gray-100">
      {loading && <LoadingSpinner />}
      {!loading &&
      <main className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <SearchForm />

        <div className="mt-8 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar data={totalobj} className="w-full md:w-1/4" />

          {/* Flight Results */}
          <FlightResults
            results={searchResults}
            loading={loading}
            className="w-full md:w-3/4"
          />
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-8">     
        <Suspense fallback={"Loading...."}>
          {searchResults&&"The Data has been Fetch seek ur Console.log"}
        </Suspense>
        </div>
      </main>}
    </div>
  );
}
