import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }

  getAllPatients(){
    return this.http.get('http://localhost:4000/users/getAllPatients')
  }
  loginManager(username,password){
    const data = {
      username:username,
      password:password
    }
    return this.http.post('http://localhost:4000/users/loginManager',data)
  }

  deleteUser(username){
    const data = {
      username:username
    }
    return this.http.post('http://localhost:4000/users/deleteUser',data)
  }
  addUser(user){
    const data = {
      user:user
    }
    return this.http.post('http://localhost:4000/managers/addUser',data)
  }
  addDoctor(username,password,firstname,lastname,address,phone,email,licence,spec,branch,image:File){
    const userData = new FormData();
    userData.append("username",username);
    userData.append("password",password);
    userData.append("firstname",firstname);
    userData.append("lastname",lastname);
    userData.append("address",address);
    userData.append("phone",phone);
    userData.append("email",email);
    userData.append("image",image);
    userData.append("licence",licence);
    userData.append("spec",spec);
    userData.append("branch",branch);
    
    return this.http.post('http://localhost:4000/users/addDoctor',userData)
  }
  addDoctorDefaultAvatar(username,password,firstname,lastname,address,phone,email,licence,spec,branch){
    const userData={
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      address:address,
      phone:phone,
      email:email,
      licence:licence,
      spec:spec,
      branch:branch
    }
    return this.http.post('http://localhost:4000/users/addDoctorDefaultAvatar',userData)
  }
  addUserDefaultAvatar(user){
    const data = {
      user:user
    }
    return this.http.post('http://localhost:4000/managers/addUserDefaultAvatar',data)
  }
  addPregled(pregled){
    const data = {
      pregled:pregled
    }
    return this.http.post('http://localhost:4000/managers/addPregled',data)
  }
  updatePregled(id,duration,price,spec){
    const data = {
      id:id,
      
      duration:duration,
      price:price,
      spec:spec
    }
    return this.http.post('http://localhost:4000/managers/updatePregled',data)
  }
  deletePregled(id,spec){
    const data = {
      id:id,
      spec:spec
    }
    return this.http.post('http://localhost:4000/managers/deletePregled',data)
  }
  addSpec(spec){
    const data = {
      spec:spec
    }
    return this.http.post('http://localhost:4000/managers/addSpec',data)
  }
  getRequests(tip){
    const data = {
      type:tip
    }
    return this.http.post('http://localhost:4000/managers/getRequests',data)
  }
  getAllSpec(){
    
    return this.http.get('http://localhost:4000/managers/getAllSpec')
  }
  updateRequestStatus(id,status){
    const data = {
      id:id,
      status:status
    }
    return this.http.post('http://localhost:4000/managers/updateRequestStatus',data)

  }
  
}
