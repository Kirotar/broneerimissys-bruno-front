import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTimerComponent } from './booking-timer.component';

describe('BookingTimerComponent', () => {
  let component: BookingTimerComponent;
  let fixture: ComponentFixture<BookingTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
