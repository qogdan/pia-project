import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;
  user:User;
  login(){
    if(this.username==null || this.password==null){
      this.message='Popunite sva polja'
      return;
    }
    this.userService.login(this.username,this.password).subscribe((user: User)=>{
      if(user!=null){
        localStorage.setItem("ulogovan",JSON.stringify(user));
        localStorage.setItem("state",'true')
        localStorage.setItem("role",user.type)
        console.log(user.address)
        if(user.type=="patient")
        this.router.navigate(['patient'])
        else if(user.type=="doctor")
          this.router.navigate(['doctor'])
      }else{
        this.message = 'Ne postoji korisnik sa unetim korisničkim imenom i/ili loznikom'
      }
    })
  }
  
  
}
