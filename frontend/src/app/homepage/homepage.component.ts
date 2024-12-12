import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router,private userService: UserService,private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.role = localStorage.getItem('role')
    this.doctorService.getAllDoctors().subscribe((data:User[])=>{
      this.allDoctors=data;
    })
  }
  allDoctors:User[] = []

  imeasc:boolean = true;
  prezimeasc:boolean = true;
  specasc: boolean = true;
  searchOpen:boolean = false;

  imeParam:string;
  prezimeParam: string;
  specParam: string;
  searchToggle(){
    this.searchOpen=this.searchOpen?!this.searchOpen:!this.searchOpen
  }
  isAuth = false;
  role:string;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
    this.ngOnInit()
  }
  searchDoctors(){
    this.doctorService.searchDoctors(this.imeParam?this.imeParam:"",this.prezimeParam?this.prezimeParam:"", this.specParam?this.specParam:"","").subscribe((u:User[])=>{
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
}


