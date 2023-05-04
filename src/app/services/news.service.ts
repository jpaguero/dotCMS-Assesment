import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import { New } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  API_ENDPOINT = 'https://demo.dotcms.com/api/content/render/false/query/+contentType:Blog/orderby/modDate%20desc';
  private newsSubject = new BehaviorSubject<New[]>([]);
  public news$: Observable<New[]> = this.newsSubject.asObservable();

  private newsCache: New[] | null = null;
  private fetchingNews = false;

  constructor(private httpClient: HttpClient) { }

  fetchNews(): Observable<New[]> {
    if (this.newsCache) {
      return of(this.newsCache);
    }

    if (this.fetchingNews) {
      return this.news$;
    }

    this.fetchingNews = true;
    return this.httpClient.get<any>(this.API_ENDPOINT).pipe(
      tap((news: any[]) => {
        this.newsSubject.next(news);
        this.newsCache = news;
        this.fetchingNews = false;
      }),
      shareReplay(1)
    );
  }
}
