import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {UserInformation} from '../../../../models/UserInformation';
import {UserService} from '../../../../services/user.service';
import {TokenService} from '../../../../services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: UserInformation;
  constructor(private userService: UserService,private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getuserinfo(this.tokenService.getUserId());
  }
  getuserinfo(user){
    this.userService.getuserbyId(user).subscribe(value => {
      this.profile=value;
    });
  }

}
