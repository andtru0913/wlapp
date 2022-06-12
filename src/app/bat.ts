import {Directive, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import * as moment from "moment";
import {NgxCaptureService} from "ngx-capture";
import {tap} from "rxjs";

// @ts-ignore
@Directive
export class WebLogger implements OnInit {
  constructor(private captureService:NgxCaptureService) {
  }
  takePicture() {
    this.captureService.getImage(document.body, true)
      .pipe(
        tap(img => {
          // @ts-ignore
          let images = JSON.parse(sessionStorage.getItem('images'));
          images.push(img)
          sessionStorage.setItem('images' , JSON.stringify(images));
        })
      ).subscribe();
  }

  initStorage() {
    sessionStorage.setItem('previousPage' , window.location.toString());
    sessionStorage.setItem('lastIn', Date.now().toString());
    sessionStorage.setItem('pages', JSON.stringify([]));
    sessionStorage.setItem('images', JSON.stringify([]));
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('previousPage') === null) {
      this.initStorage();
    }
    let previousPage = sessionStorage.getItem('previousPage');
    // @ts-ignore
    let pages = JSON.parse(sessionStorage.getItem('pages'));
    let lastIn = parseInt(sessionStorage.getItem('lastIn') || '0');
    let previousActions: [] = JSON.parse(sessionStorage.getItem('currentActions') || '');
    let previousImages: [] = JSON.parse(sessionStorage.getItem('images') || '');
      let pageInfo = {
        pageUrl : previousPage,
        timeSpent : moment.utc(Date.now() - lastIn).format('H:mm:ss'),
        actions : previousActions,
        images : previousImages,
      } as PageInfo
      pages.push(pageInfo);
      sessionStorage.setItem('pages',JSON.stringify(pages));
      sessionStorage.setItem('lastIn', Date.now().toString());
      sessionStorage.setItem('previousPage', window.location.toString());
      sessionStorage.setItem('currentActions', JSON.stringify([]));
      sessionStorage.setItem('images', JSON.stringify([]));
  }

  onMouseHandler(event: MouseEvent) {
    // @ts-ignore
    let lastIn = parseInt(sessionStorage.getItem('lastIn')||Data.now());
    // @ts-ignore
    let currentActions = JSON.parse(sessionStorage.getItem('currentActions')) || [];
    let clickEvent = {type: 'ClickEvent', xPos : event.x, yPos : event.y, time :
        moment.utc(Date.now() - lastIn).format('H:mm:ss')} as ClickEvent
    currentActions.push(clickEvent);
    sessionStorage.setItem('currentActions',JSON.stringify(currentActions));
    this.takePicture();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.key === "F2") {
      this.ngOnInit();
      let pages = sessionStorage.getItem('pages');
      console.log(pages);
    }
    // @ts-ignore
    let lastIn = parseInt(sessionStorage.getItem('lastIn')) || Date.now();
    // @ts-ignore
    let currentActions = JSON.parse(sessionStorage.getItem('currentActions')) || [];
    let keyEvent = {type: 'KeyEvent', key : event.key, time : moment.utc(Date.now() - lastIn).format
      ('H:mm:ss'), ctrl : event.ctrlKey, alt: event.altKey, shift : event.shiftKey} as KeyEvent
    currentActions.push(keyEvent);
    sessionStorage.setItem('currentActions',JSON.stringify(currentActions));
    this.takePicture();
  }


}

export interface PageInfo {
  pageUrl : string;
  timeSpent : string;
  actions : [];
  images : [];
}

export interface ClickEvent {
  type : string;
  xPos : number;
  yPos : number;
  time : string;
}

export interface KeyEvent {
  type: string;
  key: string;
  time : string;
  ctrl : boolean;
  alt : boolean;
  shift : boolean;
}
