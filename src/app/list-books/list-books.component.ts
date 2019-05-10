import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Book } from '../Book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'author', 'release', 'delete'];
  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks()
      .subscribe(b => this.setBooks(b));
  }

  setBooks(books: Book[]) {
    this.dataSource = new MatTableDataSource<Book>(books);
    this.dataSource.paginator = this.paginator;
  }
  
  delete(book: Book): void {
    this.bookService.deleteBook(book)
      .subscribe(_ => this.getBooks());
  }

}