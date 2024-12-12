import { Component, OnInit } from '@angular/core';
import { Izvestaj } from '../models/izvestaj';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-patientcard',
  templateUrl: './patientcard.component.html',
  styleUrls: ['./patientcard.component.css']
})
export class PatientcardComponent implements OnInit {

  constructor(private userService:UserService,private  docService:DoctorService,private router:Router) {
   }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'

    this.patient = localStorage.getItem("patientcard")
    console.log(this.patient)
    this.userService.getUser(this.patient).subscribe((p:User)=>{
      if(p) this.selected = p;
    })
    this.docService.getIzvestajiPatient(this.patient).subscribe((i:Izvestaj[])=>{
      if(i) this.izvestaji = i;
    })
  }
  selected:User;
  isAuth = false;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
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

  patient:string;
  izvestaji:Izvestaj[]=[]
}
