import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public username;
  public email;

  constructor(
    private auth: AuthService,
    // public jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {



    this.auth.getProfile().subscribe((profile: any) => {



      this.username = profile.data.username
      this.email = profile.data.email

    })

  }

}

