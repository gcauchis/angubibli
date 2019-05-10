import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Book } from './Book';

@Injectable()
export class InMemoryBookService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const books: Book[] = [
      { id: 11, title: 'Code', author: 'Toto', release: new Date() },
      { id: 12, title: 'OK', author: 'Titi', release: new Date() },
      { id: 13, title: 'Test', author: 'Titi', release: new Date() },
      { id: 14, title: 'Test1', author: 'Titi', release: new Date() },
      { id: 15, title: 'Test2', author: 'Titi', release: new Date() },
      { id: 16, title: 'Test3', author: 'Titi', release: new Date() },
      { id: 17, title: 'Test4', author: 'Titi', release: new Date() },
      { id: 18, title: 'Test5', author: 'Titi', release: new Date() }
    ];
    return { books };
  }

  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }
}