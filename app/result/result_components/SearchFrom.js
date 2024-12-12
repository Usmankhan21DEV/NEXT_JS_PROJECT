import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function SearchForm() {
  return (
    <form className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="from">From</Label>
          <Input id="from" placeholder="Enter city or airport" />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input id="to" placeholder="Enter city or airport" />
        </div>
        <div>
          <Label htmlFor="departure">Departure</Label>
          <Input id="departure" type="date" />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-6">
        <RadioGroup defaultValue="return" className="flex">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="return" id="return" />
            <Label htmlFor="return">Return</Label>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <RadioGroupItem value="one-way" id="one-way" />
            <Label htmlFor="one-way">One way</Label>
          </div>
        </RadioGroup>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Passengers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Adult</SelectItem>
            <SelectItem value="2">2 Adults</SelectItem>
            <SelectItem value="3">3 Adults</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Search Flights</Button>
      </div>
    </form>
  );
}

export default SearchForm;
