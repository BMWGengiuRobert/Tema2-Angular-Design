import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPicture } from './avatar-picture';

describe('AvatarPicture', () => {
  let component: AvatarPicture;
  let fixture: ComponentFixture<AvatarPicture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarPicture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarPicture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
