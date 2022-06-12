import { Component } from '@angular/core';
import {WebLogger} from "../../bat";



@Component({
  selector: 'index',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class IndexComponent {


  /* Funktioner på existerande app */


  submit() {
    let pages = (<HTMLInputElement>document.getElementById("json")).value;
    sessionStorage.setItem('pages', pages);
    window.location.href = "/pages"
  }
}


