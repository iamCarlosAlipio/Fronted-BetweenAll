import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Ticket } from '../models/ticket';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  RutaServidor : string = "http://localhost:8080/api";
  Recurso: string ="tickets";
  RecursoUsuario: string="users";
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<Ticket[]>(this.RutaServidor+ "/" + this.Recurso);}
    
  getTickets(){
    return this.http.get<Ticket[]>(this.RutaServidor+"/"+this.Recurso);
  }
  
  getTicket(id:number){
      return this.http.get<Ticket>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString());
  }
  
  getSocialEventPurchase(id:number,idUser:number){
    return this.http.get<Ticket>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString()+"/"+this.RecursoUsuario+"/"+idUser.toString());
}

  addTicket(ticket:Ticket,idPurchase:number,idZoneEvent:number){
    return this.http.post<Ticket>(this.RutaServidor+"/"+this.Recurso+"/"+idPurchase.toString()+"/"+idZoneEvent.toString(),ticket);
  }
}
