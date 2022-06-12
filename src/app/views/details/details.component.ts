import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute, Params} from "@angular/router";
import {window} from "rxjs";


@Component({
  selector: 'app-pages',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  //Behöver tilldelas till en JSON-fil
  data = getData();

  pageinfo: any;
  id: number | undefined;


  constructor(private route: ActivatedRoute) {}
  // @ts-ignore
  ngOnInit() {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    // @ts-ignore
    this.pageinfo = this.data[this.id];
  }





  sliderEvent() {
    // @ts-ignore
    let value = (<HTMLInputElement>document.getElementById('slider')).value;
    let eventElement = document.getElementById('event' + value);
    let timeElement = document.getElementById('time' + value);
    let previewElement = document.getElementById('preview' + value);
    if (eventElement != null && timeElement != null && previewElement != null) {
      for (let i = 0; i < this.pageinfo.actions.length; i++) {
        let otherEventElements = document.getElementById('event' + i);
        let otherTimeElements = document.getElementById('time' + i);
        let otherPreviewElements = document.getElementById('preview' + i);
        if (otherEventElements != null && otherTimeElements != null && otherPreviewElements != null) {
          otherEventElements.classList.add('hide');
          otherTimeElements.classList.add('hide');
          otherPreviewElements.classList.add('hide');
        }
      }
      eventElement.classList.remove('hide');
      timeElement.classList.remove('hide');
      previewElement.classList.remove('hide');
    }
  }


  nextPage() {h
   // @ts-ignore
    location.href = "details/" +(this.id+1).toString();
  }

  prevPage() {
    // @ts-ignore
    location.href = "details/" +(this.id-1).toString();
  }

  nextAction() {
    let slider = (<HTMLInputElement>document.getElementById('slider'));
    slider.value =  (parseInt(slider.value) + 1).toString();
    this.sliderEvent();
  }

  prevAction() {
    let slider = (<HTMLInputElement>document.getElementById('slider'));
    slider.value =  (parseInt(slider.value) - 1).toString();
    this.sliderEvent();
  }
}



function getData() {
  // @ts-ignore
  let result = JSON.parse(sessionStorage.getItem('pages') || [] );
    return result;
}

