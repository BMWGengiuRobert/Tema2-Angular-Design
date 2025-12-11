import { Component, OnInit } from '@angular/core';
import { WeekDay } from '../../../models/week-day.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-card',
  imports: [CommonModule],
  templateUrl: './calendar-card.html',
  styleUrl: './calendar-card.sass',
})
export class CalendarCard implements OnInit {
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  isDropdownOpen: boolean = false;
  currentDate = new Date()
  currentYear = this.currentDate.getFullYear()
  currentMonth = this.currentDate.getMonth()
  week: WeekDay[] = []

  ngOnInit(): void {
    this.createCurrentWeek(this.currentDate)
  }

  createCurrentWeek(dateInput: Date) {
    this.week = []
    const index: number = 3
    const currentMonth: number = dateInput.getMonth()

    for (let i = -index; i <= index; i++) {
      const date: Date = new Date(dateInput)
      date.setDate(date.getDate() + i)

      const dayNumberStr: string = date.getDate().toString().padStart(2, '0')
      const dateNameString: string = date.toDateString().slice(0, 3)
      const isCurrentMonth: boolean = date.getMonth() === currentMonth

      const day: WeekDay = {
        dayName: dateNameString,
        dayNumber: dayNumberStr,
        isCurrentMonth: isCurrentMonth
      }

      this.week.push(day)
    }

  }

  nextDay() {
    const nextDate: Date = new Date(this.currentDate)
    nextDate.setDate(nextDate.getDate() + 1)

    this.currentDate = nextDate
    this.currentMonth = nextDate.getMonth()
    this.currentYear = nextDate.getFullYear()

    this.createCurrentWeek(nextDate)
  }

  previousDay() {
    const previousDate: Date = new Date(this.currentDate)
    previousDate.setDate(previousDate.getDate() - 1)

    this.currentDate = previousDate
    this.currentMonth = previousDate.getMonth()
    this.currentYear = previousDate.getFullYear()

    this.createCurrentWeek(previousDate)
  }

  changeMonth(monthIndex: number) {
    this.currentMonth = monthIndex
    this.currentDate.setMonth(monthIndex)
    this.currentYear = this.currentDate.getFullYear()
    this.createCurrentWeek(this.currentDate)
    this.toggleDropdown()
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }

}