import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { OverviewKpiCardsComponent } from '../overview-kpi-cards/overview-kpi-cards';
import { DashboardService } from '../../services/dashboard';
import { RateTrendsChartComponent } from '../rate-trends-chart/rate-trends-chart';
import { MarketDemandWidgetComponent } from '../market-demand-widget/market-demand-widget';
import { PropertyHealthScoreWidgetComponent } from '../property-health-score-widget/property-health-score-widget';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    OverviewKpiCardsComponent,
    RateTrendsChartComponent,
    MarketDemandWidgetComponent,
    PropertyHealthScoreWidgetComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  currentDate = new Date();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    // Component initialization
  }

  getCurrentMonth(): string {
    return this.currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }
}
