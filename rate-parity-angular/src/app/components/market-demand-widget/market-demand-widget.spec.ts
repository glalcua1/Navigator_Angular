import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDemandWidget } from './market-demand-widget';

describe('MarketDemandWidget', () => {
  let component: MarketDemandWidget;
  let fixture: ComponentFixture<MarketDemandWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketDemandWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketDemandWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
