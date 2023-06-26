import { Injectable } from '@angular/core';
import { SocialEvent } from '../models/socialevent';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class SocialEventsService {

  RutaServidor : string = "http://localhost:8080/api";
  Recurso: string ="socialEvents";
  
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<SocialEvent[]>(this.RutaServidor+ "/" + this.Recurso);}
    
  getSocialEvents(){
    return this.http.get<SocialEvent[]>(this.RutaServidor+"/"+this.Recurso);
  }
  
  getSocialEventEnd(): Observable<SocialEvent>{
    return this.http.get<SocialEvent[]>(this.RutaServidor+"/"+this.Recurso).pipe(map(socialevents=>socialevents[socialevents.length-1]));
  }

  getSocialEvent(id:number){
      return this.http.get<SocialEvent>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString());
  }
  
  addSocialEvent(socialevent:SocialEvent,idCategory:number,idUser:number){
    return this.http.post<SocialEvent>(this.RutaServidor+"/"+this.Recurso+"/"+idCategory.toString()+"/"+idUser.toString(),socialevent);
  }

  getSocialEventCreated(id:number){
    return this.http.get<SocialEvent[]>(this.RutaServidor+"/"+this.Recurso+"/created/"+id.toString());
  }

}
