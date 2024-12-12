import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { User } from '../models/user';
import { Zahtev } from '../models/zahtev';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((u:Zahtev[])=>{
      if(u){
        for (let i = 0; i < u.length; i++) {
          this.allEmails.push(u[i].user.email)
          this.allUsernames.push(u[i].user.username)
        }
      }
    })
    this.correctImageSizeType=false;
    this.form = new FormGroup({
      username: new FormControl(null,{validators:[Validators.required]}),
      password: new FormControl(null,{validators:[Validators.required]}),
      passwordconf: new FormControl(null,{validators:[Validators.required]}),
      firstname: new FormControl(null,{validators:[Validators.required]}),
      lastname: new FormControl(null,{validators:[Validators.required]}),
      address: new FormControl(null,{validators:[Validators.required]}),
      phone: new FormControl(null,{validators:[Validators.required]}),
      email: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null)
    })
  }

  @ViewChild('filepicker',{static:false})
  myFileInput:ElementRef;
  
  allUsernames:string[]=[]
  allEmails:string[]=[]
  message:string;
  image:File;
  correctImageSizeType:boolean;
  form:FormGroup;
  PickedImage(event:Event){

    const file = (event.target as HTMLInputElement).files[0];
    if(file.type=='image/png' || file.type=='image/jpeg'){

      var img = new Image();
      var objUrl= window.URL.createObjectURL(file);
      img.onload =()=>{
        if(img.width>=100&&img.width<=300
          &&img.height>=100&&img.height<=300)
            this.correctImageSizeType = true;
        console.log(img.height,img.width)    
        window.URL.revokeObjectURL(objUrl)
      };
      
      img.src = objUrl;
      console.log(img.width,img.height)
      
      this.form.patchValue({image:file});
      this.form.get('image').updateValueAndValidity();
      console.log(file.type)
    }else{
      this.correctImageSizeType=false;
    }

  }
  checkRepeating(stringi){
    for (let i = 1; i < stringi.length; i++) {
      console.log(stringi)
      if(stringi[i]==stringi[i-1])
        return true
      
    }
    return false
  }
  wordpattern = new RegExp(/^(?=.*[a-zA-Z0-9])\w.{0,}$/)
  pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!])[A-Za-z][A-Za-z\d$&+,:;=?@#|'<>.^*()%!]{7,13}$/,"i")
  numberpattern = new RegExp(/^06\d\d{7}$/,"i")
  emailpattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[a-z]{2,4}$/,"i")
  wrongpassword=false;
  invalidform = false;
  wrongnumber = false;
  wrongemail = false;
  takenusername = false;
  takenemail = false;
  notSame = false;
  wrongdata = false;
  wrongusername = false;
  wronglastname = false;
  wrongname = false;
  wrongaddress = false;
  register(){
    console.log(this.allEmails,this.allUsernames)
    this.wrongdata = false;
    this.wrongpassword=false;
    this.invalidform = false;
    this.wrongnumber = false;
    this.wrongemail = false;
    this.wrongusername = false;
    this.wronglastname = false;
    this.wrongname = false;
    this.wrongaddress = false;
    this.takenusername = false;
    this.takenemail = false;
    this.notSame=false;
  if(this.form.invalid || (!this.correctImageSizeType && this.form.value.image!=null)){
    this.invalidform = true;
    this.message='Niste popunili sva polja'
    return;
  }
  if(this.allEmails.includes(this.form.value.email))
    this.takenemail = true;
  if(this.allUsernames.includes(this.form.value.username))
    this.takenusername = true;
  if(!this.pattern.test(this.form.value.password)||this.checkRepeating(this.form.value.password)){
    this.wrongpassword=true;
  }
  if(!this.wordpattern.test(this.form.value.username)){
    this.wrongusername = true;
  }
  if(!this.wordpattern.test(this.form.value.firstname)){
    this.wrongname = true;
  }
  if(!this.wordpattern.test(this.form.value.lastname)){
    this.wronglastname = true;
  }
  if(!this.wordpattern.test(this.form.value.address)){
    this.wrongaddress = true;
  }
  if(!this.numberpattern.test(this.form.value.phone)){
    this.wrongnumber = true;
  }
  if (!this.emailpattern.test(this.form.value.email)){
    this.wrongemail = true;
  }
  if(this.form.value.password!=this.form.value.passwordconf)
    this.notSame = true;
  if(this.wrongnumber||this.wrongpassword||this.wrongemail||this.takenemail||this.takenusername||this.notSame||this.wrongname ||this.wrongusername||this.wronglastname||this.wrongaddress){
    this.wrongdata = true;
    this.message = 'Greška u unetim podacima.'
    return;
  }
  else if(this.form.value.image!=null){
    this.service.addUser(
      this.form.value.username,
      this.form.value.password,
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.address,
      this.form.value.phone,
      this.form.value.email,
      this.form.value.image).subscribe((response)=>{
        if(response)
        alert("Uspešno poslat zahtev za registraciju!");
        else
          console.log('neuspesno dodat')
        this.correctImageSizeType=false;
         this.form.reset(); 
         this.wrongpassword=false;
         this.invalidform = false;
        this.myFileInput.nativeElement.value=''
        this.ngOnInit();
      })
  }
  else if(this.form.value.image==null){
    
    this.service.addUserDefaultAvatar(
      this.form.value.username,
      this.form.value.password,
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.address,
      this.form.value.phone,
      this.form.value.email).subscribe((response)=>{
        if(response)
          console.log('uspesno dodat')
        else
          console.log('neuspesno dodat')
        this.form.reset(); 
        this.wrongpassword=false;
        this.invalidform = false;
        this.myFileInput.nativeElement.value=''
        this.ngOnInit();
      })
  }
  }

    
}
