"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FieldSelectorProps {
  availableFields: string[]
  selectedFields: string[]
  onToggle: (field: string) => void
}

export default function FieldSelector({ availableFields, selectedFields, onToggle }: FieldSelectorProps) {
  // Format field name for display
  const formatFieldName = (field: string) => {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/([a-z])([A-Z])/g, "$1 $2")
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Select metrics to display:</h3>
      <ScrollArea className="whitespace-nowrap pb-2">
        <div className="flex flex-wrap gap-2">
          {availableFields.map((field) => (
            <Badge
              key={field}
              variant={selectedFields.includes(field) ? "default" : "outline"}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onToggle(field)}
            >
              {formatFieldName(field)}
            </Badge>
          ))}
        </div>
      </ScrollArea>
      {selectedFields.length === 0 && (
        <p className="text-sm text-muted-foreground mt-2">Please select at least one metric to display</p>
      )}
    </div>
  )
}

