import { EventoService } from './../../services/evento.service';
import { Evento } from './../../models/evento';
import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild} from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  events: Evento[] = [];
  constructor(private eventoService: EventoService){

  }
  
  ngOnInit(){
    this.ListaEventos();
  }

  ListaEventos():void{
    this.eventoService.getList().subscribe({
      next: (data:Evento[]) => {
        this.events=data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
