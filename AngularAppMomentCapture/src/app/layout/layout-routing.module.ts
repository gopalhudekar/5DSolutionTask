import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from '../components/log-in/log-in.component';
import { RegisterComponent } from '../components/register/register.component';
import {MomentListComponent} from "../components/moment-list/moment-list.component";
import {AddNewMomentComponent } from "../components/add-new-moment/add-new-moment.component"
import {LayoutComponent} from "./layout.component"
const routes: Routes = [
    
    {
        path: '',
        // component: LayoutComponent,
        children: [
        { path: 'momentlist', component: MomentListComponent },
        { path: 'add-new-moment', component: AddNewMomentComponent },
        { path: '', component: MomentListComponent },

        { path: '', pathMatch: 'full', redirectTo: '/momentlist' },
        ]
    },
    {
        path: '',
        redirectTo: '/momentlist',
        pathMatch: 'full'
      }
     
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }