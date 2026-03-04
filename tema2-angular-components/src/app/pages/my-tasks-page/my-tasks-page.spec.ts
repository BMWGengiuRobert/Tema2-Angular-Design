import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksPage } from './my-tasks-page';

describe('MyTasksPage', () => {
  let component: MyTasksPage;
  let fixture: ComponentFixture<MyTasksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTasksPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTasksPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
