import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SourceMarket {
  name: string;
  percent: string;
  width: string;
}

@Component({
  selector: 'app-market-demand-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './market-demand-widget.html',
  styleUrls: ['./market-demand-widget.scss']
})
export class MarketDemandWidgetComponent implements OnInit {

  demandIndex = 70;
  demandChange = '+5%';
  revPAR = '$180';
  revPARChange = '+3.5%';

  sourceMarkets: SourceMarket[] = [
    { name: 'United States', percent: '30%', width: '30%' },
    { name: 'United Kingdom', percent: '20%', width: '20%' },
    { name: 'Germany', percent: '10%', width: '10%' },
    { name: 'France', percent: '5%', width: '5%' },
    { name: 'Canada', percent: '5%', width: '5%' },
  ];

  priceComparisonData = [
    { date: '19 Dec', myPrice: 680, compPrice: 720, difference: -40 },
    { date: '20 Dec', myPrice: 680, compPrice: 730, difference: -50 },
    { date: '21 Dec', myPrice: 680, compPrice: 715, difference: -35 },
    { date: '22 Dec', myPrice: 680, compPrice: 700, difference: -20 },
    { date: '23 Dec', myPrice: 680, compPrice: 695, difference: -15 },
  ];

  ngOnInit(): void {
    // Component initialization
  }

  getChangeColor(change: string): string {
    return change.startsWith('+') ? 'text-green-500' : 'text-red-500';
  }
} 