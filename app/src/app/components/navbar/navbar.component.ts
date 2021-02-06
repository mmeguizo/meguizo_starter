import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public

  constructor(
    public auth: AuthService,
    private router: Router,
    private toaster: ToastrService

  ) {



  }

  ngOnInit(): void {

  }




  logout() {

    if (confirm('Log out?')) {
      // Save it!
      this.auth.logout();
      this.router.navigateByUrl('/login');
      this.toaster.warning('Logged out', 'LOG OUT')
    } else {
      // Do nothing!
      this.toaster.info('Thanks for Staying')
    }





    // this.router.navigate['login']
  }





}
