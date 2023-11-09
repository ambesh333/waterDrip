import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { SelectRangeEventHandler } from "react-day-picker";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { FormEvent, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarDateRangePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange;
  onDateChange: (newDate: DateRange) => void;
}

export function CalendarDateRangePicker({
  className,
  date,
  onDateChange,
}: CalendarDateRangePickerProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(date);

  const handleDateChange: SelectRangeEventHandler = (selected) => {
    console.log(selected);
    setDateRange(selected);
    if (onDateChange) {
      // renamed from 'onChange' to 'onDateChange'
      onDateChange(selected as DateRange);
    }
  };

  console.log(dateRange);

  return (
    <div
      className={cn("grid gap-2", className)}
      onSubmit={(e: FormEvent<HTMLDivElement>) => e.preventDefault()}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// return (
//   <div className={cn("grid gap-2", className)}>
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           id="date"
//           variant={"outline"}
//           className={cn(
//             "w-[260px] justify-start text-left font-normal",
//             !dateRange && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />

//           {dateRange?.from ? (
//             dateRange.to ? (
//               <>
//                 {format(dateRange.from, "LLL dd, y")} -{" "}
//                 {format(dateRange.to, "LLL dd, y")}
//               </>
//             ) : (
//               format(dateRange.from, "LLL dd, y")
//             )
//           ) : (
//             <span>Pick a date</span>
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="end">
//         <Calendar
//           initialFocus
//           mode="range"
//           defaultMonth={dateRange?.from}
//           selected={dateRange}
//           onSelect={handleDateChange}
//           numberOfMonths={2}
//         />
//       </PopoverContent>
//     </Popover>
//   </div>
// );
