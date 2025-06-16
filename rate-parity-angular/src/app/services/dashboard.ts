import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface KpiData {
  title: string;
  value: string;
  subValue: string;
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  badgeText: string | null;
  badgeType: 'good' | 'high' | 'default';
}

export interface FilterState {
  selectedHotel: string;
  dateRange: string;
  region: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private filtersSubject = new BehaviorSubject<FilterState>({
    selectedHotel: 'Dubai Hotel - 5 Star',
    dateRange: 'Last 7 days',
    region: 'All Regions'
  });

  public filters$ = this.filtersSubject.asObservable();

  private kpiData: KpiData[] = [
    {
      title: 'Average Rate',
      value: '$195',
      subValue: '5.2% increase vs last period',
      icon: 'trending-up',
      iconBgClass: 'bg-blue-100 dark:bg-blue-800',
      iconTextClass: 'text-blue-600 dark:text-blue-400',
      badgeText: 'Good',
      badgeType: 'good',
    },
    {
      title: 'Parity Status',
      value: '92%',
      subValue: '2.1% decrease vs last period',
      icon: 'shield-check',
      iconBgClass: 'bg-blue-100 dark:bg-blue-800',
      iconTextClass: 'text-blue-600 dark:text-blue-400',
      badgeText: null,
      badgeType: 'default',
    },
    {
      title: 'Market Position',
      value: '#2',
      subValue: 'of 15 competitors',
      icon: 'users',
      iconBgClass: 'bg-blue-100 dark:bg-blue-800',
      iconTextClass: 'text-blue-600 dark:text-blue-400',
      badgeText: null,
      badgeType: 'default',
    },
    {
      title: 'Event Impact',
      value: 'Conference Week',
      subValue: '3 major events nearby',
      icon: 'calendar-days',
      iconBgClass: 'bg-blue-100 dark:bg-blue-800',
      iconTextClass: 'text-blue-600 dark:text-blue-400',
      badgeText: 'High',
      badgeType: 'high',
    },
  ];

  constructor() { }

  getKpiData(): KpiData[] {
    return this.kpiData;
  }

  updateFilters(filters: Partial<FilterState>): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({ ...currentFilters, ...filters });
  }

  getCurrentFilters(): FilterState {
    return this.filtersSubject.value;
  }
}
