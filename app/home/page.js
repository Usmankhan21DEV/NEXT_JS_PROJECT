"use client";

import { useState ,useEffect} from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
import { addDays,format } from "date-fns";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { DateRange } from "react-day-picker"
// import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {  Command,  CommandEmpty,  CommandGroup,  CommandInput,  CommandItem,} from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MenuIcon, PhoneIcon, PlaneIcon,ChevronRight, SearchIcon, XIcon,Plane, Loader2 } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Combobox } from '../../components/ui/combobox';
import Swal from 'sweetalert2';
import '../../app/style.css';
import FlightSearchBox from '../result/result_components/FlightSearchbox';
// export async function getServerSideProps() {
//   const options = {
//     method: "POST",
//     url: "https://test.api.amadeus.com/v1/security/oauth2/token",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "User-Agent": "insomnia/10.1.1",
//     },
//     data: {
//       grant_type: "client_credentials",
//       client_id: "sWgCbVp5sr1DtGdSYDORr6YtHuM687dC",
//       client_secret: "B6UEmhtgIluOqopF",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     const token = response.data?.access_token;

//     if (!token) {
//       return {
//         redirect: {
//           destination: "/error", // Redirect to an error page if the token is not generated
//           permanent: false,
//         },
//       };
//     }

//     return {
//       props: {
//         token, // Pass the token to the page
//       },
//     };
//   } catch (error) {
//     console.error("Error generating token:", error);
//     return {
//       redirect: {
//         destination: "/error",
//         permanent: false,
//       },
//     };
//   }
// }
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-lg flex flex-col items-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="mt-2 text-gray-700">Searching for flights...</p>
    </div>
  </div>
)
export default function home({}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [date1, setDate1] = useState();
  const [date, setDate] = useState({
    from: new Date(), // Default to today
    to: addDays(new Date(), 1), // Default range (today + 1 day)
  });
 
  const [fromSearchQuery, setFromSearchQuery] = useState('');  // Search state for From airport
  const [toSearchQuery, setToSearchQuery] = useState('');      // Search state for To airport
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [filteredToAirports, setFilteredToAirports] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [passcount, setpasscount] = useState('1'); 
  const [travelClass, settravelClass] = useState('ECONOMY'); 
  const [fromAirport, setFromAirport] = useState(''); 
  const [toAirport, setToAirport] = useState('');
  const [airports, setAirports] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })
  // useEffect(() => {
  //   const fetchAirports = async () => {
  //     try {
  //       const response = await fetch('/api/fetch');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //       if (data.success === 'true') {
  //         setAirports(data.data);
  //         setFilteredFromAirports(data.data || []); 
  //         setFilteredToAirports(data.data || []); 
  //         if (data.data.length > 0) {
  //           setFromAirport(data.data[0].airport_info);
  //           setToAirport(data.data[0].airport_info);
  //         }
  //       } else {
  //         console.error('No airports found.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching airports:', error);
  //     }
  //   };

      
  //   fetchAirports();
  // }, []);

  // const handleSearchClick = () => {
  //   const depdate = format(new Date(date.from), "yyyy-MM-dd");
  //   const fromLocation = fromAirport.split(" (")[1].split(")")[0];
  //   const toLocation = toAirport.split(" (")[1].split(")")[0];
  //   const queryParams = new URLSearchParams({
  //     depdate,
  //     fromLocation,
  //     toLocation,
  //     passcount,
  //     travelClass,
  //   }).toString();

  //   // Navigate to the result page with query parameters
  //   window.location.href = `/result?${queryParams}`;
  // };
  // const handlerSearch = async (e) => {    
  //   e.preventDefault();
  //   setLoading(true);
 
  // };
  // const handleFromChange = (value) => {
  //   setFromAirport(value);
  // };

  // const handleToChange = (value) => {
  //   setToAirport(value); 
  // };
  // const disablePastDates = (date) => {
  //   const today = new Date();
  //   return date <= today; 
  // };
  // const handleClassChange = (value) => {
  //   settravelClass(value);
  // };
  // const handlePASSENGERCountChange = (value) => {
  //   setpasscount(value);
  // };
  // const handleAirportSearch = (query, airportType) => {
  //   const filteredAirports = airports.filter((airport) =>
  //     airport.airport_info.toLowerCase().includes(query.toLowerCase())
  //   );
  //   if (airportType === 'from') {
  //     setFilteredFromAirports(filteredAirports);
  //   } else if (airportType === 'to') {
  //     setFilteredToAirports(filteredAirports);
  //   }
  // };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
      <section className="bg-cover bg-center text-black py-16" style={{ backgroundImage: "url('/banner.jpg')" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Search for cheap flights</h2>
            {/* <Card className="bg-white/95 backdrop-blur-sm shadow-lg bg-yellowCustom">
              <CardContent className="p-6">
                <Tabs defaultValue="return" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="return">Return</TabsTrigger>
                    <TabsTrigger value="oneway">One way</TabsTrigger>
                    <TabsTrigger value="multi">Multi-city</TabsTrigger>
                  </TabsList>
                  <TabsContent value="return">
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                    <label htmlFor="from-airport" className="block mb-2 text-sm font-medium">From</label>
                    <Combobox
                      labelField="airport_info" // The field to display
                      valueField="airport_info" // The field used as the value
                      data={airports}          // The array of airports
                      value={fromAirport}            // The selected value
                      onChange={handleFromChange}      // Function to handle value changes
                      placeholder="Select airport"
                    />
                      </div>
                      <div>
                        <label htmlFor="to-airport" className="block mb-2 text-sm font-medium">To</label>
                        <Combobox
                              labelField="airport_info" // The field to display
                              valueField="airport_info" // The field used as the value
                              data={airports}          // The array of airports
                              value={toAirport}            // The selected value
                              onChange={handleToChange}      // Function to handle value changes
                              placeholder="Select airport"
                            />
                     </div>
                     
                      <div className="flex space-x-2">
                        <div className="daterangepicker-container mx-6">                         
                          <label className="block mb-2 text-sm font-medium">Dates : </label>
                          <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                                >
                                    <CalendarIcon />
                                    {date?.from ? (
                                    date.to ? (
                                        <>
                                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                    ) : (
                                    <span>Pick a date</span>
                                    )}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                    disabled={disablePastDates} // Disable past dates
                                />
                                </PopoverContent>
                            </Popover>
                                                

                        </div>
                      </div>
                      <Select onValueChange={handlePASSENGERCountChange}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Passengers" />
                        </SelectTrigger>
                        <SelectContent >
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select onValueChange={handleClassChange}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent >
                          <SelectItem value="ECONOMY">Economy Class</SelectItem>
                          <SelectItem value="PREMIUM_ECONOMY">Premium Economy Class</SelectItem>
                          <SelectItem value="BUSINESS">Business Class</SelectItem>
                          <SelectItem value="FIRST">First Class</SelectItem>
                        </SelectContent>
                      </Select>
                     <Button onClick={handleSearchClick} type="button" className="bg-orange-500 hover:bg-orange-600  text-black">
                        <SearchIcon className="mr-2 h-4 w-4" /> Search Flights
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="oneway">
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input placeholder="From" className="bg-white" value={fromAirport} onChange={handleFromChange}/>
                    <Input placeholder="To" className="bg-white" value={toAirport} onChange={handleToChange} />
                      <div className="flex space-x-2">
                        <div className="daterangepicker-container">
                          <span>Date :  </span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !date1 && "text-muted-foreground"
                                        )}
                                        >
                                        <CalendarIcon />
                                        {date1 ? format(date1, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="start"
                                        className="flex w-auto flex-col space-y-2 p-2"
                                    >
                                        <Select
                                        onValueChange={(value) =>
                                            setDate1(addDays(new Date(), parseInt(value)))
                                        }
                                        >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="0">Today</SelectItem>
                                            <SelectItem value="1">Tomorrow</SelectItem>
                                            <SelectItem value="3">In 3 days</SelectItem>
                                            <SelectItem value="7">In a week</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <div className="rounded-md border">
                                        <Calendar mode="single" selected={date1} onSelect={setDate1} />
                                        </div>
                                    </PopoverContent>
                                    </Popover>
                                                                        

                        </div>
                      </div>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="premium">Premium Economy</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handlerSearch} type="button" className="bg-orange-500 hover:bg-orange-600 text-white"  >
                        <SearchIcon className="mr-2 h-4 w-4" /> Search Flights
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="multi">
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="grid grid-cols-1 gap-4">
                        <div className="flex space-x-2">
                        <Input placeholder="From" className="bg-white" value={fromAirport} onChange={handleFromChange}/>
                        <Input placeholder="To" className="bg-white" value={toAirport} onChange={handleToChange} />
                        </div>
                        <div className="flex space-x-2">
                            <Input placeholder="Depart 1" className="bg-white" />
                            <Input placeholder="Depart 2" className="bg-white" />
                        </div>
                        <div className="flex space-x-2">
                            <Input placeholder="Depart 3" className="bg-white" />
                            <Input placeholder="Return 1" className="bg-white" />
                        </div>
                        <div className="flex space-x-2">
                            <Input placeholder="Return 2" className="bg-white" />
                            <Input placeholder="Return 3" className="bg-white" />
                        </div>
                        </div>

                        <Select>
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Passengers" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 Adult</SelectItem>
                            <SelectItem value="2">2 Adults</SelectItem>
                            <SelectItem value="3">3 Adults</SelectItem>
                        </SelectContent>
                        </Select>

                        <Select>
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="premium">Premium Economy</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                        </Select>
                        
                        <Button onClick={handlerSearch} type="button" className="bg-orange-500 hover:bg-orange-600 text-white"  >
                        <SearchIcon className="mr-2 h-4 w-4" /> Search Flights
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card> */}
            <FlightSearchBox/>
          </div>
        </section>
        {loading && <LoadingSpinner />}
        {searchResults && (
          <div className='container mx-auto px-4 my-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchResults.data.map((result) => (
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
        )}
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                {/* Text Section (col-5) */}
                <div className="w-full md:w-5/12 px-4 flex items-center justify-center">
                    <div className="visitinfo text-center">
                    <Link href="#">
                        <strong className="font-bold text-4xl">Visit Dubai</strong>
                        <p className="text-center">
                        Luxury holidays to Dubai cast a magic spell with the city's stunning trappings that enthral one to the hilt. While Jumeirah Beach enamours sun-worshippers seeking a perfect beach escape, Dubai Creek offers a rendezvous with the city's old world charm from aboard the lavish dhows.
                        </p>
                        <span className="cbtn">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </span>
                        <button className="rounded-lg p-3 py-1 font-bold bg-slate-200">
                         <span><ChevronRight/></span>
                        </button>
                    </Link>
                    </div>
                </div>

                {/* Image Section (col-7) */}
                <div className="w-full md:w-7/12 px-4">
                    <div className="visitimg">
                    <img src="https://www.traveltrolley.co.uk/assets/images/visitdubai.jpg" loading="lazy" width="1150" height="331" alt="visit dubai" />
                    </div>
                </div>
                </div>
            </div>
            </section>

                        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['New York', 'London', 'Paris'].map((city) => (
                <Card key={city} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-0">
                    <img src={`/skybox.jpg?height=200&width=400`} alt={city} className="w-full h-48 object-cover" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{city}</CardTitle>
                    <CardDescription>Explore the wonders of {city}</CardDescription>
                  </CardContent>
                  <CardFooter className="bg-gray-50 p-4">
                    <Button variant="outline" className="w-full">View Deals</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Travel Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Summer Sale', 'Last Minute Deals', 'City Breaks'].map((deal) => (
                <Card key={deal} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{deal}</CardTitle>
                    <CardDescription>Limited time offer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Save up to 50% on selected {deal.toLowerCase()}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition-colors">About Travel Trolley</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition-colors">Flight Booking</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Hotel Booking</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Holiday Packages</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300 transition-colors">Facebook</a>
              <a href="#" className="hover:text-blue-300 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-300 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 Travel Trolley. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};  