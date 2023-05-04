import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { New } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  API_ENDPOINT = 'https://demo.dotcms.com/api/content/render/false/query/+contentType:Blog/orderby/modDate%20desc';
  private newsSubject = new BehaviorSubject<New[]>([]);
  public news$: Observable<New[]> = this.newsSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  fetchNews(): Observable<New[]> {
    return this.httpClient.get<any>(this.API_ENDPOINT).pipe(
      tap((news: any[]) => {
        this.newsSubject.next(news);
      })
    );
  }
  
}
