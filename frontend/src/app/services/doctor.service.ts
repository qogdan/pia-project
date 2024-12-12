import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Zakazan } from '../models/zakazan';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  uri='http://localhost:4000'
  constructor(private http:HttpClient) { }

  getAllDoctors(){
    return this.http.get(`${this.uri}/doctors/getAllDoctors`)
  }

  getDoctorsWithUsernames(docs){
    const data={
      docs:docs
    }
    return this.http.post('http://localhost:4000/doctors/getDoctorsWithUsernames',data)

  }

  updateDoctorData(username,firstname,lastname,address,email,phone,licence,spec,branch){
    const data={
      username:username,
      firstname:firstname,
      lastname:lastname,
      address:address,
      email:email,
      phone:phone,
      licence:licence,
      spec:spec,
      branch:branch
    }
    return this.http.post('http://localhost:4000/doctors/updateDoctorData',data)
  }
  getPregledi(doctor){
    const data={
      doctor:doctor
    }
    return this.http.post('http://localhost:4000/doctors/getPregledi',data)
  }
  
  addIzvestaj(zakazan,razlog,dijagnoza,terapija,kontrola){
    const data={
      zakazan:zakazan,
      razlog:razlog,
      dijagnoza:dijagnoza,
      terapija:terapija,
      kontrola:kontrola
    }
    return this.http.post('http://localhost:4000/doctors/addIzvestaj',data)
  }
  
  getSviIzvestaji(doctor){
    const data={
      doctor:doctor
    }
    return this.http.post('http://localhost:4000/doctors/getSviIzvestaji',data)
  }
  getPrethodniPregledi(doctor,datetime){
    const data={
      doctor:doctor,
      datetime:datetime
    }
    return this.http.post('http://localhost:4000/doctors/getPrethodniPregledi',data)
  }
  getPreglediPatient(patient){
    const data={
      patient:patient
    }
    return this.http.post('http://localhost:4000/doctors/getPreglediPatient',data)

  }
  getPreglediSpec(spec){
    const data={
      spec:spec
    }
    return this.http.post('http://localhost:4000/doctors/getPreglediSpec',data)

  }
  getIzvestajiPatient(patient){
    const data = {
      patient:patient
    }
    return this.http.post('http://localhost:4000/doctors/getIzvestajiPatient',data)
  }
  posaljiZahtevPregled(pregled){
    const data = {
      pregled:pregled
    }
    return this.http.post('http://localhost:4000/doctors/posaljiZahtevPregled',data)

  }

  getZauzetiLekar(doctor,timeStart,timeEnd){
    const data={
      doctor: doctor,
      timeStart: timeStart,
      timeEnd: timeEnd
    }
    console.log(timeStart,timeEnd)
    return this.http.post('http://localhost:4000/doctors/getZauzetiLekar',data)
  }

  zakaziPregled(patient,doctor,pregled,timeStart,timeEnd){
    const data ={
      patient:patient,
      doctor:doctor,
      pregled:pregled,
      timeStart:timeStart,
      timeEnd:timeEnd
    }
    return this.http.post('http://localhost:4000/doctors/zakaziPregled',data)
  }
  otkaziPregled(id){
    const data ={
      id:id
    }
    return this.http.post('http://localhost:4000/doctors/otkaziPregled',data)
  }
  searchDoctors(firstname:string,lastname:string,spec:string,branch:string){
    const data = {
      firstname:firstname,
      lastname:lastname,
      spec:spec,
      branch:branch
    }
    return this.http.post('http://localhost:4000/doctors/searchDoctors',data)
  }

  updateDocPregled(spec,pregledi,doctor){
    const data = {
      spec:spec,
      pregledi:pregledi,
      doctor:doctor
    }
    return this.http.post('http://localhost:4000/doctors/updateDocPregled',data)

  }
  getObavestenja(username){
    const data = {
      username:username
    }
    return this.http.post('http://localhost:4000/doctors/getObavestenja',data)

  }
  updateObavestenje(id){
    const data = {
      id:id
    }
    return this.http.post('http://localhost:4000/doctors/updateObavestenje',data)

  }
  getNextTriPregleda(doctor,datetime){
    const data = {
      doctor:doctor,
      datetime:datetime
    }
    return this.http.post<{nextThree:Zakazan[]}>('http://localhost:4000/doctors/getNextTriPregleda',data)

  }
}
