import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router,  NavigationExtras} from '@angular/router';
import {CommonutilsService} from "../../services/commonutils.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.css']
})
export class MomentListComponent implements OnInit {
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  displayedColumns: string[] = [ 'image','title', 'tag', 'action'];
  dataSource = new MatTableDataSource<any>([ ]);
  public momentList : any =[];
  constructor(
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public apiService : ApiServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private commonutilsService : CommonutilsService,
  ) { }

  ngOnInit(): void {
    // this.getUser();
    this.getMomentList();
  }

getUser(){
  let data ={
    user_id : localStorage.getItem("user_id")
  }
  // this.spinner.show();
  console.log("getUserById data ", data);
  this.apiService.getUserById(data).subscribe((res:any)=>{
    console.log("getUserById res ", res);
    // this.spinner.hide();
  },err=>{
    // this.spinner.hide();
    console.log("getUserById err ", err);
  })
}

getMomentList(){
  let data ={
    user_id : localStorage.getItem("user_id")
  }
  this.spinner.show();
  console.log("getUserById data ", data);
  this.apiService.getMomentList(data).subscribe((res:any)=>{
    console.log("getUserById res ", res);
    this.spinner.hide();
    if(res.code==200){
      this.momentList = res.list;
      console.log("  this.momentList : " + JSON.stringify(this.momentList))
    let data : any =[];
    res.list.forEach(element => {
      let  item =element;
      item.action=''
      data.push(item)
    });
    
    this.dataSource = new MatTableDataSource( data);  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = [ 'image','title', 'tag', 'action'];
  }
  },err=>{
    this.spinner.hide();
    console.log("getUserById err ", err);
  })

}



}
