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
  id!:number;

  constructor(private formBuilder:FormBuilder, private socialEventsService:SocialEventsService,
    private datesocialeventsService:DatesocialeventsService, private zoneeventsService:ZoneeventsService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar){}

  ngOnInit(){
      this.reactiveForm3();
  }
  
  //REACTIVE FORM PARA CREAR LOS DETALLES DEL EVENTO

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
        id:[""],
        nameDetail:[""],
        imageDetail:[""],
        locationDetail:[""],
        descriptionDetail:[""],
    });
    
    this.id = this.activatedRouter.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.EsInsertar = false;
      this.socialEventsService.getSocialEvent(this.id).subscribe({
        next: (data:SocialEvent) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("nameDetail")?.setValue(data.name);
          this.myForm.get("imageDetail")?.setValue(data.image);
          this.myForm.get("locationDetail")?.setValue(data.location);       
          this.myForm.get("descriptionDetail")?.setValue(data.description);       
        },
        error: (err) => {
          console.log(err);
        }
      });

    } else {
      this.id = 0;
      this.EsInsertar = true;
    }
   
  }

  //REACTIVE FORM PARA CREAR LAS FECHAS DEL EVENTO

  reactiveForm2():void {
    this.myForm = this.formBuilder.group({  
        id:[""],
        idSEDate:["",[Validators.maxLength(60)]],
        dateDate:["",[Validators.maxLength(50)]],
        startDate:[""],
        endDate:[""]
    }
    );
    this.id = this.activatedRouter.snapshot.params["id"];
      if (this.id!=0 && this.id!=undefined) {
        this.EsInsertar = false;
        this.datesocialeventsService.getDateSocialEvent(this.id).subscribe({
          next: (data:DateSocialEvent) => { 
            this.myForm.get("id")?.setValue(data.id);
            this.myForm.get("idSEDate")?.setValue(data.idSocialEvent);
            this.myForm.get("dateDate")?.setValue(data.date);
            this.myForm.get("startDate")?.setValue(data.startTime);
            this.myForm.get("endDate")?.setValue(data.endTime);       
          },
          error: (err) => {
            console.log(err);
          }
        });

      } else {
        this.id = 0;
        this.EsInsertar = true;
      }
  }
 
  //REACTIVE FORM PARA CREAR LAS ZONAS DEL EVENTO

  reactiveForm3():void {
    this.myForm = this.formBuilder.group({  
        id:[""],
        nameZone:["",[Validators.maxLength(60)]],
        priceZone:["",[Validators.maxLength(50)]],
        idDateSocialEvent:[""],
        capacityZone:[""]
    }
    );
    this.id = this.activatedRouter.snapshot.params["id"];
      if (this.id!=0 && this.id!=undefined) {
        this.EsInsertar = false;
        this.zoneeventsService.getZoneEvent(this.id).subscribe({
          next: (data:ZoneEvent) => { 
            this.myForm.get("id")?.setValue(data.id);
            this.myForm.get("nameZone")?.setValue(data.name);
            this.myForm.get("priceZone")?.setValue(data.price);
            this.myForm.get("idDateSocialEvent")?.setValue(data.idDateSocialEvent);
            this.myForm.get("capacityZone")?.setValue(data.capacity);       
          },
          error: (err) => {
            console.log(err);
          }
        });

      } else {
        this.id = 0;
        this.EsInsertar = true;
      }
  }

  //GUARDAR DETALLES DE EVENTO SOCIAL

  //GUARDAR DETALLES DE EVENTO SOCIAL
  //GUARDAR DETALLES DE EVENTO SOCIAL

  saveSocialEvent():void {

    const socialEvent:SocialEvent = {
      id: parseInt(this.myForm.get("id")!.value),
      name: this.myForm.get("nameDetail")!.value,
      image: this.myForm.get("imageDetail")!.value,
      location: this.myForm.get("locationDetail")!.value,
      description: this.myForm.get("descriptionDetail")!.value,
      idCategory:1,
      idOrganizer:1
    }

    //Si EsInsertar entonces 
    if (this.EsInsertar) {
        //this.empleadoService.addEmpleado(empleado);
        this.socialEventsService.addSocialEvent(socialEvent).subscribe({
          next: (data)  => {
            this.router.navigate(["/Home"]);
            this.snackBar.open("El evento se registró correctamente","OK",{duration:3000});
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
      //Hacer el codigo de actualizar
    }
  }

  volverHome():void {
    this.router.navigate(["/Home"]);
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

  displayedColumns2: string[] = ['dateDate', 'actions'];
  dataSource2 = new MatTableDataSource<Date>();

  agregarFecha(){
    this.NumberZone.push(
      {
        id: this.idNumberZone,
        name: this.myForm.get("nameZone")!.value,
        price: parseInt(this.myForm.get("priceZone")!.value),
        idDateSocialEvent: parseInt(this.myForm.get("idDateSocialEvent")!.value),
        capacity: parseInt(this.myForm.get("capacityZone")!.value)
      }
    );
    this.cargarZonas();
    this.idNumberZone++;
    console.log(this.NumberZone);
  }

  cargarFecha(): void{
    this.dataSource2=new MatTableDataSource(this.events);
    console.log(this.events);
  }
  
  deleteFecha(id: number):void {
    this.events.splice(id,1);
    this.cargarFecha();
    console.log(this.events);
  }


  saveDateSocialEvent():void {

    for(let i:number=0;i<this.events.length;i++){
      const dateSocialEvent:DateSocialEvent = {
        id: parseInt(this.myForm.get("id")!.value),
        idSocialEvent: parseInt(this.myForm.get("idSEDate")!.value),
        date: this.events[i],
        startTime: this.myForm.get("startDate")!.value,
        endTime: this.myForm.get("endDate")!.value
      }
  
      //Si EsInsertar entonces 
  
      if (this.EsInsertar) {
        this.datesocialeventsService.addDateSocialEvent(dateSocialEvent).subscribe({
          next: (data)  => {
            this.router.navigate(["/Home"]);
            this.snackBar.open("La fecha del evento se registró correctamente","OK",{duration:3000});
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
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
  

  agregarZone(){
    this.NumberZone.push(
      {
        id: this.idNumberZone,
        name: this.myForm.get("nameZone")!.value,
        price: parseInt(this.myForm.get("priceZone")!.value),
        idDateSocialEvent: parseInt(this.myForm.get("idDateSocialEvent")!.value),
        capacity: parseInt(this.myForm.get("capacityZone")!.value)
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
        id: parseInt(this.myForm.get("id")!.value),
        name: this.myForm.get("nameZone")!.value,
        price: parseInt(this.myForm.get("priceZone")!.value),
        idDateSocialEvent: parseInt(this.myForm.get("idDateSocialEvent")!.value),
        capacity: parseInt(this.myForm.get("capacityZone")!.value)
      }
  
      //Si EsInsertar entonces 
  
      if (this.EsInsertar) {
        this.zoneeventsService.addZoneEvent(zoneEvent).subscribe({
          next: (data)  => {
            this.router.navigate(["/Home"]);
            this.snackBar.open("Las zonas del evento se registraron correctamente","OK",{duration:3000});
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
  }

  


} 
