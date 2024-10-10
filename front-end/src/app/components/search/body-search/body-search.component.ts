import { Component, OnInit } from '@angular/core';

import {SearchComponent} from '../search.component';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-body-search',
  templateUrl: './body-search.component.html',
  styleUrls: ['./body-search.component.css']
})
export class BodySearchComponent extends SearchComponent implements OnInit {


  constructor(searchService: SearchService, route: ActivatedRoute, router: Router) {
    super(searchService, route, router);
  }


}
