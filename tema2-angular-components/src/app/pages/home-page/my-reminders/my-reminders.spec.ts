import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReminders } from './my-reminders';

describe('MyReminders', () => {
  let component: MyReminders;
  let fixture: ComponentFixture<MyReminders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReminders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReminders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
