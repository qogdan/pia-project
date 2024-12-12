import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { DoctorService } from '../services/doctor.service';
import { Pregled } from '../models/pregled';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private service:UserService,private router:Router, private docService:DoctorService) { 
    this.form=new FormGroup({})
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'))
  }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.service.getUser(this.ulogovan.username).subscribe((u:User)=>{
      this.ulogovan = u;
      localStorage.setItem("ulogovan",JSON.stringify(this.ulogovan))
      this.firstname=this.ulogovan.firstname;
      this.lastname=this.ulogovan.lastname;
      this.username=this.ulogovan.username;
      this.password=this.ulogovan.password;
      this.address = this.ulogovan.address
      this.avatar=this.ulogovan.avatar;
      this.email=this.ulogovan.email;
      this.contact=this.ulogovan.contact;
      this.licence= this.ulogovan.licence;
      this.spec = this.ulogovan.spec;
      this.branch = this.ulogovan.branch;
      this.docService.getPreglediSpec(this.spec).subscribe((p:Pregled[])=>{
        if(p){
          this.sviPregledi=p;
          for(let i =0; i<this.sviPregledi.length;i++)
          this.odabraniIndex.push(false)
        }
      })
    })
      this.form = new FormGroup({
        firstname: new FormControl(this.firstname,{nonNullable:true,validators:[Validators.required]}),
        lastname: new FormControl(this.lastname,{nonNullable:true,validators:[Validators.required]}),
        address: new FormControl(this.address,{nonNullable:true,validators:[Validators.required]}),
        phone: new FormControl(this.contact,{nonNullable:true,validators:[Validators.required]}),
        licence: new FormControl(this.licence,{nonNullable:true,validators:[Validators.required]}),
        spec: new FormControl(this.spec,{nonNullable:true,validators:[Validators.required]}),
        email: new FormControl(this.email,{nonNullable:true,validators:[Validators.required]}),
        branch: new FormControl(this.branch,{nonNullable:true,validators:[Validators.required]}),
        image: new FormControl(null),
        myChoices: new FormArray([])
      })
    
  }
  isAuth = false;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
  }
  printname(){
    this.viewmode=!this.viewmode;
    // console.log(this.form.value.firstname)

    // console.log(this.form.value.firstname)
    
  }

  updateDocPregled(){
    for (let i = 0; i < this.sviPregledi.length; i++) {
      if(this.odabraniIndex[i]==true)
        this.odabraniPregledi.push(this.sviPregledi[i].name)
    }
    this.docService.updateDocPregled(this.spec,this.odabraniPregledi,this.username).subscribe(()=>{
      // this.odabraniPregledi=[]
      this.ngOnInit();
    })
  }

  odabraniIndex:boolean[]=[]
  odabraniPregledi:string[]=[]
  
  @ViewChild('filepicker',{static:false})
  myFileInput:ElementRef;
  
  sviPregledi:Pregled[]=[]
  ulogovan:User = null;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  avatar: string;
  address: string;
  email: string;
  contact: string;
  licence:string;
  spec:string;
  branch:string;

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
  removeUserPhoto(){
    this.service.deleteUserPhoto(this.username).subscribe(()=>{

    })
  }
  updateUserData(){
    if(!this.correctImageSizeType){
      alert("Veličina slike mora biti između 100x100 i 300x300 px.")
      return;
    }
    if(this.form.invalid /*|| (!this.correctImageSizeType && this.form.value.image!=null)*/){
      this.form.reset(); 
      // this.myFileInput.nativeElement.value=''
    }
    else {
      this.docService.updateDoctorData(
        this.username,
        this.form.value.firstname,
        this.form.value.lastname,
        this.form.value.address,
        this.email,
        this.form.value.phone,
        this.form.value.licence,
        this.form.value.spec,
        this.branch).subscribe((response)=>{
          
          // this.correctImageSizeType=false;
           this.form.reset(); 
          // this.myFileInput.nativeElement.value=''
          this.ngOnInit();
          this.viewmode=!this.viewmode;

  
        })
    }
  }
}
