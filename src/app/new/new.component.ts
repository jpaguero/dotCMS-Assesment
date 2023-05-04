import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';

import { NewsService } from '../services/news.service';
import { New, newDefault } from '../models/news.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {
  news$: Observable<any[]>;
  newsList: any[] = [];
  newItem: New = newDefault;
  subscrs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {
    this.news$ = newsService.news$;
  }

  ngOnInit(): void {
    this.subscrs.push(
      this.newsService.fetchNews().pipe(
        tap((news: any) => {
          this.newsList = news.contentlets;
        }),
        switchMap(() => this.route.params)
      ).subscribe(params => {
        const id = params['id'];
        this.newItem = this.getNewsById(id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscrs.forEach((s) => s.unsubscribe());
  }

  getNewsById(id: string | null) {
    return this.newsList.find((item: any) => item.inode === id);
  }
}
