import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Zakazan } from '../models/zakazan';
import { DoctorService } from '../services/doctor.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { DocPreg } from '../models/docpreg';
import { Izvestaj } from '../models/izvestaj';
import { DocIzv } from '../models/docizv';

@Component({
  selector: 'app-patientpregledi',
  templateUrl: './patientpregledi.component.html',
  styleUrls: ['./patientpregledi.component.css']
})

export class PatientpreglediComponent implements OnInit {

  constructor(private router:Router,private docService:DoctorService,private userService:UserService) {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
   }
   isAuth = false;
   logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
     this.router.navigate(['homepage'])
   }
  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.doctorObjects = []
    let cur = new Date()
    let nex = new Date(cur.getTime()+7200000)
    this.docService.getPreglediPatient(this.ulogovan.username).subscribe((p:Zakazan[])=>{
      if(p){
        this.pregledi = p;
        this.pregledi.sort((a,b)=>
          (a.timeStart>b.timeStart)?1:((b.timeStart>a.timeStart)?-1:0)
        )
        
        let docs:string[]=[]
        for (let i = 0; i < p.length; i++) {
          if(p[i].timeStart<nex.toISOString()) continue;
          this.doctorObjects.push({
            pregled:p[i],
            doktor:null
          })
          docs.push(p[i].doctor)
        }
        this.docService.getDoctorsWithUsernames(docs).subscribe((d:User[])=>{
          for (let i = 0; i < docs.length; i++) {
            for (let j = 0; j < d.length; j++) {
              if(docs[i]==d[j].username){
                this.doctorObjects[i].doktor=d[j]
                break;
              }
            }
          }
          this.docizvObj = []
          this.docService.getIzvestajiPatient(this.ulogovan.username).subscribe((iz:Izvestaj[])=>{
            if(iz){
              this.izvestaji = iz;
              this.izvestaji.sort((a,b)=>
                (a.zakazani.timeStart>b.zakazani.timeStart)?1:((b.zakazani.timeStart>a.zakazani.timeStart)?-1:0)
              )
              let docs:string[]=[]
              for (let i = 0; i < iz.length; i++) {
                this.docizvObj.push({
                  izvestaj:iz[i],
                  doktor:null
                })
                docs.push(iz[i].zakazani.doctor)
              }
              this.docService.getDoctorsWithUsernames(docs).subscribe((d:User[])=>{
                for (let i = 0; i < docs.length; i++) {
                  for (let j = 0; j < d.length; j++) {
                    if(docs[i]==d[j].username){
                      this.docizvObj[i].doktor=d[j]
                      break;
                    }
                  }
                }
              })
            }
      
          })
        })
      }
    })
  }
  otkazi(pregled){
    this.userService.otkaziPregled(pregled._id).subscribe(()=>{
      this.ngOnInit();
    })
  }
  waiting = true;
  doctorObjects:DocPreg []=[]
  docizvObj:DocIzv[]=[]
  izvestaji:Izvestaj[] = []
  getDocObj(idzak){
      for (let i = 0; i < this.doctorObjects.length; i++) {
        if(this.doctorObjects[i].pregled._id==idzak)
          return this.doctorObjects[i].doktor
      }
    return new User;
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
  pregledi:Zakazan[] = []
  ulogovan:User
}
