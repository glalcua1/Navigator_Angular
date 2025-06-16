import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardService, FilterState } from '../../services/dashboard';
import { filter } from 'rxjs/operators';

interface NavItem {
  name: string;
  route: string;
  dropdown?: boolean;
  items?: { name: string; route: string }[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  selectedHotel = 'Dubai Hotel - 5 Star';
  hotelSearch = '';
  activeTab = 'Overview';
  isHotelDropdownOpen = false;
  
  navItems: NavItem[] = [
    { name: 'Overview', route: '/' },
    {
      name: 'Rate Trend',
      route: '#',
      dropdown: true,
      items: [
        { name: 'Rate Trend', route: '/rate-trend' },
        { name: 'Rate Evolution', route: '#' },
        { name: 'OTA Rank', route: '#' },
        { name: 'Reviews', route: '#' },
        { name: 'Parity', route: '#' },
        { name: 'Demand', route: '/demand' },
        { name: 'Events', route: '#' },
      ],
    },
  ];

  hotelOptions = [
    'Dubai Hotel - 5 Star',
    'New York Grand - 4 Star',
    'London Boutique - 3 Star',
    'Vakkaru Maldives - 30 percent off on seaplane transfers',
    'Four Seasons Resort Maldives at Landaa Giraavaru',
    'One&Only Reethi Rah',
    'Six Senses Laamu',
    'Soneva Fushi',
    'Anantara Kihavah Maldives Villas',
    'The St. Regis Maldives Vommuli Resort',
    'Conrad Maldives Rangali Island',
    'Waldorf Astoria Maldives Ithaafushi',
  ];

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    // Set initial active tab based on current route
    this.setActiveTab();
    
    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveTab();
      });

    // Subscribe to filter changes
    this.dashboardService.filters$.subscribe((filters: FilterState) => {
      this.selectedHotel = filters.selectedHotel;
    });
  }

  private setActiveTab(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/') {
      this.activeTab = 'Overview';
    } else if (currentRoute.startsWith('/rate-trend') || currentRoute.startsWith('/demand')) {
      this.activeTab = 'Rate Trend';
    } else {
      this.activeTab = 'Overview';
    }
  }

  get filteredHotels(): string[] {
    return this.hotelOptions.filter(hotel => 
      hotel.toLowerCase().includes(this.hotelSearch.toLowerCase())
    );
  }

  selectHotel(hotel: string): void {
    this.selectedHotel = hotel;
    this.hotelSearch = '';
    this.isHotelDropdownOpen = false;
    
    // Update filters in service
    this.dashboardService.updateFilters({ selectedHotel: hotel });
  }

  navigate(route: string): void {
    if (route !== '#') {
      this.router.navigate([route]);
    }
  }

  toggleHotelDropdown(): void {
    this.isHotelDropdownOpen = !this.isHotelDropdownOpen;
  }

  closeHotelDropdown(): void {
    this.isHotelDropdownOpen = false;
    this.hotelSearch = '';
  }
}
