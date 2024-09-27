import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';

import { SearchComponent } from '../search.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent extends SearchComponent implements OnInit {

  


  constructor(searchService: SearchService, route: ActivatedRoute, router: Router) {
    super(searchService, route, router);
  }

  toggleSearch() {


  }

}
