import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import {NgClass} from '@angular/common';
@Component({
  selector: 'app-booking-timer',
  imports: [
    NgClass
  ],
  templateUrl: './booking-timer.component.html',
  styleUrl: './booking-timer.component.scss'
})

export class BookingTimerComponent implements OnInit, OnDestroy {
  @Input() durationInMinutes = 10;
  @Output() timerExpired = new EventEmitter<void>();

  private timeRemaining = 0;
  private timerSubscription: Subscription | null = null;

  displayTime = '10:00';
  isWarning = false;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private startTimer(): void {
    this.timeRemaining = this.durationInMinutes * 60;

    this.updateDisplay();

    this.timerSubscription = interval(1000)
      .pipe(
        take(this.timeRemaining + 1) // +1 to include zero
      )
      .subscribe(() => {
        this.timeRemaining--;
        this.updateDisplay();

        if (this.timeRemaining <= 0) {
          this.handleTimerExpired();
        }

        if (this.timeRemaining < 60) {
          this.isWarning = true;
        }
      });
  }

  private updateDisplay(): void {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    this.displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private handleTimerExpired(): void {
    this.stopTimer();
    this.timerExpired.emit();
  }

  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.isWarning = false;
    this.startTimer();
  }
}
