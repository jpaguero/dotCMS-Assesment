import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {
  news: any;
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.news = this.newsService.getNewsById(id.toString());
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
