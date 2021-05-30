import { Component, OnInit } from '@angular/core';
import {NewsBingService} from "../../../../services/news-bing.service";


@Component({
  selector: 'app-noticias-bing',
  templateUrl: './noticias-bing.component.html',
  styleUrls: ['./noticias-bing.component.css']
})
export class NoticiasBingComponent implements OnInit {


  API_KEY_COOKIE: string = "f37a70d3b5924b3aacc1d23b9cc25755";
  CLIENT_ID_COOKIE: string  = "27041e3e-e454-4336-8e74-6c8f8886b5cc";
  BING_ENDPOINT: string  = "https://api.bing.microsoft.com/v7.0/news";
  constructor(private newsBingService: NewsBingService) { }

  ngOnInit(): void {
    this.newsBingService.doSearch();
  }

  getData(){

  }




}
