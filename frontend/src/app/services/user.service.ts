import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  uri = 'http://localhost:4000'

  login(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post('http://localhost:4000/users/login', data)
  }
  
  getUser(username){
    const data = {
      username:username
    }
    return this.http.post('http://localhost:4000/users/getUser', data)
  }
  getAllUsers(){
    return this.http.get('http://localhost:4000/users/getAllUsers')
  }
  addUser(username,password,firstname,lastname,address,phone,email,image:File){
    const userData = new FormData();
    userData.append("username",username);
    userData.append("password",password);
    userData.append("firstname",firstname);
    userData.append("lastname",lastname);
    userData.append("address",address);
    userData.append("phone",phone);
    userData.append("email",email);
    userData.append("image",image);
    
    return this.http.post('http://localhost:4000/users/addUser',userData)
  }
  isLoggedIn(){
    const loggedIn = localStorage.getItem('state')
    if(loggedIn=='true')
      return true
    else return false
  }
  getRole(){
    return localStorage.getItem('role')
  }
  otkaziPregled(id){
    const data ={
      id:id
    }
    return this.http.post('http://localhost:4000/users/otkaziPregled',data)
  }
  addUserDefaultAvatar(username,password,firstname,lastname,address,phone,email){
    const userData={
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      address:address,
      phone:phone,
      email:email
    }
    return this.http.post('http://localhost:4000/users/addUserDefaultAvatar',userData)
  }
  updateUserData(username,firstname,lastname,address,phone,email){
    const data={
      username:username,
      firstname:firstname,
      lastname:lastname,
      address:address,
      email:email,
      phone:phone
    }
    return this.http.post('http://localhost:4000/users/updateUserData',data)
  }
  updateUserPassword(username,password){
    const data = {
      username:username,
      password:password
    }
    return this.http.post('http://localhost:4000/users/updateUserPassword',data)

  }
  updateUserPhoto(username,image:File){
    const userData = new FormData();
    userData.append("username",username);
    userData.append("image",image);
    return this.http.post('http://localhost:4000/users/updateUserPhoto',userData)

  }
  deleteUserPhoto(username){
    const userData= {
      username:username
    }
    return this.http.post('http://localhost:4000/users/deleteUserPhoto',userData)

  }
}
