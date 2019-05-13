import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListBooksComponent } from '../list-books/list-books.component';
import { BookComponent } from '../book/book.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: ListBooksComponent },
  { path: 'book', component: BookComponent },
  { path: 'book/:id', component: BookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }