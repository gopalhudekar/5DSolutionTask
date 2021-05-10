


import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CommonutilsService} from "../services/commonutils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate{

  constructor(
    private router: Router,
    private commonutilsService : CommonutilsService,
    ) { }

async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 

  if(localStorage.getItem('accessToken')){
    this.commonutilsService.accessToken = localStorage.getItem('accessToken');
  } 


  if(localStorage.getItem('user_id')){
    this.commonutilsService.user_id =localStorage.getItem('user_id');
  }


  if (this.commonutilsService.accessToken && this.commonutilsService.user_id) {
      // logged in so return true
      return true;
  }else{
    // this.commonutilsService.showToaster(this.translateService.instant('pls_login_first'))
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
  }
}

}
