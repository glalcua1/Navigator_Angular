import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';

// Chart.js registration moved to createChart method for SSR compatibility

interface ChartDataPoint {
  date: string;
  medianCompRate: number;
  upperBound: number;
  lowerBound: number;
  marketDemand: number;
  myHotelRate: number;
}

@Component({
  selector: 'app-rate-trends-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-trends-chart.html',
  styleUrls: ['./rate-trends-chart.scss']
})
export class RateTrendsChartComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private chartData: ChartDataPoint[] = [
    {
      date: "1 Jun 2025",
      medianCompRate: 2200,
      upperBound: 2400,
      lowerBound: 1600,
      marketDemand: 60,
      myHotelRate: 680,
    },
    {
      date: "3 Jun 2025",
      medianCompRate: 2180,
      upperBound: 2350,
      lowerBound: 1580,
      marketDemand: 58,
      myHotelRate: 680,
    },
    {
      date: "5 Jun 2025",
      medianCompRate: 2160,
      upperBound: 2320,
      lowerBound: 1560,
      marketDemand: 56,
      myHotelRate: 680,
    },
    {
      date: "7 Jun 2025",
      medianCompRate: 2240,
      upperBound: 2420,
      lowerBound: 1640,
      marketDemand: 62,
      myHotelRate: 680,
    },
    {
      date: "9 Jun 2025",
      medianCompRate: 2300,
      upperBound: 2500,
      lowerBound: 1720,
      marketDemand: 30,
      myHotelRate: 680,
    },
    {
      date: "11 Jun 2025",
      medianCompRate: 2280,
      upperBound: 2480,
      lowerBound: 1700,
      marketDemand: 32,
      myHotelRate: 680,
    },
    {
      date: "13 Jun 2025",
      medianCompRate: 2260,
      upperBound: 2460,
      lowerBound: 1680,
      marketDemand: 34,
      myHotelRate: 680,
    },
    {
      date: "15 Jun 2025",
      medianCompRate: 2200,
      upperBound: 2400,
      lowerBound: 1620,
      marketDemand: 25,
      myHotelRate: 680,
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
    }
  }

  private createChart(): void {
    if (!isPlatformBrowser(this.platformId) || !this.chartCanvas) return;
    
    // Register Chart.js components only in browser
    Chart.register(...registerables);
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.chartData.map(d => d.date),
        datasets: [
          {
            type: 'bar',
            label: 'Market Demand (%)',
            data: this.chartData.map(d => d.marketDemand),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            yAxisID: 'y1',
            order: 3,
          },
          {
            type: 'line',
            label: 'Median Comp Rate',
            data: this.chartData.map(d => d.medianCompRate),
            borderColor: 'rgba(168, 85, 247, 1)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            borderWidth: 3,
            fill: false,
            yAxisID: 'y',
            order: 1,
          },
          {
            type: 'line',
            label: 'My Hotel Rate',
            data: this.chartData.map(d => d.myHotelRate),
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            fill: false,
            yAxisID: 'y',
            order: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                if (label.includes('Demand')) {
                  return `${label}: ${value}%`;
                } else {
                  return `${label}: $${value}`;
                }
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            },
            ticks: {
              maxRotation: 45,
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Rate ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Market Demand (%)'
            },
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
