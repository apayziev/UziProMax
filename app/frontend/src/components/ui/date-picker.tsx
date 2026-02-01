"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import { ru } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerProps {
  value?: Date | string | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  language?: "uz" | "ru"
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  language = "uz",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  
  // Default placeholder based on language
  const displayPlaceholder = placeholder || (language === "ru" ? "дд.мм.гггг" : "kun.oy.yil")
  
  // Parse date if string
  const date = React.useMemo(() => {
    if (!value) return undefined
    if (value instanceof Date) return value
    return new Date(value)
  }, [value])

  // Sync input value with date
  React.useEffect(() => {
    if (date && isValid(date)) {
      setInputValue(format(date, "dd.MM.yyyy"))
    } else {
      setInputValue("")
    }
  }, [date])

  // Year/month navigation state
  const [viewDate, setViewDate] = React.useState(date || new Date())
  
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    const arr = []
    for (let i = currentYear; i >= currentYear - 100; i--) {
      arr.push(i)
    }
    return arr
  }, [])

  const months = language === "ru" 
    ? ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    : ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"]

  const locale = language === "ru" ? ru : undefined

  // Handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d.]/g, "")
    
    // Auto-add dots for formatting dd.MM.yyyy
    if (val.length === 2 && inputValue.length < 2) {
      val += "."
    } else if (val.length === 5 && inputValue.length < 5) {
      val += "."
    }
    
    // Limit length
    if (val.length > 10) val = val.slice(0, 10)
    
    setInputValue(val)
    
    // Try to parse when complete
    if (val.length === 10) {
      const parsed = parse(val, "dd.MM.yyyy", new Date())
      if (isValid(parsed) && parsed.getFullYear() >= 1900 && parsed.getFullYear() <= new Date().getFullYear()) {
        onChange?.(parsed)
        setViewDate(parsed)
      }
    }
  }

  const handleInputBlur = () => {
    // On blur, try to parse or reset
    if (inputValue.length === 10) {
      const parsed = parse(inputValue, "dd.MM.yyyy", new Date())
      if (isValid(parsed) && parsed.getFullYear() >= 1900 && parsed.getFullYear() <= new Date().getFullYear()) {
        onChange?.(parsed)
      } else {
        // Invalid date - reset to previous value
        if (date && isValid(date)) {
          setInputValue(format(date, "dd.MM.yyyy"))
        } else {
          setInputValue("")
        }
      }
    } else if (inputValue.length > 0 && inputValue.length < 10) {
      // Incomplete - reset
      if (date && isValid(date)) {
        setInputValue(format(date, "dd.MM.yyyy"))
      } else {
        setInputValue("")
      }
    } else if (inputValue.length === 0) {
      onChange?.(null)
    }
  }

  return (
    <div className={cn("flex gap-1", className)}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder={displayPlaceholder}
        className="flex-1"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between gap-2 p-3 border-b">
          <Select
            value={viewDate.getMonth().toString()}
            onValueChange={(val) => {
              const newDate = new Date(viewDate)
              newDate.setMonth(parseInt(val))
              setViewDate(newDate)
            }}
          >
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={viewDate.getFullYear().toString()}
            onValueChange={(val) => {
              const newDate = new Date(viewDate)
              newDate.setFullYear(parseInt(val))
              setViewDate(newDate)
            }}
          >
            <SelectTrigger className="w-[90px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onChange?.(d || null)
            setOpen(false)
          }}
          month={viewDate}
          onMonthChange={setViewDate}
          locale={locale}
          hideNavigation
          weekStartsOn={1}
          formatters={{
            formatWeekdayName: (date) => {
              const weekdays = language === "ru" 
                ? ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
                : ["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"]
              return weekdays[date.getDay()]
            }
          }}
        />
      </PopoverContent>
      </Popover>
    </div>
  )
}
