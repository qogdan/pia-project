import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';
import { User } from '../models/user';
import { ManagerService } from '../services/manager.service';
import { Zahtev } from '../models/zahtev';
import { Pregled } from '../models/pregled';
import { Specijalizacija } from '../models/specijalizacija';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private router:Router,private userService: UserService,private manService:ManagerService,private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('state')=='true'
    this.updateDocmode = []
    this.doctorService.getAllDoctors().subscribe((d:User[])=>{
      if(d){
        this.allDoctors = d;
        for (let i = 0; i < this.allDoctors.length; i++) {
          this.updateDocmode.push(false)
          
        } 
      }
    })
    this.updateUsermode = []
    this.manService.getAllPatients().subscribe((p:User[])=>{
      if(p){
        this.allPatients = p;
        for (let i = 0; i < this.allPatients.length; i++) {
          this.updateUsermode.push(false)
          
        } 
      }
    })
    this.allAccRejUsernamesEmails = []
    this.manService.getRequests('register').subscribe((r:Zahtev[])=>{
      if(r) this.allRegisters = r;
      for (let i = 0; i < r.length; i++) {
        if(r[i].status=='accepted'||r[i].status=='rejected'){
          this.allAccRejUsernamesEmails.push((r[i].user as User).username)
          this.allAccRejUsernamesEmails.push((r[i].user as User).email)
        }
      }
    })
    this.allAccRejPregledi = []
    this.manService.getRequests('pregled').subscribe((r:Zahtev[])=>{
      if(r){
        this.allPregledi = r;
        for (let i = 0; i < r.length; i++) {
          if(r[i].status=='accepted'||r[i].status=='rejected'){
            this.allAccRejPregledi.push(r[i]._id)
          }
        }
        console.log(this.allPregledi,this.allAccRejPregledi)
      } 
    })
    this.sviPregledi=[]
    this.updatePregledmode=[]
    this.manService.getAllSpec().subscribe((s:Specijalizacija[])=>{
      if(s){
        this.allSpec = s;
        for (let i = 0; i < s.length; i++) {
          this.sviPregledi=this.sviPregledi.concat(s[i].pregledi)
          
        }
        console.log(this.sviPregledi)
        for (let i = 0; i < this.sviPregledi.length; i++) {
          this.updatePregledmode.push(false)
          
        }
        console.log(this.updatePregledmode.length)
      }
    })
  }
  Pfirstname:string;
  Plastname:string;
  Paddress:string;
  Pcontact:string;
  

  allDoctors:User[] = []        
  allPatients:User[] = []       
  allRegisters:Zahtev[] = []
  allSpec:Specijalizacija[]=[]
  allPregledi:Zahtev[] = []
  sviPregledi:Pregled[]=[]
  allAccRejUsernamesEmails:string[]=[]
  allAccRejPregledi:string[]=[]
  viewusermode = true;
  colapseID:string='colapseID'
  showfield=false;
  imeasc:boolean = true;
  prezimeasc:boolean = true;
  specasc: boolean = true;
  specName:string;
  showfieldaddpregled:boolean = false;
  pregledname:string;
  pregledduration:number;
  pregledprice:number
  pname:string;
  pprice:string;
  pduration:string;
  uemail:string;
  uusername:string;
  ufirstname:string;
  ulastname:string;
  uaddress:string;
  ucontact:string;
  dfirstname:string;
  dlastname:string;
  daddress:string;
  dcontact:string;
  dlicence:string;
  dspec:string;
  dbranch:string;
  dusername:string;
  demail:string;

  updatePregledmode:boolean[]=[]
  updateUsermode:boolean[]=[]
  updateDocmode:boolean[]=[]

  showField(){
    this.showfield=!this.showfield;
  }
  isAuth = false;
  logout(){
    localStorage.removeItem('ulogovan')
    localStorage.setItem('state','false')
    localStorage.setItem('role','')
    this.router.navigate(['homepage'])
  }
  showFieldaddPregled(){
    this.showfieldaddpregled=!this.showfieldaddpregled;
  }
  updateUserMode(i):boolean{
      for (let i = 0; i < this.updateUsermode.length; i++) {
        this.updateUsermode[i]=false;
      }
      this.updateUsermode[i] = !this.updateUsermode[i]
      return this.updateUsermode[i]
      
  }
  updateUserModeM(i):boolean{
  
      // this.ufirstname = null;
      // this.ulastname = null;
      // this.uaddress = null;
      // this.ucontact = null;
      this.updateUsermode[i] = !this.updateUsermode[i]
      return this.updateUsermode[i]
  }
  updateDocMode(i):boolean{
      for (let i = 0; i < this.updateDocmode.length; i++) {
        this.updateDocmode[i]=false;
      }
      this.updateDocmode[i] = !this.updateDocmode[i]
      return this.updateDocmode[i]
    
  }
  updateDocModeM(i):boolean{
    
      // this.ufirstname = null;
      // this.ulastname = null;
      // this.uaddress = null;
      // this.ucontact = null;
      this.updateDocmode[i] = !this.updateDocmode[i]
      return this.updateDocmode[i]
  }
  updatePregledMode(i):boolean{
      for (let i = 0; i < this.updatePregledmode.length; i++) {
        this.updatePregledmode[i]=false;
      }
      this.updatePregledmode[i] = !this.updatePregledmode[i]
      return this.updatePregledmode[i]
    
  }
  updatePregledModeM(i):boolean{
    
    // this.pname=null
    // this.pprice=null
    // this.pduration=null
    this.updatePregledmode[i] = !this.updatePregledmode[i]
    return this.updatePregledmode[i]
  
  }
  
  updateUser(pat){
    
    this.userService.updateUserData(
        pat.username,
        this.ufirstname,
        this.ulastname,
        this.uaddress,
        this.ucontact,
        this.uemail).subscribe((response)=>{
          this.ngOnInit();
        })
  }
  updateDoc(doc){
    
      this.doctorService.updateDoctorData(
        doc.username,
        this.dfirstname,
        this.dlastname,
        this.daddress,
        this.demail,
        this.dcontact,
        this.dlicence,
        this.dspec,
        this.dbranch).subscribe((response)=>{
          
          this.ngOnInit();
        })
  }
  updatePregled(p){
    this.manService.updatePregled(p._id,this.pduration==null?30:this.pduration,this.pprice,p.spec).subscribe(()=>{
      
      this.ngOnInit()
    })
  }
  deletePregled(p){
    
      this.manService.deletePregled(p._id,p.spec).subscribe(()=>{
        this.ngOnInit()
      })

  }
  delete(user:User){
    if(confirm("Da li zelite da obrisete korisnika "+user.username)) {
      this.manService.deleteUser(user.username).subscribe(()=>{
        this.ngOnInit();
      })
    }
  }
  addPregled(s){
    let preg = new Pregled()
    preg.doctors = []
    preg.duration = this.pregledduration==null?30:this.pregledduration
    preg.name = this.pregledname;
    preg.price = this.pregledprice;
    preg.spec = s
    if(preg.name==null || preg.price==null)
      {
        alert("Unesi naziv i cenu.")
        return;
      }
    this.manService.addPregled(preg).subscribe(()=>{
      this.pregledname = null;
      this.pregledduration = null;
      this.pregledprice = null;
      this.showFieldaddPregled()
      this.ngOnInit()
    })
  }

  acceptRequest(req:Zahtev){
    if(this.allAccRejUsernamesEmails.includes((req.user as User).username) || this.allAccRejUsernamesEmails.includes((req.user as User).email))
      {
        console.log('zauzet username/email')
        return;
      }else{
        this.manService.addUser(req.user).subscribe(()=>{
          this.manService.updateRequestStatus(req._id,'accepted').subscribe(()=>{
            this.ngOnInit();
          })
        })
      }
  }
  acceptPregledRequest(pr:Zahtev){
    this.manService.addPregled(pr.pregled).subscribe(()=>{
      this.manService.updateRequestStatus(pr._id,'accepted').subscribe(()=>{
        this.ngOnInit();
      })
    })
  }
  rejectRequest(req:Zahtev){
    this.manService.updateRequestStatus(req._id,'rejected').subscribe(()=>{
      this.ngOnInit();
    })
  }

  addSpec(){
    this.manService.addSpec(this.specName).subscribe(()=>{
      this.showfield=false
      this.ngOnInit()

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
