import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Purchase } from '../models/purchase';
import { DtoEventsAssistedSumary } from '../models/dtoEventsAssistedSummary';
@Injectable({
  providedIn: 'root'
})

export class PurchasesService {

  RutaServidor : string = "http://localhost:8080/api";
  Recurso: string ="purchases";
  RecursoUsuario: string="users";
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<Purchase[]>(this.RutaServidor+ "/" + this.Recurso);}
    
  getPurchases(){
    return this.http.get<Purchase[]>(this.RutaServidor+"/"+this.Recurso);
  }
  
  getPurchase(id:number){
      return this.http.get<Purchase>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString());
  }
  
  getSocialEventPurchase(id:number,idUser:number){
    return this.http.get<Purchase>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString()+"/"+this.RecursoUsuario+"/"+idUser.toString());
}

  addPurchase(purchase:Purchase,idUser:number,idCard:number){
    return this.http.post<Purchase>(this.RutaServidor+"/"+this.Recurso+"/"+idUser.toString()+"/"+idCard.toString(),purchase);
  }

  getAssistedTicketsSummary(id: number){
    return this.http.get<DtoEventsAssistedSumary[]>(this.RutaServidor+"/"+this.Recurso+"/summary/"+id.toString());
  }
}
