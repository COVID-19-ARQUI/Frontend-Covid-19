import { Component, OnInit, ViewChild } from '@angular/core';
import {NewsBingService} from "../../../../services/news-bing.service";
import axios from 'axios';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {DragScrollModule} from 'ngx-drag-scroll';
import {DragScrollComponent} from 'ngx-drag-scroll';

@Component({
  selector: 'app-noticias-bing',
  templateUrl: './noticias-bing.component.html',
  styleUrls: ['./noticias-bing.component.css']
})
export class NoticiasBingComponent implements OnInit {
  title = 'app works!';
  hayimagen: Boolean[] = [];
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  imagelist = [
    'luke.png',
    'chubaka.png',
    'boba.png',
    'c3po.png' ,
    'leia.png',
    'obi.png',
    'r2d2.png',
    'storm.png',
    'varder.png',
    'yoda.png',
    'yolo.png'
  ];
  datanews:any;
  leftNavDisabled = false;
  rightNavDisabled = false;
  index = 0;


  @ViewChild('nav', { read: DragScrollComponent, static: true }) ds: DragScrollComponent;
  constructor(private newsBingService: NewsBingService,matIconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {  matIconRegistry
    .addSvgIcon('github',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/github.svg'))
    .registerFontClassAlias('fontawesome', 'fa');}

  ngOnInit(): void {
    this.getData();
    //this.newsBingService.doSearch();
  }
  clickItem(item) {
    console.log('item clicked');
  }

  remove() {
    this.imagelist.pop();
  }

  toggleHideSB() {
    this.hideScrollbar = !this.hideScrollbar;
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(idx: number) {
    this.ds.moveTo(idx);
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  onSnapAnimationFinished() {
    console.log('snap animation finished');
  }

  onIndexChanged(idx) {
    this.index = idx;
    console.log('current index: ' + idx);
  }

  onDragScrollInitialized() {
    console.log('first demo drag scroll has been initialized.');
  }

  onDragStart() {
    console.log('drag start');
  }

  onDragEnd() {
    console.log('drag end');
  }

  getData(){


    let searchTerm = 'Covid-19 bolivia';
    var r;

    axios.get('https://api.bing.microsoft.com/v7.0/news/search?q='+searchTerm, {
      headers: {
        'Ocp-Apim-Subscription-Key': 'd9fb5e0085a246ab880455bef594d06d'
      },
      params: {
        count: 21,
        mkt: 'en-US',
      }
    }).then((response) => {
      r = response.data.value;
      this.datanews=r;
      if(r.image){
        this.hayimagen.push(true);
      }else{
        this.hayimagen.push(false);
      }
      console.log(this.datanews);

      console.log(this.hayimagen);
      //console.log(r);

    }).catch((error) => {
      console.error(error);
    });

  }
}


