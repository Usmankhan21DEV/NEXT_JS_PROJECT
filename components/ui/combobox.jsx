"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Generic Combobox component
export function Combobox({ 
  labelField = "label", // Field to display as the label
  valueField = "value", // Field to use as the actual value
  data = [],           // Data to populate options
  value,               // The selected value
  onChange,            // Function to handle value changes
  placeholder = "Select..."  // Placeholder text
}) {
  const [open, setOpen] = React.useState(false)

  // Search functionality: filter data based on input
  const [searchTerm, setSearchTerm] = React.useState("")
  const filteredData = data.filter((item) =>
    item[labelField].toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data.find((item) => item[valueField] === value)?.[labelField]
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder}...`}
            className="h-9"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CommandList>
            <CommandEmpty>No {placeholder} found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item[valueField]}
                  value={item[valueField]}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {item[labelField]}
                  <Check
                    className={`mr-2 h-4 w-4 ${value === item[valueField] ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
