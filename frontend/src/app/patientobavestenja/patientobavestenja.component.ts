import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Obavestenje } from '../models/obavestenje';
import { DoctorService } from '../services/doctor.service';
import { User } from '../models/user';

@Component({
  selector: 'app-patientobavestenja',
  templateUrl: './patientobavestenja.component.html',
  styleUrls: ['./patientobavestenja.component.css']
})
export class PatientobavestenjaComponent implements OnInit {

  constructor(private router:Router,private docService:DoctorService) {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))

   }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.docService.getObavestenja(this.ulogovan.username).subscribe((o:Obavestenje[])=>{
      if(o){
        for (let i = 0; i < o.length; i++) {
          //o[i].read?:(this.shouldShow(o[i])?this.obavestenja.push(o[i]):continue)
          if(o[i].read){
            this.obavestenjaRead.push(o[i])
          }else{
            if(this.shouldShow(o[i])){
              this.obavestenja.push(o[i])
            }
          }
        }
      }
    })
  }
  ulogovan:User
  isAuth = false;
  colapseID:string='colapseID'
  colapseIDR:string='colapseIDR'
  obavestenja:Obavestenje[]=[]
  obavestenjaRead:Obavestenje[]=[]
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
  }
  isItTime(s){
    let cur = ((new Date(s)).getTime()-7200000)
    let fut = new Date().getTime()
    console.log(fut,cur)
    return cur-fut<=24*3600000
  }
  read(id){
    this.docService.updateObavestenje(id).subscribe(()=>{
    })
  }
  naslov(o:Obavestenje){
    if(o.type=='24h')
      return "Pregled za 24h"
    if(o.type=='otkazan')
      return "Pregled je otkazan"
    else return ''
  }
  getDate(s):string{
    let date = new Date(s)
    var getYear = date.toLocaleString("default", { year: "numeric" });
    var getMonth = date.toLocaleString("default", { month: "2-digit" });
    var getDay = date.toLocaleString("default", { day: "2-digit" });
    var dateFormat = getDay+'.'+getMonth+'.'+getYear+'.';
    return dateFormat;
  }
  getTime(s):string{
    return (new Date(s)).toUTCString().slice(17,22)
  }
  shouldShow(o:Obavestenje){
    if(o.type=='24h' && this.isItTime(o.datetime))
      return true;
    if(o.type=='otkazan') return true;
    return false;
  }
}
