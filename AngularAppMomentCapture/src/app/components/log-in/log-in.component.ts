import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router,  NavigationExtras} from '@angular/router';
import {CommonutilsService} from "../../services/commonutils.service";
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

    email : string ;
    password :string;
  constructor(
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public apiService : ApiServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private commonutilsService : CommonutilsService,
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    let data ={
      email : this.email,
      password : this.password
    }
    
    console.log("user/login : "+ JSON.stringify(data));
    this.spinner.show()

    this.apiService.login(data).subscribe((res:any)=>{
      this.spinner.hide();
      console.log("res login: " + JSON.stringify(res))
      if(res.code== 200){
        localStorage.setItem("accessToken", res.accessToken)
        localStorage.setItem("user_id",  res.user._id);
        this.commonutilsService.accessToken = res.accessToken;
        this.commonutilsService.user_id = res.user._id;
        this.toastr.success("Sing in Successfuly", "Success");
        this.router.navigateByUrl("/")
        
      }else{
        this.toastr.error(res.message, "Error");
      }
    },err=>{
      console.log("err", err);
      this.toastr.error("Api Error occured", "Error");
      this.spinner.hide();
    })
  }

}
