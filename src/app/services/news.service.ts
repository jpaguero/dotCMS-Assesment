import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import { New } from '../models/news.model';

function getDateRange(year: number): { startDate: string; endDate: string } {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  API_ENDPOINT = 'https://demo.dotcms.com/api/content/render/false/query/+contentType:Blog/orderby/modDate%20desc';
  API_SEARCH_ENDPOINT = 'https://demo.dotcms.com/api/content/_search';

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

  fetchNewsByDate(year: number): Observable<New[]> {
    const dateRange = getDateRange(year);
    const requestBody = {
      query: `+contentType:Blog +(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797 conhost:SYSTEM_HOST) +Blog.postingDate:[${dateRange.startDate} TO ${dateRange.endDate}] +languageId:1 +deleted:false +working:true`,
      sort: 'score,modDate desc',
      limit: 20,
      offset: 0,
    };

    return this.httpClient.post<any>(this.API_SEARCH_ENDPOINT, requestBody).pipe(
      tap((response: any) => {
        const news = response.contentlets;
        this.newsSubject.next(news);
      }),
      shareReplay(1)
    );
  }
}
