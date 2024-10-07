import { Component, OnInit, HostListener } from '@angular/core';
import { SearchService } from '../../../services/search.service';

import { SearchComponent } from '../search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css'],

})
export class HeaderSearchComponent extends SearchComponent implements OnInit {

  isSearchVisible = false;
  searchTerm: string = '';
  isMobileView = false;

  constructor(searchService: SearchService, route: ActivatedRoute, router: Router) {
    super(searchService, route, router);
  }

  toggleSearch() {

    const screenWidth = window.innerWidth;
    this.isMobileView = screenWidth < 990; // Adjust the breakpoint as needed

    console.log(screenWidth);

    // Toggle the search visibility
    if (!this.isMobileView) {
      this.isSearchVisible = !this.isSearchVisible; // Only toggle if not in mobile view
    } else {
      this.isSearchVisible = false; // Always show in mobile view
    }
  }

}
