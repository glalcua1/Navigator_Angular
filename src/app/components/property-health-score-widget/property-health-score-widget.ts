import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChannelData {
  name: string;
  icon: string;
  ranking: string;
  rankingChange: string;
  totalProperties: string;
  reviewScore: string;
  parityIssues: number;
  avgLoss: number;
  iconColor: string;
}

@Component({
  selector: 'app-property-health-score-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-health-score-widget.html',
  styleUrls: ['./property-health-score-widget.scss']
})
export class PropertyHealthScoreWidgetComponent implements OnInit {

  channels: ChannelData[] = [
    {
      name: 'Booking.com',
      icon: 'hotel',
      ranking: '6',
      rankingChange: '-2',
      totalProperties: 'Out of all 19',
      reviewScore: '0/10',
      parityIssues: 0,
      avgLoss: 0,
      iconColor: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      name: 'Expedia',
      icon: 'plane',
      ranking: '8',
      rankingChange: '+1',
      totalProperties: 'Out of all 15',
      reviewScore: '4.2/5',
      parityIssues: 2,
      avgLoss: 150,
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      name: 'Tripadvisor',
      icon: 'star',
      ranking: '1',
      rankingChange: '0',
      totalProperties: 'Out of all 1',
      reviewScore: '5/5',
      parityIssues: 0,
      avgLoss: 0,
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      name: 'Agoda',
      icon: 'map-pin',
      ranking: '3',
      rankingChange: '+2',
      totalProperties: 'Out of all 12',
      reviewScore: '4.8/5',
      parityIssues: 1,
      avgLoss: 75,
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  getRankingChangeColor(change: string): string {
    if (change.startsWith('+')) return 'text-green-500';
    if (change.startsWith('-')) return 'text-red-500';
    return 'text-slate-500';
  }

  getParityStatusText(issues: number): string {
    if (issues === 0) return 'No issues';
    if (issues === 1) return '1 issue';
    return `${issues} issues`;
  }

  getParityStatusColor(issues: number): string {
    if (issues === 0) return 'text-green-500';
    if (issues <= 2) return 'text-yellow-500';
    return 'text-red-500';
  }
} 