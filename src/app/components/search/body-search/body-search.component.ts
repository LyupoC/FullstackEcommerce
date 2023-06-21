import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {SearchComponent} from '../search.component';


@Component({
  selector: 'app-body-search',
  templateUrl: './body-search.component.html',
  styleUrls: ['./body-search.component.css']
})
export class BodySearchComponent extends SearchComponent  implements OnInit {

  constructor(router: Router) {
    super(router);
  }


}
