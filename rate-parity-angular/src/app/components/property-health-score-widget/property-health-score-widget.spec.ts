import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyHealthScoreWidget } from './property-health-score-widget';

describe('PropertyHealthScoreWidget', () => {
  let component: PropertyHealthScoreWidget;
  let fixture: ComponentFixture<PropertyHealthScoreWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyHealthScoreWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyHealthScoreWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
