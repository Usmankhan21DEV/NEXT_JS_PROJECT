"use client";
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

function Sidebar({ className,data }) {
    // Initializing the range slider state with min and max values
    const [sidevalue, setSideValue] = useState([0, 1000]);
        //console.log(data);
    // Handle changes in the slider (for both min and max values)
    const handleFromChange = (value) => {
        console.log("Slider Value:", value);  // Log the updated value
        setSideValue(value);  // Update state with the new value
    };

    return (
        <div className={`bg-white p-6 rounded-lg shadow ${className}`}>
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <Slider
                        value={sidevalue}  // Controlled value for the range slider
                        onValueChange={handleFromChange}  // `onValueChange` is required for radix-ui sliders
                        max={1000}  // Maximum value of the slider
                        min={0}     // Minimum value of the slider
                        step={5}   // Step size of the slider
                        aria-label="Price range"
                    />
                    <div className="flex justify-between mt-2">
                        {/* Display the current range values dynamically */}
                        <span>${sidevalue[0]}</span> {/* Min value */}
                        <span>${sidevalue[1]}+</span> {/* Max value */}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Airlines</h3>
                    <div className="space-y-2">
                        {["British Airways", "EasyJet", "Ryanair"].map((airline) => (
                            <div key={airline} className="flex items-center">
                                <Checkbox id={airline} />
                                <Label htmlFor={airline} className="ml-2">
                                    {airline}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Departure Time</h3>
                    <div className="space-y-2">
                        {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
                            <div key={time} className="flex items-center">
                                <Checkbox id={time} />
                                <Label htmlFor={time} className="ml-2">
                                    {time}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
