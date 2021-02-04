import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PathResolveService } from './path-resolve.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { paths } from './app-paths';


const routes: Routes = [
  { path: paths.home, component: HomeComponent },
  { path: paths.dashboard, component: DashboardComponent },
  { path: paths.register, component: RegisterComponent },
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
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

*/
