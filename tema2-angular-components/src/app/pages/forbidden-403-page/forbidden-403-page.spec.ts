import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forbidden403Page } from './forbidden-403-page';

describe('Forbidden403Page', () => {
  let component: Forbidden403Page;
  let fixture: ComponentFixture<Forbidden403Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forbidden403Page]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forbidden403Page);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
