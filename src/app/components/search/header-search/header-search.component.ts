import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {SearchComponent} from '../search.component';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent extends SearchComponent  implements OnInit {

  constructor(router:Router) {
    super(router);
  }


}
