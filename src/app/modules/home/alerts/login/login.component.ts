import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {userLogin} from '../../../../models/UserLogin';
import {TokenService} from '../../../../services/token.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  signup: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  isLogged = false;
  isLoginFail = false;
  isLinear = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    public dialog: MatDialogRef<LoginComponent>,
  ) {

  }

  ngOnInit(): void{
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.signup = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }
  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        const user : userLogin = {
          email: username,
          password: password
        };
        await this.login(user);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
  async login(user){
    await this.authService.logIn(user).subscribe(data => {
        this.isLogged = true;
        this.isLoginFail = false;

        console.log(data);

        this.tokenService.setToken(data.access_token);
        this.tokenService.setUserId(data.userId);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.role);

        this.tokenService.getAuthorities().forEach((rol) => {
          const currentUrl = this.router.url;
          if (rol == 'ROLE_ADMIN') {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          } else if (rol == 'ROLE_USER') {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          }
        });

        this.dialog.close(true);
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
    });
  }

  onSignUp() {

  }
}
