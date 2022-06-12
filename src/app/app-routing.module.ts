import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BrowserModule} from "@angular/platform-browser";
import {DetailsComponent} from "./views/details/details.component";
import {PagesComponent} from "./views/pages/pages.component";
import {IndexComponent} from "./views/index";

const routes: Routes = [];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot([
    { path: 'index', component: IndexComponent },
    { path: 'pages', component: PagesComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: '**', redirectTo: 'index' }

  ])
],
  exports: [
    RouterModule,
    BrowserModule
  ]
})
export class AppRoutingModule { }
