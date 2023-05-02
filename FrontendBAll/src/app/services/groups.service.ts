import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Group } from './../models/group';



@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "groups";

  constructor(private http:HttpClient) { }

  getGroups() {
    return this.http.get<Group[]>(this.ruta_servidor +"/"+this.recurso);
  }

  getGroup(id: number) {
    return this.http.get<Group>(this.ruta_servidor +"/"+this.recurso + "/" + id.toString());
  }

  addGroup(group: Group){
    return this.http.post<Group>(this.ruta_servidor +"/"+this.recurso,group);
  }

  updateGroup(group: Group) {
    return this.http.put<Group>(this.ruta_servidor +"/"+this.recurso + "/" + group.id.toString(), group);
  }

  deleteGroup(id: number) {
    return this.http.delete(this.ruta_servidor +"/"+this.recurso + "/" + id.toString());
  }

}
