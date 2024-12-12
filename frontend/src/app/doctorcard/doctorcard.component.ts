import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';
import { Pregled } from '../models/pregled';
import { Zakazan } from '../models/zakazan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctorcard',
  templateUrl: './doctorcard.component.html',
  styleUrls: ['./doctorcard.component.css']
})
export class DoctorcardComponent implements OnInit {

  constructor(private router:Router,private service:UserService,private docService:DoctorService) {
    this.odabran = JSON.parse(localStorage.getItem('doctorcard'))

   }
   isAuth = false;
   logout(){    localStorage.removeItem('ulogovan')
   localStorage.setItem('state','false')
   localStorage.setItem('role','')
     this.router.navigate(['homepage'])
   }
  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.service.getUser(this.odabran.username).subscribe((u:User)=>{
      this.ulogovan=u;
      this.firstname=this.ulogovan.firstname;
      this.lastname=this.ulogovan.lastname;
      this.username=this.ulogovan.username;
      this.password=this.ulogovan.password;
      this.address = this.ulogovan.address
      this.avatar=this.ulogovan.avatar;
      this.email=this.ulogovan.email;
      this.contact=this.ulogovan.contact;
      this.docService.getPregledi(this.username).subscribe((p:Pregled[])=>{
        if(p)
          this.sviPregledi=p;
      })
    })
  }
  viewmode=true
  odabran:User = null;
  ulogovan:User = null;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  avatar: string;
  address: string;
  email: string;
  contact: string;

  
  pregledOdabran:Pregled
  time:string;
  date:string;
  message:string;
  sviPregledi:Pregled[] = null;

  datumregex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  vremeregex = new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
  isValidDate(dateString) {
    // var regEx = /^\d{4}-\d{2}-\d{2}$/;
    // if(!dateString.match(regEx)) return false;  // Invalid format
    // if(!dateString)
    var d = new Date(dateString);
    var dNum = d.getTime();
    console.log(dNum,(new Date()).getTime())
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    if(d.getTime()<(new Date()).getTime()) return false;
    return d.toISOString().slice(0,10) === dateString.slice(0,10)
  }
  zakazi(){
    if(!this.pregledOdabran||!this.time||!this.date){
      this.message="Niste uneli sve podatke"
      return;
    }
    if(!this.isValidDate(this.date)){
      this.message = "Neispravan datum."
      return;
    }
    if(!this.isValidDate(this.date+'T'+this.time+'Z')){
      this.message = "Neispravno vreme."
      return;
    }
    
    let timestart = new Date(this.date+'T'+this.time+'Z')
    let timeend = new Date(timestart.getTime() + this.pregledOdabran.duration*60000);
    this.docService.getZauzetiLekar(this.odabran.username,timestart.toISOString(),timeend.toISOString()).
    subscribe((z:Zakazan)=>{
      if(z==null){
        this.docService.zakaziPregled((JSON.parse(localStorage.getItem("ulogovan"))).username,this.odabran.username,this.pregledOdabran,timestart.toISOString(),timeend.toISOString()).subscribe(
          ()=>{
            alert("Uspešno zakazan pregled.")
            this.message=  ''
            this.time = ''
            this.date = ''
            this.pregledOdabran = null
            this.ngOnInit()
          }
        )
      }else{
        alert("Lekar je zauzet u odabranom terminu.")
      }
    })
  }
}
