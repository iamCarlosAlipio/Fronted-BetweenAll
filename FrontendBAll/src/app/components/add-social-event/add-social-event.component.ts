import { ZoneEvent } from './../../models/zoneevent';
import { ZoneeventsService } from './../../services/zoneevents.service';
import { Component } from '@angular/core';
import { SocialEvent } from 'src/app/models/socialevent';
import { SocialEventsService } from 'src/app/services/social-events.service';
import { DateSocialEvent } from 'src/app/models/datesocialevent';
import { DatesocialeventsService } from 'src/app/services/datesocialevents.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { identity } from 'rxjs';


@Component({
  selector: 'app-add-social-event',
  templateUrl: './add-social-event.component.html',
  styleUrls: ['./add-social-event.component.css']
})

export class AddSocialEventComponent {
  EsInsertar: boolean = true;
  myForm!:FormGroup;
  myForm2!:FormGroup;
  myForm3!:FormGroup;
  id!:number;

  constructor(private formBuilder:FormBuilder, private socialEventsService:SocialEventsService,
    private datesocialeventsService:DatesocialeventsService, private zoneeventsService:ZoneeventsService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar){}

  ngOnInit(){
      this.reactiveForm();
      this.reactiveForm2();
      this.reactiveForm3();
  }
  
  //REACTIVE FORM PARA CREAR LOS DETALLES DEL EVENTO

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
        nameDetail:[""],
        imageDetail:[""],
        locationDetail:[""],
        descriptionDetail:[""],
    });
    
    this.id = this.activatedRouter.snapshot.params["id"];   
  }

  //REACTIVE FORM PARA CREAR LAS FECHAS DEL EVENTO

  reactiveForm2():void {
    this.myForm2 = this.formBuilder.group({  
        //dateDate:["",[Validators.maxLength(50)]],
        startDate:[""],
        endDate:[""]
    }
    );
    this.id = this.activatedRouter.snapshot.params["id"];
     
  }
 
  //REACTIVE FORM PARA CREAR LAS ZONAS DEL EVENTO

  reactiveForm3():void {
    this.myForm3 = this.formBuilder.group({  
        id:[""],
        nameZone:["",[Validators.maxLength(60)]],
        priceZone:["",[Validators.maxLength(50)]],
        idDateSocialEvent:[""],
        capacityZone:[""]
    }
    );

  }

  //GUARDAR DETALLES DE EVENTO SOCIAL
  //GUARDAR DETALLES DE EVENTO SOCIAL
  //GUARDAR DETALLES DE EVENTO SOCIAL

  saveSocialEvent():void {

    const socialEvent:SocialEvent = {
      id: 0,
      name: this.myForm.get("nameDetail")!.value,
      image: this.myForm.get("imageDetail")!.value,
      location: this.myForm.get("locationDetail")!.value,
      description: this.myForm.get("descriptionDetail")!.value,
      idCategory:1,
      idOrganizer:1
    }

    this.socialEventsService.addSocialEvent(socialEvent).subscribe({
      next: (data)  => {
        this.router.navigate(["/home/"+this.id]);
        this.snackBar.open("El evento se registró correctamente","OK",{duration:3000});
        console.log("evento guardado");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  volverHome():void {
    this.router.navigate(["/home/"+this.id]);
  }

  //GUARDAR FECHAS DE EVENTO
  //GUARDAR FECHAS DE EVENTO
  //GUARDAR FECHAS DE EVENTO
  
  events: Date[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    if (date instanceof Date) {
      this.events.push(date);
    }
    this.cargarFecha();
  }

  displayedColumns2: string[] = ['dDate', 'actions'];
  dataSource2 = new MatTableDataSource<Date>();
  
  cargarFecha(): void{
    this.dataSource2=new MatTableDataSource(this.events);
  }
  
  deleteFecha(id: number):void {
    this.events.splice(id,1);
    this.cargarFecha();
  }


  saveDateSocialEvent():void {
    console.log("entro a la funciona save date");
    for(let i:number=0;i<this.events.length;i++){
      const dateSocialEvent:DateSocialEvent = {
        //id: parseInt(this.myForm2.get("id")!.value),
        id:0,
        //idSocialEvent: parseInt(this.myForm2.get("idSEDate")!.value),
        idSocialEvent:1,
        date: this.events[i],
        starTime: this.myForm2.get("startDate")!.value,
        endTime: this.myForm2.get("endDate")!.value,
      }
  
      console.log("ejecuto el for de date");
      console.log(dateSocialEvent);
      this.datesocialeventsService.addDateSocialEvent(dateSocialEvent).subscribe({
        next: (data)  => {
          console.log("fecha creada");
          this.router.navigate(["/home/"+this.id]);
          this.snackBar.open("La fecha del evento se registró correctamente","OK",{duration:3000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  //GUARDAR ZONAS DE EVENTO
  //GUARDAR ZONAS DE EVENTO
  //GUARDAR ZONAS DE EVENTO

  //TABLA DE ZONAS
  displayedColumns: string[] = ['nameZone', 'priceZone', 'capacityZone','actions'];
  NumberZone: ZoneEvent[]=[];
  dataSource = new MatTableDataSource<ZoneEvent>();

  idNumberZone:number=0;
  myFormZone!:FormGroup;
  agregarZone(){
    this.NumberZone.push(
      {
        id: this.idNumberZone,
        name: this.myForm3.get("nameZone")!.value,
        price: parseInt(this.myForm3.get("priceZone")!.value),
        idDateSocialEvent: parseInt(this.myForm3.get("idDateSocialEvent")!.value),
        capacity: parseInt(this.myForm3.get("capacityZone")!.value)
      }
    );  
    this.cargarZonas();
    this.idNumberZone++;
    console.log(this.NumberZone);
  }

  cargarZonas(): void{
    this.dataSource=new MatTableDataSource(this.NumberZone);
    console.log(this.dataSource.data);
  }
  
  deleteZone(id: number):void {
    this.NumberZone.splice(id,1);
    this.cargarZonas();
    console.log(this.NumberZone);
  }

  saveZoneEvent():void {

    for(let i:number=0;i<this.events.length;i++){
      const zoneEvent:ZoneEvent = {
        id: parseInt(this.myForm3.get("id")!.value),
        name: this.myForm3.get("nameZone")!.value,
        price: parseInt(this.myForm3.get("priceZone")!.value),
        idDateSocialEvent: parseInt(this.myForm3.get("idDateSocialEvent")!.value),
        capacity: parseInt(this.myForm3.get("capacityZone")!.value)
      }
  
      this.zoneeventsService.addZoneEvent(zoneEvent).subscribe({
        next: (data)  => {
          this.router.navigate(["/home/"+this.id]);
          this.snackBar.open("Las zonas del evento se registraron correctamente","OK",{duration:3000});
          console.log("zona creada");
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  


} 
