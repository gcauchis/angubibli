import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../book.service';

import { MessagesService } from '../messages.service';

import { jsPDF } from "jspdf";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {

  @ViewChild('htmlBook') htmlBook:ElementRef;

  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private messagesService: MessagesService) { }

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

  public openPDF():void {
    this.log('openPDF')
    let DATA = this.htmlBook.nativeElement;
    let doc = new jsPDF();
  
    doc.html(DATA.innerHTML, {
      callback: function (doc) {
        doc.save();
      }
    });
    doc.output('dataurlnewwindow');
  }

  public downloadPDF():void {
    this.log('downloadPDF')
    let DATA = this.htmlBook.nativeElement;
    let doc = new jsPDF();

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }

  private log(message: string) {
    this.messagesService.add(`BookComponent: ${message}`);
  }
}