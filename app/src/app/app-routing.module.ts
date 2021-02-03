import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PathResolveService } from './path-resolve.service';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '**',
    resolve: {
      path: PathResolveService
    },
    component: NotfoundComponent
  }

  // {
  //   path: '404', component: NotfoundComponent
  // },
  // {
  //   path: '**', redirectTo: '/404'
  // }
  // { path: '**', component: HomeComponent },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule { }
