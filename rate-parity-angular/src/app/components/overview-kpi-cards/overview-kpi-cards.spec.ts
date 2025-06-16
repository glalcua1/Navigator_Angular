import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewKpiCards } from './overview-kpi-cards';

describe('OverviewKpiCards', () => {
  let component: OverviewKpiCards;
  let fixture: ComponentFixture<OverviewKpiCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewKpiCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewKpiCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
