import { Component, OnInit } from '@angular/core';
import { Pregled } from '../models/pregled';
import { DoctorService } from '../services/doctor.service';
import { User } from '../models/user';
import {map} from 'rxjs/operators'
import { Zakazan } from '../models/zakazan';
import { Izvestaj } from '../models/izvestaj';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctorpregledi',
  templateUrl: './doctorpregledi.component.html',
  styleUrls: ['./doctorpregledi.component.css']
})
export class DoctorpreglediComponent implements OnInit {

  constructor(private docService:DoctorService,private router:Router) { 
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'))

  }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.form = new FormGroup({
      razlog: new FormControl(null,{validators:[Validators.required]}),
      dijagnoza: new FormControl(null,{ validators:[Validators.required]}),
      terapija: new FormControl(null,{ validators:[Validators.required]}),
      kontrola: new FormControl(null,{ validators:[Validators.required]}),
    })
    
    let nex = new Date()
    let fut = new Date(nex.getTime()+7200000)
    this.docService.getNextTriPregleda(this.ulogovan.username,fut.toISOString()).subscribe((p)=>{
      this.buduciPregledi=p.nextThree
    })
    this.docService.getPrethodniPregledi(this.ulogovan.username,fut.toISOString()).subscribe((p:Zakazan[])=>{
      this.prethodniPregledi=p;
      
    })
    this.docService.getSviIzvestaji(this.ulogovan.username).subscribe((iz:Izvestaj[])=>{
      if(iz){
        this.sviIzvestaji=iz
        for (let i = 0; i < iz.length; i++) {
          this.izvestajPregledi.push(iz[i].zakazani._id)
          this.prethodniPregledi.push(iz[i].zakazani)
        }
      }
    })
    
  }
  isAuth = false;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
  }
  gotoPatientCard(z){
    localStorage.setItem("patientcard",z.patient)
    this.router.navigate(["patientcard"])
  }

  razlog:string;
  kontrola:string;
  dijagnoza:string;
  terapija:string;

  form:FormGroup
  ulogovan:User
  buduciPregledi:Zakazan[];
  prethodniPregledi:Zakazan[]
  colapseID:string='colapseID'
  sviIzvestaji:Izvestaj[]=[]
  izvestajPregledi:string[]=[]

  otkazi(zak){
    this.docService.otkaziPregled(zak).subscribe(()=>{
      this.ngOnInit()
    })
  }
  addIzvestaj(p){
    
      if(this.form.invalid /*|| (!this.correctImageSizeType && this.form.value.image!=null)*/){
        console.log('invalid form',this.form);
        this.form.reset(); 
        // this.myFileInput.nativeElement.value=''
      }
      else {
        this.docService.addIzvestaj(
          p,this.form.value.razlog,
          this.form.value.dijagnoza,
          this.form.value.terapija,
          this.form.value.kontrola
          ).subscribe((response)=>{
            
            // this.correctImageSizeType=false;
             this.form.reset(); 
            // this.myFileInput.nativeElement.value=''
            this.ngOnInit();
          })
      }
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
}
