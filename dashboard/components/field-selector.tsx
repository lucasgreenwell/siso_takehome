"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FieldSelectorProps {
  availableFields: string[]
  selectedFields: string[]
  onChange: (fields: string[]) => void
}

export function FieldSelector({ availableFields, selectedFields, onChange }: FieldSelectorProps) {
  const [open, setOpen] = React.useState(false)

  const toggleField = (field: string) => {
    if (selectedFields.includes(field)) {
      // Don't allow removing the last field
      if (selectedFields.length > 1) {
        onChange(selectedFields.filter((f) => f !== field))
      }
    } else {
      onChange([...selectedFields, field])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="flex flex-wrap gap-1 max-w-[90%] overflow-hidden">
            {selectedFields.length > 0 ? (
              selectedFields.map((field) => (
                <Badge key={field} variant="secondary" className="mr-1">
                  {field}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Select metrics...</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search metrics..." />
          <CommandList>
            <CommandEmpty>No metric found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[200px]">
                {availableFields.map((field) => (
                  <CommandItem
                    key={field}
                    value={field}
                    onSelect={() => {
                      toggleField(field)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedFields.includes(field) ? "opacity-100" : "opacity-0")}
                    />
                    {field}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

