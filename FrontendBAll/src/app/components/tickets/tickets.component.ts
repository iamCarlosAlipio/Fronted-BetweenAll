import { ZoneEvent } from './../../models/zoneevent';
import { TicketsService } from './../../services/tickets.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GroupsService } from 'src/app/services/groups.service';
import { MatPaginator } from '@angular/material/paginator';
import{ ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DTOTicketSummary } from 'src/app/models/dtoTicketSummary';
import { Ticket } from 'src/app/models/ticket';
import {DateSocialEvent} from 'src/app/models/datesocialevent'
import { PurchasesService } from 'src/app/services/purchases.service';
import { SocialEventsService } from 'src/app/services/social-events.service';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {

  dataSource = new MatTableDataSource<DTOTicketSummary>();
  //dataSource2 = new MatTableDataSource<Ticket>();

  displayedColumns: string[]=["idTicket","nameUser", "nameSocialEvent", "nameZoneEvent", "dateSocialEvent","locationSocialEvent","emailUser","amountPurchase"];
  //displayedColumns2: string[]=["name", "image", "location", "description"];

  @ViewChild('paginator')
  paginator!: MatPaginator;

  dto!: DTOTicketSummary[];
  idUser!: number;

  constructor(private ticketService:TicketsService, private activatedRoute:ActivatedRoute){

  }
  
  tickets!: Ticket[];
  
  ngOnInit(){
    this.idUser = this.activatedRoute.snapshot.params["id"];
    this.loadTicketsByUser(this.idUser);
  }
  filterGroups(event: Event) {
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
   }
   
  loadTicketsByUser(id: number): void {
    this.ticketService.getTicketByUserSummary(id).subscribe({
      next: (data:DTOTicketSummary[]) => {
        
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
