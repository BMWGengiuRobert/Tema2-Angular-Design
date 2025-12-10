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
  currentDate = new Date()
  currentYear = this.currentDate.getFullYear()
  currentMonth = this.currentDate.getMonth()
  week: WeekDay[] = []

  ngOnInit(): void {
    this.createCurrentWeek()
  }

  createCurrentWeek() {

    let index: number = 3
    for (let i = 0; i < 3; i++) {
      const dayNumber: number = this.currentDate.getDate() - index
      let dayNumberStr: string = dayNumber.toString().slice(0,3)

      if(dayNumberStr.length === 1){
        dayNumberStr = '0' + dayNumberStr
      }

      const dateString: string = new Date(this.currentYear, this.currentMonth, dayNumber).toDateString().slice(0,3)

      const day: WeekDay = {
        dayName: dateString,
        dayNumber: dayNumberStr
      }

      this.week.push(day)
      index--
    }

    this.week.push({
      dayName: this.currentDate.toDateString().slice(0, 3),
      dayNumber: this.currentDate.getDate().toString()
    })

    index = 1

    for (let i = 0; i < 3; i++) {
      const dayNumber: number = this.currentDate.getDate() + index
      let dayNumberStr: string = dayNumber.toString().slice(0,3)

      if(dayNumberStr.length === 1){
        dayNumberStr = '0' + dayNumberStr
      }

      const dateString: string = new Date(this.currentYear, this.currentMonth, dayNumber).toDateString().slice(0,3)

      const day: WeekDay = {
        dayName: dateString,
        dayNumber: dayNumberStr.toString()
      }

      this.week.push(day)
      index++
    }
  }

  nextDay(){
    const lastDayFromWeek = this.week[this.week.length - 1]
    const dayName = new Date(this.currentYear, this.currentMonth, parseInt(lastDayFromWeek.dayNumber) + 1).toDateString().slice(0,3)

    this.week.shift()
    this.week.push({
      dayName: dayName,
      dayNumber: (parseInt(lastDayFromWeek.dayNumber) + 1).toString()
    })
  }

  previousDay(){
    const firstDayFromWeek = this.week[0]
    const dayName = new Date(this.currentYear, this.currentMonth, parseInt(firstDayFromWeek.dayNumber) - 1).toDateString().slice(0,3)
    this.week.pop()
    this.week.unshift({
      dayName: dayName,
      dayNumber: (parseInt(firstDayFromWeek.dayNumber) - 1).toString()
    })
  }

}
