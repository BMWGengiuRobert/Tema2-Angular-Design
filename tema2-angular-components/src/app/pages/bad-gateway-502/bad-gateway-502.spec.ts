import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadGateway502 } from './bad-gateway-502';

describe('BadGateway502', () => {
  let component: BadGateway502;
  let fixture: ComponentFixture<BadGateway502>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadGateway502]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadGateway502);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
