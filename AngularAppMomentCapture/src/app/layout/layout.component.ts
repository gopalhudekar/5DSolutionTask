import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiServiceService } from '../services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router,  NavigationExtras} from '@angular/router';
import {CommonutilsService} from "../services/commonutils.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(  public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public apiService : ApiServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private commonutilsService : CommonutilsService,
    ) { 

    }

  ngOnInit(): void {
  }

  logout(){
    
    this.spinner.show()
    this.apiService.logout().subscribe((res:any)=>{
      this.spinner.hide();
      if(res.code== 200){
        
        this.toastr.success("Logout Successfully");
        this.commonutilsService.accessToken='';
        this.commonutilsService.user_id ='';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user_id');
        this.router.navigateByUrl("/login")
      }
    },err=>{
      this.spinner.hide();
      this.toastr.error("ERRR");
    })
  }


}
