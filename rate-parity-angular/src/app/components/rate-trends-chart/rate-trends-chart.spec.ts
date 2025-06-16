import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTrendsChart } from './rate-trends-chart';

describe('RateTrendsChart', () => {
  let component: RateTrendsChart;
  let fixture: ComponentFixture<RateTrendsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTrendsChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateTrendsChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
