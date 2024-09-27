import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKeyword: string = '';



  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    
  }

  doSearch(value: string) {
    if (value.trim() === '') {
      this.clearSearch();

    } else {

      this.searchKeyword = value;
      this.searchService.setKeyword(value); // Store the keyword in the service

    }
    const hasCategoryId = this.route.snapshot.paramMap.has('id');


    if (!hasCategoryId) {
      this.router.navigateByUrl(`/search/${value}`);
    }

  }

  clearSearch() {
    this.searchKeyword = ''; // Clear the input field
    this.searchService.clearKeyword(); // Clear from local storage
  }
}

