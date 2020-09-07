import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Book } from "../book";
import { BookService } from "../book.service";

import { MessagesService } from "../messages.service";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from "html-to-pdfmake";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"]
})
export class BookComponent implements OnInit {
  @ViewChild("htmlBook") htmlBook: ElementRef;

  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.book = new Book();
    } else {
      this.bookService.getBook(id).subscribe(book => (this.book = book));
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.bookService.updateBook(this.book).subscribe(() => this.goBack());
  }

  add(): void {
    this.bookService
      .addBook(this.book)
      .subscribe((newBook: Book) => (this.book = newBook));
  }

  public openPDF(): void {

    console.log(document);
    console.log(document.styleSheets);
    console.log(JSON.stringify(document.styleSheets));
    /*var css = [];
    for (var sheeti = 0; sheeti < document.styleSheets.length; sheeti++) {
      var sheet = document.styleSheets[sheeti];
      console.log(sheet);
      var rules = "cssRules" in sheet ? sheet.cssRules : sheet.rules;
      for (var rulei = 0; rulei < rules.length; rulei++) {
        var rule = rules[rulei];
        if ("cssText" in rule) css.push(rule.cssText);
        else
          css.push(rule.selectorText + " {\n" + rule.style.cssText + "\n}\n");
      }
    }
    this.log(css);*/
    //var styles : CSSStyleDeclaration = getComputedStyle(this.htmlBook.nativeElement);
    var html = htmlToPdfmake(this.htmlBook.nativeElement.innerHTML);
    pdfMake
      .createPdf({
        content: html,
        styles: document.styleSheets
      })
      .open();
  }

  public downloadPDF(): void {
    var html = htmlToPdfmake(this.htmlBook.nativeElement.innerHTML);
    pdfMake
      .createPdf({
        content: html
      })
      .download();
  }

  private log(message: string) {
    this.messagesService.add(`BookComponent: ${message}`);
  }
}
