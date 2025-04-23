import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryRoomsPageComponent } from './query-rooms-page.component';

describe('QueryRoomsPageComponent', () => {
  let component: QueryRoomsPageComponent;
  let fixture: ComponentFixture<QueryRoomsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryRoomsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryRoomsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
