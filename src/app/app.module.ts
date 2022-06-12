import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from "@angular/forms";
import { NgxCaptureModule } from 'ngx-capture';
import {PagesComponent} from "./views/pages/pages.component";
import {DetailsComponent} from "./views/details/details.component";

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxCaptureModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
