import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Group } from './../models/group';
import { DtoGroupParticipantsSummary } from '../models/dtoGroupParticipantsSummary';



@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  ruta_servidor: string = "http://localhost:8080/api";
  recurso: string = "groups";

  constructor(private http:HttpClient) { }

  getGroups() {
    return this.http.get<Group[]>(this.ruta_servidor +"/"+this.recurso);
  }

  getGroup(id: number) {
    return this.http.get<Group>(this.ruta_servidor +"/"+this.recurso + "/" + id.toString());
  }

  addGroup(group: Group,id:number, idcategory: number){
    return this.http.post<Group>(this.ruta_servidor +"/"+this.recurso+"/"+ id.toString() + "/" + idcategory.toString(),group);
  }

  updateGroup(group: Group) {
    return this.http.put<Group>(this.ruta_servidor +"/"+this.recurso + "/" + group.id.toString(), group);
  }

  deleteGroup(id: number) {
    return this.http.delete(this.ruta_servidor +"/"+this.recurso + "/" + id.toString());
  }

  getGroupParticipantsSummary(id: number) {
    return this.http.get<DtoGroupParticipantsSummary>(this.ruta_servidor+"/"+this.recurso+"/groupParticipantsSummary/"+id.toString())
  }

  getListGroupParticipantsSummary(){
    return this.http.get<DtoGroupParticipantsSummary[]>(this.ruta_servidor+"/"+this.recurso+"/groupsSummary")
  }

}
