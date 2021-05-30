import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {userLogin} from '../../../../models/UserLogin';
import {TokenService} from '../../../../services/token.service';
import {MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../models/User';

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
    private fromBuilder: FormBuilder,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    public dialog: MatDialogRef<LoginComponent>,
  ) {

  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formsubmit();

  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        const user: userLogin = {
          username: username,
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
        this.tokenService.setUserId(data.idUser);
        this.tokenService.setUserName(data.username);
        this.tokenService.setAuthorities(data.role);

        this.tokenService.getAuthorities().forEach((rol) => {
          const currentUrl = this.router.url;
          if (rol == 'admin') {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          } else if (rol == 'user') {
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
        alert("Usuario y contraseña no coinciden")
        this.isLoginFail = true;
    });
  }

  onSignUp() {
    this.saveUser();
  }
  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      // console.log(controlName, matchingControlName)
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  saveUser(): void {
    if (this.signup.valid) {
      const client = this.signup.value;
      const key = 'confirmPassword';
      delete client[key];
      this.createUser(client);
    } else {
      console.log('Algo salio mal');
    }
  }
  createUser(newUser: User): void {
    this.authService.createUser(newUser).subscribe((user) => {
      console.log(user);
      this.dialog.close(false);
    });
  }

  formsubmit(){
    this.signup = this.fromBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        surname: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.maxLength(50),
            Validators.minLength(6),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(6),
          ],
        ],
        role: [2, [Validators.required]],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      {
        validator: this.confirmPasswordMatch('password', 'confirmPassword'),
      }
    );
  }
}
