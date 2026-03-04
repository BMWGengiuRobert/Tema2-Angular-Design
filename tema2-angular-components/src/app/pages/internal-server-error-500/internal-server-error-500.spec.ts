import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServerError500 } from './internal-server-error-500';

describe('InternalServerError500', () => {
  let component: InternalServerError500;
  let fixture: ComponentFixture<InternalServerError500>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalServerError500]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalServerError500);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
