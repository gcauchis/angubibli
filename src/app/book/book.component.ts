import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location) { }

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == 0) {
      this.book = new Book();
    }
    else {
      this.bookService.getBook(id)
        .subscribe(book => this.book = book);
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.bookService.updateBook(this.book)
      .subscribe(() => this.goBack());
  }
  
  add(): void {
    this.bookService.addBook(this.book)
      .subscribe((newBook: Book) => this.book = newBook);
  }

}