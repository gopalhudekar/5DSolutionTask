import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router,  NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    public user : any = {
      firstName :'',
      lastName :'',
      mobileNo :'',
      email:'',
      password:'',
      city:''
    }

  constructor(
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public apiService : ApiServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.spinner.show();
    // this.toastr.error("Alert","Demoerrrr");
  }

  onRegister(){
    console.log("user/register :" + JSON.stringify(this.user))
    this.spinner.show();
    this.apiService.register(this.user).subscribe((res:any)=>{
      console.log("register response : ", res)
      if(res.code==200){
        this.toastr.success(res.message, "Success")
        this.router.navigateByUrl("/login")
      }else{
        this.toastr.error(res.message);
      }
      this.spinner.hide()
    },err=>{
      this.spinner.hide()
      console.log("register err : ", err)
    })
  }
}