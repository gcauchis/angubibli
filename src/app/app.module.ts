import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryBookService } from './in-memory-book.service';

import { MaterialModule } from './material-module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookService } from './book.service';
import { MessagesService } from './messages.service';

import { AppComponent } from './app.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { BookComponent } from './book/book.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { BookSearchComponent } from './book-search/book-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryBookService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    ListBooksComponent,
    BookComponent,
    MessagesComponent,
    BookSearchComponent],
  bootstrap: [
    AppComponent
  ],
  providers: [
    BookService,
    InMemoryBookService,
    MessagesService
  ]
})
export class AppModule { }
