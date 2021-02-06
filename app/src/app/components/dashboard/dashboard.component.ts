import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public name;

  constructor(

    private auth: AuthService

  ) {

    this.name = this.auth.getTokenUsername()

  }

  ngOnInit(): void {



  }

}
