import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ZoneEvent } from '../models/zoneevent';

@Injectable({
  providedIn: 'root'
})
export class ZoneeventsService {

  RutaServidor : string = "http://localhost:8080/api";
  Recurso: string ="zoneEvents";
  
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<ZoneEvent[]>(this.RutaServidor+ "/" + this.Recurso);}
    
  getZoneEvents(){
    return this.http.get<ZoneEvent[]>(this.RutaServidor+"/"+this.Recurso);
  }
  
  getZoneEvent(id:number){
      return this.http.get<ZoneEvent>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString());
  }
  
  addZoneEvent(zoneevent:ZoneEvent){
    return this.http.post<ZoneEvent>(this.RutaServidor+"/"+this.Recurso,zoneevent);
  }
}
