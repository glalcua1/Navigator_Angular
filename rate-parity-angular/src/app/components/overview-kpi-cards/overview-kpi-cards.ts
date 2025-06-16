import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, KpiData } from '../../services/dashboard';

@Component({
  selector: 'app-overview-kpi-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview-kpi-cards.html',
  styleUrls: ['./overview-kpi-cards.scss']
})
export class OverviewKpiCardsComponent implements OnInit {
  kpiData: KpiData[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.kpiData = this.dashboardService.getKpiData();
  }

  getBadgeClasses(badgeType: 'good' | 'high' | 'default'): string {
    const badgeClasses = {
      good: 'bg-green-500 hover:bg-green-600 text-white',
      high: 'bg-red-500 hover:bg-red-600 text-white',
      default: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600',
    };
    return badgeClasses[badgeType];
  }

  trackByIndex(index: number, item: KpiData): number {
    return index;
  }
}
