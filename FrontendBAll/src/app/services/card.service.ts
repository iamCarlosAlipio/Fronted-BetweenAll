import { Card } from './../models/card';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  rutaServer: string="http://localhost:8080/api";
  recurso:string="creditCards";

  constructor(private Http:HttpClient) { }

  getCards(){
    return this.Http.get<Card[]>(this.rutaServer+"/"+this.recurso)
  }

  getCardUser(id:number){
    return this.Http.get<Card>(this.rutaServer+"/"+this.recurso+ "/" + id.toString());
  }

  updateCardUser(id:number){
    return this.Http.get<Card>(this.rutaServer+"/"+this.recurso+ "/" + id.toString());
  }

  addCard(card: Card,idUser:number){
    return this.Http.post<Card>(this.rutaServer +"/"+this.recurso+"/"+ idUser.toString(),card);
  }

  updateCard(card: Card,idUser:number){
    return this.Http.put<Card>(this.rutaServer +"/"+this.recurso+"/"+ idUser.toString(),card);
  }
}
