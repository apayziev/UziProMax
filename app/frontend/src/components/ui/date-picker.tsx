"use client"

import * as React from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  showAge?: boolean
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Sanani tanlang",
  language = "uz",
  showAge = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  // Parse date if string
  const date = React.useMemo(() => {
    if (!value) return undefined
    if (value instanceof Date) return value
    return new Date(value)
  }, [value])

  // Calculate age
  const age = React.useMemo(() => {
    if (!date || !showAge) return null
    const today = new Date()
    let years = today.getFullYear() - date.getFullYear()
    const m = today.getMonth() - date.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) years--
    return years
  }, [date, showAge])

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            <span>
              {format(date, "dd.MM.yyyy", { locale })}
              {age !== null && (
                <span className="ml-2 text-muted-foreground">
                  ({age} {language === "ru" ? "лет" : "yosh"})
                </span>
              )}
            </span>
          ) : (
            <span>{placeholder}</span>
          )}
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
  )
}
