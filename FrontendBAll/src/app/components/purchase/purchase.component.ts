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
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core'
import { DateSocialEvent } from 'src/app/models/datesocialevent';
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
  TheDatesEvent: DateSocialEvent[]=[];
  DatesEvent: DateSocialEvent[]=[];
  ZoneEvents: ZoneEvent[] = [];
  TheZoneEvents: ZoneEvent[] = [];
  idZoneEvent!:number;
  idUser:number = this.activatedRoute.snapshot.params['id'];
  endPurchase: Purchase[]=[];
  
  constructor(private formBuilder:FormBuilder,private zoneeventservice: ZoneeventsService, private activatedRoute: ActivatedRoute, 
    private socialEventsService: SocialEventsService, private datesocialeventsService:DatesocialeventsService
    , private router:Router, private purchasesService:PurchasesService,private snackBar:MatSnackBar,
    private ticketsService:TicketsService, private userServiceService:UserServiceService) {

  }
  id!: number;
  total!:number;
  totaltickets!:number;

  ngOnInit() {
    this.reactiveForm();

    this.id = this.activatedRoute.snapshot.params["id"];
    this.socialEventsService.getSocialEvent(this.id).subscribe(
      (socialEvent: SocialEvent) => 
      { this.TheEvent = socialEvent;});

    
    this.ListDatesEvents();
    this.ListTickets();
  }
  



  reactiveForm():void {
    
    this.addPurchaseForm = this.formBuilder.group({
        id:[""],
        cant:["",[Validators.required]],
    });

    this.addTicketForm = this.formBuilder.group({
      id:[""],
  });
  }

  getIdZone(id:number):void{
    this.idZoneEvent=id;
    console.log(this.idZoneEvent);
  }

  getTotal(total:string):void{
    this.totaltickets=parseInt(total);
    this.total=this.totaltickets*this.TheZoneEvents[this.idZoneEvent-1].price;
    console.log(this.total);
  }

  UpdateTotal():void{
    this.total=this.totaltickets*this.TheZoneEvents[this.idZoneEvent-1].price;
  }

  savePurchase():void {
    const purchase:Purchase = {
      id:parseInt(this.addPurchaseForm.get("id")!.value),
      idUser: this.idUser,
      idCard: 1, 
    }


    this.purchasesService.addPurchase(purchase).subscribe({
      
      next: (data)  => {
        this.router.navigate(["home/" + this.id]);
        this.snackBar.open("La compra se ingresó correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ListTickets():void{
    this.purchasesService.getPurchases().subscribe(
      (date:Purchase[])=>
      {
        this.endPurchase=date;
      }
    )
  }

  

  saveTickets():void {
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
    this.router.navigate(["pay/" + this.id]);
  }
  
  ListZoneEvent(id:number): void{
    this.TheZoneEvents=[];
    this.zoneeventservice.getZoneEvents().subscribe(
      (date:ZoneEvent[])=>
      {
        this.ZoneEvents=date;
              for(let i=0;i<this.ZoneEvents.length;i++){
                if(this.ZoneEvents[i].idDateSocialEvent==id){
                  this.TheZoneEvents.push(this.ZoneEvents[i]);
                }
              };
      }
    )
  }
  cants: string[] = ["1","2","3","4"];
  
}

