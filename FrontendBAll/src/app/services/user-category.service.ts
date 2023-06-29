import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userCategory } from '../models/userCategory';
import { DtoUserCategorySummary } from '../models/dtoUserCategorySummary';


@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {

  RutaServidor : string = "http://localhost:8080/api";
  Recurso: string ="userCategories";
  
  constructor(private Http:HttpClient) { }

  getUserCategories(){
    return this.Http.get<userCategory[]>(this.RutaServidor+"/"+this.Recurso)
  }

  getUserCategory(id:number){
    return this.Http.get<userCategory>(this.RutaServidor+"/"+this.Recurso+ "/" + id.toString());
  }

  insertUserCategory(userCat:userCategory){
    return this.Http.post<userCategory>(this.RutaServidor+"/"+this.Recurso+"/"+userCat.idUser.toString()+"/"+
    userCat.idCategory.toString(),userCat);
  }
  
  deleteUserCategory(id: number) {
    return this.Http.delete(this.RutaServidor +"/"+this.Recurso + "/" + id.toString());
  }

  deleteUserCategoryByUser(id: number) {
    return this.Http.delete(this.RutaServidor +"/"+this.Recurso + "/user/" + id.toString());
  }

  getUserCategoriesDTO(idUser: number){
    return this.Http.get<DtoUserCategorySummary[]>(this.RutaServidor+"/"+this.Recurso+"/summary/"+idUser.toString());
  }

}