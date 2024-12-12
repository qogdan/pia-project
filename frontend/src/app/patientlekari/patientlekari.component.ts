import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientlekari',
  templateUrl: './patientlekari.component.html',
  styleUrls: ['./patientlekari.component.css']
})
export class PatientlekariComponent implements OnInit {

  constructor(private doctorService:DoctorService,private router:Router) { }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'

    this.doctorService.getAllDoctors().subscribe((data:User[])=>{
      this.allDoctors=data;
    })
  }
  isAuth = false;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
  }
  allDoctors:User[] = []

  imeasc:boolean = true;
  prezimeasc:boolean = true;
  specasc: boolean = true;
  branchasc:boolean = true;
  searchOpen:boolean = false;

  imeParam:string;
  prezimeParam: string;
  specParam: string;
  branchParam: string;
  gotoDoctorCard(doctor:User){
    localStorage.setItem("doctorcard",JSON.stringify(doctor));
    this.router.navigate(['doctorcard'])
  }

  searchToggle(){
    this.searchOpen=this.searchOpen?!this.searchOpen:!this.searchOpen
  }
  searchDoctors(){
    this.doctorService.searchDoctors(this.imeParam?this.imeParam:"",this.prezimeParam?this.prezimeParam:"", this.specParam?this.specParam:"",this.branchParam?this.branchParam:"").subscribe((u:User[])=>{
      if(u){
        console.log(u)
        this.allDoctors=u;
      }
      
    })
  }
  sortIme(){
    if(this.imeasc){
      this.imeasc = false;
      this.allDoctors.sort((a, b) =>
          (a.firstname>b.firstname)?1:((b.firstname>a.firstname)?-1:0))
        }else{
          this.imeasc = true;
          this.allDoctors.sort((b, a) =>
              (a.firstname>b.firstname)?1:((b.firstname>a.firstname)?-1:0))
    }
  }
  sortPrezime(){
    if(this.prezimeasc){
      this.prezimeasc = false;
      this.allDoctors.sort((a, b) =>
          (a.lastname>b.lastname)?1:((b.lastname>a.lastname)?-1:0))
        }else{
          this.prezimeasc = true;
          this.allDoctors.sort((b, a) =>
              (a.lastname>b.lastname)?1:((b.lastname>a.lastname)?-1:0))
    }
  }
  sortSpec(){
    if(this.specasc){
      this.specasc = false;
      this.allDoctors.sort((a, b) =>
          (a.spec>b.spec)?1:((b.spec>a.spec)?-1:0))
        }else{
          this.specasc = true;
          this.allDoctors.sort((b, a) =>
              (a.spec>b.spec)?1:((b.spec>a.spec)?-1:0))
    }
  }
  sortOgranak(){
    if(this.branchasc){
      this.branchasc = false;
      this.allDoctors.sort((a, b) =>
          (a.branch>b.branch)?1:((b.branch>a.branch)?-1:0))
        }else{
          this.branchasc = true;
          this.allDoctors.sort((b, a) =>
              (a.branch>b.branch)?1:((b.branch>a.branch)?-1:0))
    }
  }
}
