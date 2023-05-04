import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Purchase } from '../models/purchase';
@Injectable({
  providedIn: 'root'
})

export class PurchasesService {

  RutaServidor : string = "http://localhost:3000";
  Recurso: string ="purchases";
  
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<Purchase[]>(this.RutaServidor+ "/" + this.Recurso);}
    
  getSocialEvents(){
    return this.http.get<Purchase[]>(this.RutaServidor+"/"+this.Recurso);
  }
  
  getSocialEvent(id:number){
      return this.http.get<Purchase>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString());
  }
  
  addSocialEvent(purchase:Purchase){
    return this.http.post<Purchase>(this.RutaServidor+"/"+this.Recurso,purchase);
  }
}
