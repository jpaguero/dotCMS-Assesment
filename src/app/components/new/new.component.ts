import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

import { NewsService } from '../../services/news.service';
import { New, newDefault } from '../../models/news.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms ease-in', style({ opacity: 1 }))
      ]),
    ])
  ]
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
          if(news){
            this.newsList = news.contentlets;
          }
        }),
        switchMap(() => this.route.params)
      ).subscribe(params => {
        let id = null;
        if(params['id']) {
          id = params['id'];
        } else {
          if(this.newsList) {
            id = this.newsList[0].inode;
          }
        } 
        this.newItem = this.getNewsById(id);
        console.log(this.newItem );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscrs.forEach((s) => s.unsubscribe());
  }

  getNewsById(id: string | null) {
    return this.newsList?.find((item: any) => item.inode === id);
  }
}
