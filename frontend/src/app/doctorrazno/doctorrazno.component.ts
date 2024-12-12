import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor.service';
import { Pregled } from '../models/pregled';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctorrazno',
  templateUrl: './doctorrazno.component.html',
  styleUrls: ['./doctorrazno.component.css']
})
export class DoctorraznoComponent implements OnInit {

  constructor(private docService:DoctorService,private router:Router) { }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
    this.form = new FormGroup({
      name: new FormControl(null,{validators:[Validators.required]}),
      duration: new FormControl(null,{validators:[Validators.required]}),
      price: new FormControl(null,{validators:[Validators.required]})
    })
  }
  isAuth = false;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
  }
  form:FormGroup
  ulogovan:User;
  posaljiZahtevPregled(){
    if(this.form.valid){

      let pregled = new Pregled()
      pregled.name=this.form.value.name;
      pregled.duration=this.form.value.duration;
      pregled.price=this.form.value.price;
      pregled.spec = this.ulogovan.spec
      pregled.doctors=[]
      this.docService.posaljiZahtevPregled(pregled).subscribe(()=>{
        alert('Uspešno poslat zahtev.')
        this.ngOnInit();
      })
    }
  }
}
