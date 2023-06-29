import { DateSocialEvent } from './../../models/datesocialevent';
  import { User } from './../../models/user';
import { UserServiceService } from './../../services/user-service.service';
import { TicketsService } from './../../services/tickets.service';
import { PurchasesService } from './../../services/purchases.service';
import { DatesocialeventsService } from './../../services/datesocialevents.service';
import { SocialEvent } from 'src/app/models/socialevent';
import { SocialEventsService } from './../../services/social-events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneeventsService } from './../../services/zoneevents.service';
import { ZoneEvent } from './../../models/zoneevent';
import { Component, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Purchase } from 'src/app/models/purchase';
import { Ticket } from 'src/app/models/ticket';
import {MatSnackBar} from '@angular/material/snack-bar';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})

export class PurchaseComponent {
  addPurchaseForm!:FormGroup;
  addTicketForm!:FormGroup;
  
  TheEvent!: SocialEvent;
  DatesEvent!: DateSocialEvent[];
  ZoneEvents!: ZoneEvent[];
  idUser:number = this.activatedRoute.snapshot.params['idUser'];
  idEvent:number = this.activatedRoute.snapshot.params["idEvent"];
  endPurchase: Purchase[]=[];
  idSelectDate!:number;
  constructor(private formBuilder:FormBuilder,private zoneeventservice: ZoneeventsService, private activatedRoute: ActivatedRoute, 
    private socialEventsService: SocialEventsService, private datesocialeventsService:DatesocialeventsService
    , private router:Router, private purchasesService:PurchasesService,private snackBar:MatSnackBar,
    private ticketsService:TicketsService, private userServiceService:UserServiceService) {

  }
  total!:number;
  totaltickets!:number;

  ngOnInit() {
    this.reactiveForm();
    console.log(this.idUser);
    console.log(this.idEvent);
    
    this.ListDatesEvents();
    /*this.ListTickets();*/
    this.ListZoneEvents();
    
  }
  
  reactiveForm():void {
    
    /*this.addPurchaseForm = this.formBuilder.group({
        quantityForm:["",[Validators.required]],
        totalForm:["",[Validators.required]],
    });*/

    /*this.addTicketForm = this.formBuilder.group({
      id:[""],
  });*/
  }

  /*getIdZone(id:number):void{
    this.idZoneEvent=id;
    console.log(this.idZoneEvent);
  }*/

  /*getTotal(total:string):void{
    this.totaltickets=parseInt(total);
    this.total=this.totaltickets*this.TheZoneEvents[this.idZoneEvent-1].price;
    console.log(this.total);
  }*/

  /*UpdateTotal():void{
    this.total=this.totaltickets*this.TheZoneEvents[this.idZoneEvent-1].price;
  }*/

  /*savePurchase():void {
    const purchase:Purchase = {
      id:0,
      date: new Date(2023,2,2),
      quantity:1,
      total:1,
      idUser: this.idUser,
      idCard: 1, 
    }


    this.purchasesService.addPurchase(purchase,purchase.idUser,purchase.idCard).subscribe({
      
      next: (data)  => {
        this.router.navigate(["home/" + this.idUser]);
        this.snackBar.open("La compra se ingresó correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    });
  }*/

  /*ListTickets():void{
    this.purchasesService.getPurchases().subscribe(
      (date:Purchase[])=>
      {
        this.endPurchase=date;
      }
    )
  }*/

  

  /*saveTickets():void {
    let idpurchase:number=0;

    for(let i=0;i<this.endPurchase.length;i++){
      if(this.endPurchase[i].id>idpurchase){
        idpurchase=this.endPurchase[i].id;
      }
    }
    console.log(this.endPurchase);

    console.log(idpurchase);
    const ticket:Ticket = {
      id:parseInt(this.addTicketForm.get("id")!.value),
      idPurchase: idpurchase+1,
      idZoneEvent: this.idZoneEvent,
    }

    for(let i=0;i<this.totaltickets;i++){
      this.ticketsService.addTicket(ticket).subscribe({
      
        next: (data)  => {
          this.snackBar.open("Los tickets se regitraron correctamente ingresó correctamente","OK",{duration:3000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    
  }*/
  
  

  ListDatesEvents(): void {
    this.socialEventsService.getSocialEvent(this.idEvent).subscribe(
      (data: SocialEvent) => 
      {this.TheEvent = data;});

    this.datesocialeventsService.getDateSocialEventByEvent(this.idEvent).subscribe(
      (data: DateSocialEvent[]) => 
      { this.DatesEvent=data;});  
      console.log(this.DatesEvent);
  }

  ListZoneEvents(): void{

    this.zoneeventservice.getZoneEventByDate(3).subscribe(
      (data: ZoneEvent[])=>
      {this.ZoneEvents=data;})
    console.log(this.ZoneEvents);
  }

  /*changePay():void{
    this.router.navigate(["pay/" + this.idUser]);
  }*/
  
  /*ListZoneEvent(id:number): void{
    for(let i=0;i<this.DatesEvent.length;i++){
      this.zoneeventservice.getZoneEventByDate(this.DatesEvent[0].id).subscribe(
        (zone:ZoneEvent[])=>
        {this.ZoneEvents=zone;});
    }
  }*/

  cants: string[] = ["1","2","3","4"];
  
}

