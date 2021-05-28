import {Component, Inject, OnInit} from '@angular/core';
import {map, shareReplay, window} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  showFiller = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );


  constructor(
    @Inject(DOCUMENT) public document: Document,
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
  }
  loginWithRedirect():void{
    this.auth.loginWithRedirect();
  }
  logout():void{
    this.auth.logout({returnTo: document.location.origin})
  }


}
