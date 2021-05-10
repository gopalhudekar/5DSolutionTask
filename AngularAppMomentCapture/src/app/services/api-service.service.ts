import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  public apiPath : string = "http://localhost:3000/v1/"

  constructor(
    public http: HttpClient,
  ) { }

  createAuthHeaderWithToken() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set("apikey", "gopalV-1234");
    headers.set('Authorization', localStorage.getItem("accessToken"));
    //  let options = new RequestOptions({ headers: headers });
    return headers;
  }
  //End 

  //Header's code 
  createAuthHeader() {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set("apikey", "gopalV-1234");
    //  let options = new RequestOptions({ headers: headers });
    return headers;
  }

  register(data) {
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "apikey": "gopalV-1234",
       
      })
    }
    const headersOption = this.createAuthHeader(); 
    let body = JSON.stringify(data)
    return this.http.post(this.apiPath + "user/register", body ,  httpHeader);
  }
  
  login(data) {
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "apikey" : "gopalV-1234",       
      })
    }   
    let body = JSON.stringify(data)
    return this.http.post(this.apiPath + "user/login", body, httpHeader);
  }

  logout() {
    console.log("accessToken" , localStorage.getItem("accessToken"))
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "apikey" : "gopalV-1234",   
        "authorization" : localStorage.getItem("accessToken")    
      })
    }   
    
    return this.http.get(this.apiPath + "user/logout", httpHeader);
  }

  getUserByEmail(data) {
    console.log("accessToken" , localStorage.getItem("accessToken"))
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "apikey" : "gopalV-1234",   
        "authorization" : localStorage.getItem("accessToken")    
      })
    }   
    let body = JSON.stringify(data)
    return this.http.post(this.apiPath + "user/getUserByEmail", body, httpHeader);
  }

  getUserById(data) {
    console.log("accessToken" , localStorage.getItem("accessToken"))
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "apikey" : "gopalV-1234",   
        "authorization" : localStorage.getItem("accessToken")    
      })
    }   
    let body = JSON.stringify(data)
    return this.http.post(this.apiPath + "user/getUserById", body, httpHeader);
  }

  saveMoment(data) {
    console.log("accessToken" , localStorage.getItem("accessToken"))
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "apikey" : "gopalV-1234",   
        "authorization" : localStorage.getItem("accessToken")    
      })
    }   
    let body = JSON.stringify(data)
    return this.http.post(this.apiPath + "moment/save", body, httpHeader);
  }

  getMomentList(data) {
    console.log("accessToken" , localStorage.getItem("accessToken"))
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "apikey" : "gopalV-1234",   
        "authorization" : localStorage.getItem("accessToken")    
      })
    }   
    let body = JSON.stringify(data)
    return this.http.post(this.apiPath + "moment/list", body, httpHeader);
  }

  uploadImage(file) {
    console.log("accessToken" , localStorage.getItem("accessToken"))
    let httpHeader = {
      headers: new HttpHeaders({
     
        "apikey" : "gopalV-1234",   
        "authorization" : localStorage.getItem("accessToken")    
      })
    }   
    const formData = new FormData();
    formData.append('file',file);
console.log("Form Data:", formData)
    return this.http.post(this.apiPath + "/moment/upload", formData, httpHeader);
  }


}
