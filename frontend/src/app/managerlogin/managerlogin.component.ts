import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-managerlogin',
  templateUrl: './managerlogin.component.html',
  styleUrls: ['./managerlogin.component.css']
})
export class ManagerloginComponent implements OnInit {

  constructor(private manService:ManagerService, private router:Router) { }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.role = localStorage.getItem('role')
  }

  username: string;
  password: string;
  message: string;
  isAuth = false;
  role:string;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
    this.ngOnInit()
  }
  login(){
    this.manService.loginManager(this.username,this.password).subscribe((user: User)=>{
      if(user!=null){
        localStorage.setItem("ulogovan",JSON.stringify(user));
        localStorage.setItem("state",'true')
        localStorage.setItem("role",'manager')
        this.router.navigate(['manager'])
      }else{
        this.message = 'wrong user'
      }
    })
  }
}
