import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news: any[] = [
    {
      id: '1',
      title: 'Nueva actualización de Angular',
      image: 'https://www.angular.io/assets/images/logos/angular/angular.png',
      date: '2023-04-30',
      content: 'Angular es un framework muy popular para la creación de aplicaciones web. La última actualización, Angular 15, trae numerosas mejoras y nuevas características que facilitan la creación de aplicaciones modernas y escalables.'
    },
    {
      id: '2',
      title: 'Cómo mejorar el rendimiento de Angular',
      image: 'https://www.angular.io/assets/images/logos/angular/angular.png',
      date: '2023-04-25',
      content: 'El rendimiento es una de las preocupaciones más importantes al desarrollar aplicaciones web. En este artículo, te mostramos algunas técnicas y trucos para mejorar el rendimiento de tus aplicaciones Angular.'
    },
    {
      id: '3',
      title: 'Angular vs React: ¿cuál elegir?',
      image: 'https://www.angular.io/assets/images/logos/angular/angular.png',
      date: '2023-04-20',
      content: 'Angular y React son dos de los frameworks más populares para la creación de aplicaciones web. En este artículo, comparamos ambos frameworks y te ayudamos a decidir cuál es el mejor para tu proyecto.'
    }
  ];

  constructor() { }

  getAllNews() {
    return this.news;
  }

  getNewsById(id: string | null) {
    return this.news.find(item => item.id === id);
  }

  getNewsList() {
    return this.news.map(item => {
      return {
        id: item.id,
        title: item.title,
        image: item.image,
        date: item.date
      }
    });
  }
}
