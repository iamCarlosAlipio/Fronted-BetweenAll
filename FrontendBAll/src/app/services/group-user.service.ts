import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { GroupUser } from './../models/groupUser';
import { DtoMyGroupUsersSummary } from '../models/dtoMyGroupUsersSummary';

@Injectable({
  providedIn: 'root'
})
export class GroupUserService {

  ruta_servidor : string = "http://localhost:8080/api";
  recurso: string ="groupUsers";

  constructor(private http:HttpClient) { }

  getGroupUsers(){
    return this.http.get<GroupUser[]>(this.ruta_servidor+"/"+this.recurso)
  }

  insertGroupUser(groupUser:GroupUser, id: number, idGroup: number){
    return this.http.post<GroupUser>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString()+"/"+idGroup.toString(), groupUser);
  }

  deleteGroupUser(id: number) {
    return this.http.delete(this.ruta_servidor +"/"+this.recurso + "/" + id.toString());
  }

  deleteGroupUserByUserAndGroup(idUser: number,idGroup:number) {
    return this.http.delete(this.ruta_servidor +"/"+this.recurso + "/Group/" + idUser.toString()+"/"+idGroup.toString());
  }
  
  getListMyGroupUsersSummary(id:number){
    return this.http.get<DtoMyGroupUsersSummary[]>(this.ruta_servidor+"/"+this.recurso +"/summary/"+id.toString())
  }

}
