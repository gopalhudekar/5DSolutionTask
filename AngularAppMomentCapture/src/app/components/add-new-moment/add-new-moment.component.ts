import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router,  NavigationExtras} from '@angular/router';
import {CommonutilsService} from "../../services/commonutils.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-new-moment',
  templateUrl: './add-new-moment.component.html',
  styleUrls: ['./add-new-moment.component.css']
})
export class AddNewMomentComponent implements OnInit {
  
  
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
    title:string;
    tag:string ;
    docUrl:any;
    docFile:any;
    selectedFile: ImageSnippet;
    isReadyToUpload : boolean = false;
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

  saveMoment(){
    if(this.isReadyToUpload){
      this.spinner.show()
      this.startUpload().then(url=>{
        let data ={
          image : url,
          title : this.title,
          tag : this.tag,
          user_id : localStorage.getItem("user_id")
        }
        this.apiService.saveMoment(data).subscribe((res:any)=>{
          this.spinner.hide();
          console.log("image res", res)
          if(res.code){
            this.toastr.success("Moment Saved Successfuly")
            this.router.navigateByUrl("/momentlist")
          }else{
            this.toastr.error(res.message)
          }
        },err=>{
          this.spinner.hide();
          // this.toastr.error(res.message)
          console.log("err =", err)
        })
      }).catch(err=>{
        this.spinner.hide();
        this.toastr.error("Error while uploading image")
      })
  
  }else{
    this.toastr.show("Please upload image ")
  }
  }

  async startUpload() {
    return new Promise(async (resolve, reject) => {
      this.apiService.uploadImage(this.docFile).subscribe((res:any)=>{
        if(res.code==200) {      
          resolve(res.fileUrl);
        } else {
          reject("Failed");
        }
      },err=>{
        reject("Failed");        
      })   
    });
  }

  onFileChoose(event) {
    console.log("event :", event);
        console.log("file: ",  (event.target as HTMLInputElement).files[0])
      const file = (event.target as HTMLInputElement).files[0];
      const pattern = /image-*/;
      const reader = new FileReader();       
      if (!file.type.match(pattern)) {
        console.log('File format not supported');
        return;
      }
  
      reader.onload = () => {
        this.docUrl =(reader.result.toString());
        reader.result.toString();
      };
      reader.readAsDataURL(file);
      // console.log("Selected Doc Type:", this.selectedDocType)
 
      this.docFile=file;
      console.log("====== this.photoFile======",this.docFile);
     if(file){    
      this.isReadyToUpload = true;
     }
  }
}
