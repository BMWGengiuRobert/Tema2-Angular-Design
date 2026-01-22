import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePeopleModal } from './invite-people-modal';

describe('InvitePeopleModal', () => {
  let component: InvitePeopleModal;
  let fixture: ComponentFixture<InvitePeopleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitePeopleModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitePeopleModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
