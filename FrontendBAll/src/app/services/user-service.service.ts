import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  rutaServer: string="http://localhost:3000";
  recurso:string="user";

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
  
  updateEmpleado(user: User) {
    return this.Http.put<User>(this.rutaServer +"/"+this.recurso + "/" + user.id.toString(), user);
  }

  deleteEmpleado(id: number) {
    return this.Http.delete(this.rutaServer +"/"+this.recurso + "/" + id.toString());
  }

}
