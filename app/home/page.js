"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MenuIcon, PhoneIcon, PlaneIcon,ChevronRight, SearchIcon, XIcon,Plane, Loader2 } from 'lucide-react';
import '../../app/style.css';
import FlightSearchBox from '../result/result_components/FlightSearchbox';
export default function Home({}) {   
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
      <section className="bg-cover bg-center text-black py-16" style={{ backgroundImage: "url('/banner.jpg')" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Search for cheap flights</h2>            
            <FlightSearchBox/>
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
                        Luxury holidays to Dubai cast a magic spell with the city&apos;s stunning trappings that enthral one to the hilt. While Jumeirah Beach enamours sun-worshippers seeking a perfect beach escape, Dubai Creek offers a rendezvous with the city&apos;s old world charm from aboard the lavish dhows.
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