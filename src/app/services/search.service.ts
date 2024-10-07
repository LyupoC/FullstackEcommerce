import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private keywordKey: string = 'searchKeyword';
  private keyWord: string = '';

  private keywordSubject = new BehaviorSubject<string>('');
  keyword$ = this.keywordSubject.asObservable();

  setKeyword(keyword: string) {
    this.keyWord = keyword;
    this.keywordSubject.next(keyword);
  }

  clearKeyword() {

    this.keywordSubject.next('');
  }


}
