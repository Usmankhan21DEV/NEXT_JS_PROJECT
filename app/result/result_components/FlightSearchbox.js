"use client";

import { useState ,useEffect} from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { addDays,format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {  Command,  CommandEmpty,  CommandGroup,  CommandInput,  CommandItem,} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MenuIcon, PhoneIcon, PlaneIcon,ChevronRight, SearchIcon, XIcon,Plane, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Combobox } from '../../../components/ui/combobox';

const FlightSearchBox = ( ) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [date1, setDate1] = useState();
    const [date, setDate] = useState({
      from: new Date(), // Default to today
      to: addDays(new Date(), 1), // Default range (today + 1 day)
    });
    const [filteredFromAirports, setFilteredFromAirports] = useState([]);
    const [filteredToAirports, setFilteredToAirports] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [passcount, setpasscount] = useState('1'); 
    const [travelClass, settravelClass] = useState('ECONOMY'); 
    const [fromAirport, setFromAirport] = useState(''); 
    const [toAirport, setToAirport] = useState('');
    const [airports, setAirports] = useState([]);

    const handleSearchClick = () => {
        const depdate = format(new Date(date.from), "yyyy-MM-dd");
        const fromLocation = fromAirport.split(" (")[1].split(")")[0];
        const toLocation = toAirport.split(" (")[1].split(")")[0];
        const queryParams = new URLSearchParams({
          depdate,
          fromLocation,
          toLocation,
          passcount,
          travelClass,
        }).toString();    
        window.location.href = `/result?${queryParams}`;
      };
      const handlerSearch = async (e) => {    
        e.preventDefault();
        setLoading(true);
      };
      const handleFromChange = (value) => {
        setFromAirport(value);
      };
      const handleToChange = (value) => {
        setToAirport(value); 
      };
      const disablePastDates = (date) => {
        const today = new Date();
        return date <= today; 
      };
      const handleClassChange = (value) => {
        settravelClass(value);
      };
      const handlePASSENGERCountChange = (value) => {
        setpasscount(value);
      };
    useEffect(() => {
        const fetchAirports = async () => {
          try {
            const response = await fetch('/api/fetch');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            if (data.success === 'true') {
              setAirports(data.data);
              setFilteredFromAirports(data.data || []); 
              setFilteredToAirports(data.data || []); 
              if (data.data.length > 0) {
                setFromAirport(data.data[0].airport_info);
                setToAirport(data.data[0].airport_info);
              }
            } else {
              console.error('No airports found.');
            }
          } catch (error) {
            console.error('Error fetching airports:', error);
          }
        };
        fetchAirports();
      }, []);
    
  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg bg-yellowCustom">
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
                <label
                  htmlFor="from-airport"
                  className="block mb-2 text-sm font-medium"
                >
                  From
                </label>
                <Combobox
                  labelField="airport_info" // The field to display
                  valueField="airport_info" // The field used as the value
                  data={airports} // The array of airports
                  value={fromAirport} // The selected value
                  onChange={handleFromChange} // Function to handle value changes
                  placeholder="Select airport"
                />
              </div>
              <div>
                <label
                  htmlFor="to-airport"
                  className="block mb-2 text-sm font-medium"
                >
                  To
                </label>
                <Combobox
                  labelField="airport_info" // The field to display
                  valueField="airport_info" // The field used as the value
                  data={airports} // The array of airports
                  value={toAirport} // The selected value
                  onChange={handleToChange} // Function to handle value changes
                  placeholder="Select airport"
                />
              </div>

              <div className="flex space-x-2">
                <div className="daterangepicker-container mx-6">
                  <label className="block mb-2 text-sm font-medium">
                    Dates :{" "}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
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
                <SelectContent>
                  <SelectItem value="1">1 Adult</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">3 Adults</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={handleClassChange}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ECONOMY">Economy Class</SelectItem>
                  <SelectItem value="PREMIUM_ECONOMY">
                    Premium Economy Class
                  </SelectItem>
                  <SelectItem value="BUSINESS">Business Class</SelectItem>
                  <SelectItem value="FIRST">First Class</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSearchClick}
                type="button"
                className="bg-orange-500 hover:bg-orange-600  text-black"
              >
                <SearchIcon className="mr-2 h-4 w-4" /> Search Flights
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="oneway">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                placeholder="From"
                className="bg-white"
                value={fromAirport}
                onChange={handleFromChange}
              />
              <Input
                placeholder="To"
                className="bg-white"
                value={toAirport}
                onChange={handleToChange}
              />
              <div className="flex space-x-2">
                <div className="daterangepicker-container">
                  <span>Date : </span>
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
                        {date1 ? (
                          format(date1, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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
                        <Calendar
                          mode="single"
                          selected={date1}
                          onSelect={setDate1}
                        />
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
              <Button
                onClick={handlerSearch}
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <SearchIcon className="mr-2 h-4 w-4" /> Search Flights
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="multi">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="From"
                    className="bg-white"
                    value={fromAirport}
                    onChange={handleFromChange}
                  />
                  <Input
                    placeholder="To"
                    className="bg-white"
                    value={toAirport}
                    onChange={handleToChange}
                  />
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

              <Button
                onClick={handlerSearch}
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <SearchIcon className="mr-2 h-4 w-4" /> Search Flights
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlightSearchBox;