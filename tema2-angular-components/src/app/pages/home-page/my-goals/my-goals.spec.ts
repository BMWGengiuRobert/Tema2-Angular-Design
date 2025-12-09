import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGoals } from './my-goals';

describe('MyGoals', () => {
  let component: MyGoals;
  let fixture: ComponentFixture<MyGoals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyGoals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGoals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
