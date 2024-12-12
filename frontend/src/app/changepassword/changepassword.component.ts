import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private service:UserService) { }

  ngOnInit(): void {
  }

  notSame = false;
  notPass = false;
  wrongpassword = false;
  passwordinsert:string;
  newpassword1:string;
  newpassword2:string;
  pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!])[A-Za-z][A-Za-z\d$&+,:;=?@#|'<>.^*()%!]{7,13}$/,"i")
  
  checkRepeating(stringi){
    for (let i = 1; i < stringi.length; i++) {
      console.log(stringi)
      if(stringi[i]==stringi[i-1])
        return true
      
    }
    return false
  }
  updatePassword(){
    this.notSame = false;
    this.notPass = false;
    this.wrongpassword = false;
    if(this.passwordinsert!=JSON.parse(localStorage.getItem("ulogovan")).password){
      this.notPass = true;
      return;
    }
    if(this.newpassword1!=this.newpassword2){
      this.notSame = true;
      return
    }
    if(!this.pattern.test(this.newpassword1)||this.checkRepeating(this.newpassword1)){
      this.wrongpassword=true;
      return;
    }
    this.service.updateUserPassword(JSON.parse(localStorage.getItem("ulogovan")).username,this.newpassword1).subscribe((resp)=>{
      if(resp){
        let usr = JSON.parse(localStorage.getItem('ulogovan'))
        usr.password = this.newpassword1;
        localStorage.setItem('ulogovan',JSON.stringify(usr))

      }
      this.passwordinsert=''
      this.newpassword1=''
      this.newpassword2=''
    this.notSame = false;
    this.notPass = false;
    this.wrongpassword = false;
      alert("Lozinka promenjena.")
    })
  }
}
