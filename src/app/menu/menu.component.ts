import { Component } from '@angular/core';

import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  newsList: any[] = [];

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    //this.newsList = this.newsService.getNewsList();
  }

}
