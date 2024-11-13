"use client";

import { useState ,useEffect} from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDays,format } from "date-fns";
//import { DayPicker, DateRange } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MenuIcon, PhoneIcon, PlaneIcon,ChevronRight, SearchIcon, XIcon,Plane } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [date1, setDate1] = useState();
  const [date, setDate] = useState({
    from: new Date(), // Default to today
    to: addDays(new Date(), 1), // Default range (today + 1 day)
  });
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');
  const [airports, setAirports] = useState([]);

  // Fetch the data when the page loads
  useEffect(() => {
    const fetchAirports = async () => {
        try {
          const response = await fetch('/api/fetch');          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
  
          if (data.success === 'true') {
            setAirports(data.data); // Store the airport data
            if (data.data.length > 0) {
              setFromAirport(data.data[0].airport_info); // Set the first airport as "From"
              setToAirport(data.data[0].airport_info); // Set the first airport as "To"
            }
          } else {
            console.error('No airports found.');
          }
        } catch (error) {
          console.error('Error fetching airports:', error);
        }
      };

    fetchAirports();
    console.log(toAirport);
    console.log(
      
    );
    
  }, []);
  const handlerSearch = (e) => {
    e.preventDefault(); // Prevents form submission
    console.log("IT Works");
  };
  const handleFromChange = (event) => {
    setFromAirport(event.target.value);
  };

  // Handle changes in "To" input
  const handleToChange = (event) => {
    setToAirport(event.target.value);
  };
  // Function to disable past dates
  const disablePastDates = (date) => {
    const today = new Date();
    return date <= today; // Disable dates in the past
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <header className="bg-blue-600 text-white p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <a href="#" className="text-lg hover:text-blue-500">Flights</a>
                  <a href="#" className="text-lg hover:text-blue-500">Hotels</a>
                  <a href="#" className="text-lg hover:text-blue-500">Holidays</a>
                  <a href="#" className="text-lg hover:text-blue-500">Car Hire</a>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold">Travel Trolley</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-200 transition-colors">Flights</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Hotels</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Holidays</a>
            <a href="#" className="hover:text-blue-200 transition-colors">Car Hire</a>
          </nav>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5" />
            <span className="hidden sm:inline">0208 843 4400</span>
          </div>
        </div>
      </header> */}

      <main className="flex-grow">
      <section className="bg-cover bg-center text-black py-16" style={{ backgroundImage: "url('/banner.jpg')" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Search for cheap flights</h2>
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <Tabs defaultValue="return" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="return">Return</TabsTrigger>
                    <TabsTrigger value="oneway">One way</TabsTrigger>
                    <TabsTrigger value="multi">Multi-city</TabsTrigger>
                  </TabsList>
                  <TabsContent value="return">
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input placeholder="From" className="bg-white" value={fromAirport} onChange={handleFromChange}/>
                      <Input placeholder="To" className="bg-white" value={toAirport} onChange={handleToChange} />
                      <div className="flex space-x-2">
                        <div className="daterangepicker-container">
                          <span>Dates :  </span>
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
                      <Button onClick={handlerSearch} type="button" className="bg-orange-500 hover:bg-orange-600 text-white">
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
            </Card>
          </div>
        </section>
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
}
