import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent} from "./layout/layout.component";
import {NotfoundComponent } from "./components/notfound/notfound.component"
import { AuthGardService} from './services/auth-gard.service';
const routes: Routes = [
  
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: RegisterComponent },
  // { path: '', component: LayoutComponent },
  {
    path: '',
    // pathMatch: 'full',
    component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
    }], canActivate : [AuthGardService]
  },
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  //   RouterModule.forRoot(routes,{
  //     useHash: true
  //  })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
