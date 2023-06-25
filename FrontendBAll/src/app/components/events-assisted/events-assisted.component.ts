import { DtoEventsAssistedSumary } from './../../models/dtoEventsAssistedSummary';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import{ ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SocialEvent } from 'src/app/models/socialevent';
import { SocialEventsService } from 'src/app/services/social-events.service';

@Component({
  selector: 'app-events-assisted',
  templateUrl: './events-assisted.component.html',
  styleUrls: ['./events-assisted.component.css']
})
export class EventsAssistedComponent {
  dataSource = new MatTableDataSource<DtoEventsAssistedSumary>();
  dataSource2 = new MatTableDataSource<SocialEvent>();

  displayedColumns: string[]=["eventName", "eventDate", "eventZone", "userName"];
  displayedColumns2: string[]=["name", "image", "location", "description"];

  @ViewChild('paginator')
  paginator!: MatPaginator;
 
  dto!: DtoEventsAssistedSumary[];
  idUser!: number;


  constructor(private purchaseService: PurchasesService, private socialEventService: SocialEventsService, private activatedRoute:ActivatedRoute) {}
  
  ngOnInit(){
    this.idUser = this.activatedRoute.snapshot.params["id"];
    this.loadEventsAssisted(this.idUser);
    this.loadEventsCreated(this.idUser);
  }

  filterGroups(event: Event) {
   let filtro = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filtro;
  }

  loadEventsAssisted(id: number): void {
    this.purchaseService.getAssistedTicketsSummary(id).subscribe({
      next: (data:DtoEventsAssistedSumary[]) => {
        
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadEventsCreated(id: number): void {
    this.socialEventService.getSocialEventCreated(id).subscribe({
      next: (data1:SocialEvent[]) => {
        
        this.dataSource2 = new MatTableDataSource(data1);
        this.dataSource2.paginator = this.paginator;

        console.log(data1);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
