import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDropdown } from './users-dropdown';

describe('UsersDropdown', () => {
  let component: UsersDropdown;
  let fixture: ComponentFixture<UsersDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
