import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  rutaServer: string="http://localhost:8080/api";
  recurso:string="users";

  constructor(private Http:HttpClient) { }

  getUsers(){
    return this.Http.get<User[]>(this.rutaServer+"/"+this.recurso)
  }

  getUser(id:number){
    return this.Http.get<User>(this.rutaServer+"/"+this.recurso+ "/" + id.toString());
  }

  insertUser(user:User){
    return this.Http.post<User>(this.rutaServer+"/"+this.recurso,user);
  }
  
  updateUser(user:User) {
    return this.Http.put<User>(this.rutaServer +"/"+this.recurso + "/" + user.id.toString(), user);
  }

  deleteUser(id:number) {
    return this.Http.delete(this.rutaServer +"/"+this.recurso + "/" + id.toString());
  }

  getLastUsers(){
    return this.Http.get<User>(this.rutaServer+"/"+this.recurso+ "/last")
  }

  getUserPassword(pass:string, email:string){
    return this.Http.get<User>(this.rutaServer+"/"+this.recurso+ "/pass/"+pass+"/"+email)
  }


}
