import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PathResolveService } from './path-resolve.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { paths } from './app-paths';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/notAuth.guard';



const routes: Routes = [
  { path: paths.home, component: HomeComponent },
  { path: paths.login, component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: paths.dashboard, component: DashboardComponent, canActivate: [AuthGuard] },
  { path: paths.register, component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: paths.profile, component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: '**',
    resolve: {
      path: PathResolveService
    },
    component: NotfoundComponent
  }

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule { }


/*

 {
    path: paths.home,
    component: HomeComponent
  },
   imports: [RouterModule.forRoot(routes, { useHash: true })],

*/
