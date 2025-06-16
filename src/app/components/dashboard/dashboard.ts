@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    OverviewKpiCardsComponent,
    RateTrendsChartComponent,
    MarketDemandWidgetComponent,
    PropertyHealthScoreWidgetComponent
  ]
})
export class DashboardComponent {
  currentDate: Date = new Date();

  constructor() {
    // Update current date every minute for real-time display
    setInterval(() => {
      this.currentDate = new Date();
    }, 60000);
  }

  getCurrentMonth(): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[this.currentDate.getMonth()];
  }
} 