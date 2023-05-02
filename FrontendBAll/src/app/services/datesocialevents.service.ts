import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DateSocialEvent } from '../models/datesocialevent';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatesocialeventsService {

  RutaServidor : string = "http://localhost:3000";
  Recurso: string ="datesocialevents";
  
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<Date[]>(this.RutaServidor+ "/" + this.Recurso);}
    
  getDateSocialEvents(){
    return this.http.get<DateSocialEvent[]>(this.RutaServidor+"/"+this.Recurso);
  }
  
  getDateSocialEventF(): Observable<DateSocialEvent>{
    return this.http.get<DateSocialEvent[]>(this.RutaServidor+"/"+this.Recurso).pipe(map(datesocialevents=>datesocialevents[datesocialevents.length-1]));
  }

  getDateSocialEvent(id:number){
      return this.http.get<DateSocialEvent>(this.RutaServidor+"/"+this.Recurso+"/"+id.toString());
  }

  addDateSocialEvent(datesocialevent:DateSocialEvent){
    return this.http.post<DateSocialEvent>(this.RutaServidor+"/"+this.Recurso,datesocialevent);
  }
}