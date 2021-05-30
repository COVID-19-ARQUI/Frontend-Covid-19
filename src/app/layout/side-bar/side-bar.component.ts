import {Component, Inject, OnInit} from '@angular/core';
import {map, shareReplay, window} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {TokenService} from '../../services/token.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../modules/home/alerts/login/login.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  showFiller = false;
  resultMsg: string;
  Autheticated = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );


  constructor(
    private tokenService: TokenService,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.Autheticated=true;
    }
  }

  loginDialog(){
    const dialog = this.dialog.open(LoginComponent,{
      width: '700px'
    })
    dialog.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.resultMsg = result;
      if (result) {
        console.log('Login successful')
      } else if (result == false) {
        this.loginDialog();
      }
      this.ngOnInit();
    });
  }
  logout(){
    const currentUrl = this.router.url;
    this.tokenService.logOut();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
    this.Autheticated = false;
  }



}
