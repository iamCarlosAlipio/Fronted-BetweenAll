import { Evento } from './../models/evento';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  
  RutaServidor : string = "http://localhost:3000";
  Recurso: string ="eventos";
  
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<Evento[]>(this.RutaServidor+ "/" + this.Recurso);
  }
}
