import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeThemeModal } from './change-theme-modal';

describe('ChangeThemeModal', () => {
  let component: ChangeThemeModal;
  let fixture: ComponentFixture<ChangeThemeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeThemeModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeThemeModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
