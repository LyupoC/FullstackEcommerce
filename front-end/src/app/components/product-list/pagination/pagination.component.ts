import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,OnChanges {


  @Input() totalElements:number =1;
  @Input() page:number =1;
  @Input() pageSize:number = 10;
  @Output() pageChange:EventEmitter<number> =new EventEmitter();

  pages: number[] =[];
  activePage: number = this.page;
  totalPages = 0;
  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    this.activePage = this.page;
    this.pages=[];
    
    this.totalPages= Math.ceil(this.totalElements/this.pageSize);

    for(var i = this.page -1; i <= Math.min(this.totalPages, this.page +1); i++ ){

      this.pages.push(i);

    }

  }

  ngOnInit(): void {

  }

  increment(): void{
        if(this.page >= this.totalPages){
             return;
        }

      this.pageChange.emit(this.page +1);
  }


  decrement(): void{

    if(this.page === 1){
      return;
    }
     this.pageChange.emit(this.page - 1);
  }


  chagePage(page:number):void {
    this.pageChange.emit(page);

  }



}
