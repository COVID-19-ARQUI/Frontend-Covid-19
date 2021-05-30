import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsBingService {

  constructor(private http: Http) { }

  doSearch() {
    /***/
    let subscriptionKey = '27041e3e-e454-4336-8e74-6c8f8886b5cc';
    let customConfigId = 'f37a70d3b5924b3aacc1d23b9cc25755';
    let searchTerm = 'microsoft';

    let headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', subscriptionKey);
    let opts = new RequestOptions();
    opts.headers = headers;

    // here your url

    let url = 'https://api.bing.microsoft.com/v7.0/news/search?' +
     'q=' + searchTerm +'&mkt=en-US&SafeSearch=strict&count=25&offset=0'+
     '&customconfig=' + customConfigId;

    //let url = 'https://api.bing.microsoft.com/v7.0/news/search?q=COVID%2019&mkt=en-US&SafeSearch=strict&count=25&offset=0';


    this.http.get(url, opts).subscribe(
      res => console.log('handle your response',res.json()),
      //msg => console.error(Error: ${msg.status} ${msg.statusText})
    );


  }
}
