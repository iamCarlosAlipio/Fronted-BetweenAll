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

  TheEvent!: SocialEvent;
  TheTicket!: Ticket;
  DatesEvent!: DateSocialEvent[];
  ZoneEvents!: ZoneEvent[];
  idUser:number = this.activatedRoute.snapshot.params['idUser'];
  idEvent:number = this.activatedRoute.snapshot.params["idEvent"];
  endPurchase!: Purchase;
  idSelectDate!:number;

  TicketBool:Boolean=true;
  PurchaseBool:Boolean=false;

  constructor(private formBuilder:FormBuilder,private zoneeventservice: ZoneeventsService, private activatedRoute: ActivatedRoute, 
    private socialEventsService: SocialEventsService, private datesocialeventsService:DatesocialeventsService
    , private router:Router, private purchasesService:PurchasesService,private snackBar:MatSnackBar,
    private ticketsService:TicketsService, private userServiceService:UserServiceService) {

  }
  total:number=0;
  price:number=0;
  id:number=0;
  idPurchase:number=0;
  totalprice!:number;

  ngOnInit() {
    this.reactiveForm();
    console.log(this.idUser);
    console.log(this.idEvent);
    this.ListDatesEvents();
    this.ListDatesEvents();
  }
  
  reactiveForm():void {
    
    this.addPurchaseForm = this.formBuilder.group({
      //quantityForm:[""],
      DateEvent:[""],
      ZoneEvent:[""],
    });

    /*this.addTicketForm = this.formBuilder.group({
      id:[""],
  });*/
  }

  /*getIdZone(id:number):void{
    this.idZoneEvent=id;
    console.log(this.idZoneEvent);
  }*/

  getTotal(cant:number):void{
    this.total= cant;
    console.log(this.total);
    this.totalprice=this.total*this.price;
  }
  getPrice(id:number):void{
    this.id=id;
    console.log(this.id);
    this.totalprice=this.total*this.price;
  }
  getZone(){
    for(let i=0;i<this.ZoneEvents.length;i++){
      if(this.ZoneEvents[i].id==this.id){
        this.price=this.ZoneEvents[i].price;
      }
    }
    console.log(this.price);
    this.totalprice=this.total*this.price;
  }

  /*UpdateTotal():void{
    this.total=this.totaltickets*this.TheZoneEvents[this.idZoneEvent-1].price;
  }*/

  savePurchase():void {
    const purchase:Purchase = {
      id:0,
      date: new Date(2023,2,2),
      quantity:this.total,
      total:this.total*this.price,
      idUser: this.idUser,
      idCard: 1, 
    }
    

    this.purchasesService.addPurchase(purchase,purchase.idUser,purchase.idCard).subscribe({
      
      next: (data)  => {
        this.snackBar.open("Genera la compra de sus tickets","OK",{duration:3000});     
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.LoadPurchase();this.LoadPurchase();this.LoadPurchase();this.LoadPurchase();
    this.LoadPurchase();this.LoadPurchase();this.LoadPurchase();this.LoadPurchase();
  

    console.log(this.endPurchase);
    this.PurchaseBool=true;
    this.TicketBool=false;
  }

  
  saveTickets():void {
    this.LoadPurchase();this.LoadPurchase();this.LoadPurchase();this.LoadPurchase();
    this.LoadPurchase();this.LoadPurchase();this.LoadPurchase();this.LoadPurchase();

    const ticket:Ticket = {
      id:0,
      idPurchase: this.endPurchase.id,
      idZoneEvent: parseInt(this.addPurchaseForm.get("ZoneEvent")!.value),
    }

    for(let i=0;i<this.total;i++){
      this.ticketsService.addTicket(ticket,ticket.idPurchase,ticket.idZoneEvent).subscribe({
      
      next: (data)  => {
        this.snackBar.open("Los tickets se regitraron correctamente ingresó correctamente","OK",{duration:3000});
        this.router.navigate(["home/" + this.idUser]);
      },
      error: (err) => {
        console.log(err);  
      }
    });
    }
    
  }
  
  LoadPurchase(){
    this.purchasesService.getPurchaseEnd().subscribe(
      (data: Purchase)=>
      {this.endPurchase=data}
    );
  }

  ListDatesEvents(): void {
    this.socialEventsService.getSocialEvent(this.idEvent).subscribe(
      (data: SocialEvent) => 
      {this.TheEvent = data;});

    this.datesocialeventsService.getDateSocialEventByEvent(this.idEvent).subscribe(
      (data: DateSocialEvent[]) => 
      { this.DatesEvent=data;

        this.zoneeventservice.getZoneEventByDate(data[0].id).subscribe(
          (data: ZoneEvent[])=>
          {this.ZoneEvents=data;})

      });  
    this.purchasesService.getPurchaseEnd().subscribe(
      (data: Purchase)=>
      {this.endPurchase=data}
    );
  }


  cants: number[] = [1,2,3,4];
  
}



