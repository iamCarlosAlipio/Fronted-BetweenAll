import { HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userCategory } from '../models/userCategory';

@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {

  RutaServidor : string = "http://localhost:3000";
  Recurso: string ="userCategory";
  
  constructor(private http:HttpBackend) { }

}
