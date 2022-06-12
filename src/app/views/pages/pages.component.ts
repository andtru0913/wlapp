import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  data = getDataFromLocal();
}

function getDataFromLocal() {
  // @ts-ignore
  let result = JSON.parse(sessionStorage.getItem('pages'));
  console.log(sessionStorage.getItem('pages'));
  if (result === null) {
    return [];
  } else {
    return result;
  }
}

