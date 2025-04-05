import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeUtilsService {

  createDateTimeString(date: Date, hour: number): string {
    const newDate = new Date(date);
    newDate.setHours(hour, 0, 0, 0);
    return newDate.toISOString();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('et-EE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  isBeforeOrSameDay(date1: Date, date2: Date): boolean {
    return date1 <= date2;
  }

  isAfterOrSameDay(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1 >= d2;
  }

  getNextDay(date: Date): Date {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }

  getPreviousDay(date: Date): Date {
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    return prevDay;
  }
}
