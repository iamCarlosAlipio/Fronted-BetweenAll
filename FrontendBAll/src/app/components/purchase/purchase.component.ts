import { DatesocialeventsService } from './../../services/datesocialevents.service';
import { SocialEvent } from 'src/app/models/socialevent';
import { SocialEventsService } from './../../services/social-events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneeventsService } from './../../services/zoneevents.service';
import { ZoneEvent } from './../../models/zoneevent';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core'
import { DateSocialEvent } from 'src/app/models/datesocialevent';
import { Q } from '@angular/cdk/keycodes';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})

export class PurchaseComponent {

  TheEvent!: SocialEvent;
  TheDatesEvent: DateSocialEvent[]=[];
  DatesEvent: DateSocialEvent[]=[];
  TheZoneEvents: ZoneEvent[] = [];
  ZoneEvents: ZoneEvent[] = [];
  selectedDate!: Date;
  idUser:number = this.activatedRoute.snapshot.params['id'];
  constructor(private zoneeventservice: ZoneeventsService, private activatedRoute: ActivatedRoute, 
    private socialEventsService: SocialEventsService, private datesocialeventsService:DatesocialeventsService
    , private router:Router) {

  }
  id!: number;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.socialEventsService.getSocialEvent(this.id).subscribe(
      (socialEvent: SocialEvent) => 
      { this.TheEvent = socialEvent;});
    
    this.onDateSelected();

    this.ListDatesEvents();

  }
  
  onDateSelected() {
    console.log(this.selectedDate);
    // Aquí puedes realizar alguna acción con el valor seleccionado
  }

  ListDatesEvents(): void {
    this.datesocialeventsService.getDateSocialEvents().subscribe(
      (date:DateSocialEvent[])=>
      {
        this.DatesEvent=date;
              for(let i=0;i<this.DatesEvent.length;i++){
                if(this.DatesEvent[i].idSocialEvent==this.id){
                  this.TheDatesEvent.push(this.DatesEvent[i]);
                }
              };
        console.log(this.TheDatesEvent);
    });
  }

  ListZoneEvents(id:number): void{
    this.zoneeventservice.getZoneEvents().subscribe(
      (date:ZoneEvent[])=>
      {
        this.ZoneEvents=date.filter(x=>x.idDateSocialEvent==id);
      }
    )
  }
  
  changePay():void{
    this.router.navigate(["pay/" + this.idUser]);
  }
  

}

