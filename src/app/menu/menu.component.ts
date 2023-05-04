import { Component, OnDestroy, OnInit } from '@angular/core';

import { NewsService } from '../services/news.service';
import { Subscription, tap } from 'rxjs';
import { New } from '../models/news.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy{

  newsList: New[] = [];
  subscrs: Subscription[] = [];

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsService.fetchNews().subscribe();

    this.subscrs = [
      this.newsService.news$.pipe(
        tap((news: any) => {
          this.newsList = news.contentlets;
        })
      ).subscribe(),

      this.newsService.fetchNewsByDate(2020).pipe(
        tap((news: any) => {
          this.newsList = news.entity.jsonObjectView.contentlets;
        })
      ).subscribe()
    ]
  }

  ngOnDestroy(): void {
    this.subscrs.forEach((s) => s.unsubscribe());
  }

}
