import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private service:UserService,private router:Router) { 
    this.form=new FormGroup({})
    this.ulogovanS = JSON.parse(localStorage.getItem('ulogovan'))
  }
  isAuth = false;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
  }
  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true';
    this.service.getUser(this.ulogovanS.username).subscribe((u:User)=>{
      this.ulogovan=u;
      this.firstname=this.ulogovan.firstname;
      this.lastname=this.ulogovan.lastname;
      this.username=this.ulogovan.username;
      this.password=this.ulogovan.password;
      this.address = this.ulogovan.address
      this.avatar=this.ulogovan.avatar;
      this.email=this.ulogovan.email;
      this.contact=this.ulogovan.contact;
      this.form = new FormGroup({
        firstname: new FormControl(this.firstname,{nonNullable:true,validators:[Validators.required]}),
        lastname: new FormControl(this.lastname,{nonNullable:true,validators:[Validators.required]}),
        address: new FormControl(this.address,{nonNullable:true,validators:[Validators.required]}),
        phone: new FormControl(this.contact,{nonNullable:true,validators:[Validators.required]}),
        email: new FormControl(this.email,{nonNullable:true,validators:[Validators.required]}),
        image: new FormControl(null)
      })
    })
  }
  printname(){
    this.viewmode=!this.viewmode;
    // console.log(this.form.value.firstname)

    // console.log(this.form.value.firstname)
    
  }
  
  @ViewChild('filepicker',{static:false})
  myFileInput:ElementRef;
  
  ulogovanS:User = null;
  ulogovan:User = null;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  avatar: string;
  address: string;
  email: string;
  contact: string;

  form:FormGroup;
  viewmode = true;
  correctImageSizeType:boolean=false;
  PickedImage(event:Event){

    const file = (event.target as HTMLInputElement).files[0];
    if(file.type=='image/png' || file.type=='image/jpeg'){
      var img = new Image();
      var objUrl= window.URL.createObjectURL(file);
      img.onload =()=>{
        if(img.width>=100&&img.width<=300
          &&img.height>=100&&img.height<=300)
            this.correctImageSizeType = true;
        window.URL.revokeObjectURL(objUrl)
      };
      
      img.src = objUrl;
      
      this.form.patchValue({image:file});
      this.form.get('image').updateValueAndValidity();
    }else{
      this.correctImageSizeType=false;
    }

  }
  removeUserPhoto(){
    this.service.deleteUserPhoto(this.username).subscribe(()=>{

    })
  }
  updateUserPhoto(){
    if(!this.correctImageSizeType){
      alert("Veličina slike mora biti između 100x100 i 300x300 px.")
      return;
    }
    this.service.updateUserPhoto(
    this.username,this.form.value.image
    ).subscribe((response)=>{
      
      this.form.reset(); 
      this.ngOnInit();
      this.myFileInput.nativeElement.value=''
    })
  }

  updateUserData(){
    if(this.form.invalid /*|| (!this.correctImageSizeType && this.form.value.image!=null)*/){
      this.form.reset(); 
      // this.myFileInput.nativeElement.value=''
    }
    else {
      this.service.updateUserData(
        this.username,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.address,
        this.form.value.phone,
        this.form.value.email).subscribe((response)=>{
         
          // this.correctImageSizeType=false;
           this.form.reset(); 
          // this.myFileInput.nativeElement.value=''
          this.ngOnInit();
          this.viewmode=!this.viewmode;
        })
    }
  }
}
