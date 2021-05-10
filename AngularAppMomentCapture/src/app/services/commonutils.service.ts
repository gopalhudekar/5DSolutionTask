import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonutilsService {
  public alert :any;
  public loading : any;
  public name : string;
  public email :string;
  public user_detail : any={
    name : '',
    email :'',
    restaurant_name:'',
    streetAddress:'',
    phone:''
  }
  public user_id : string;
  public accessToken : string;
  public lang :string ='deu';
  public notificationCount : number =0;
  public cleverpush_id :string ='';
  constructor(

  ) { }

}
