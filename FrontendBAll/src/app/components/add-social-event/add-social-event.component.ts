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
      this.reactiveForm();
      this.reactiveForm2();
  }
  
  //REACTIVE FORM PARA CREAR LOS DETALLES DEL EVENTO

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
        id:[""],
        name:["",[Validators.maxLength(60)]],
        image:["",[Validators.maxLength(200)]],
        location:[""],
        description:[""],
    });
    
    
    //Obtener el Id que esta llegando por la ruta del browser en casos de Editar
    // Si (id = a  un numero ) entonces debo cargar los datos de ese empleado para editarlos y cambiar el EsInsertar a falso
    // sino 

    this.id = this.activatedRouter.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.EsInsertar = false;
      this.socialEventsService.getSocialEvent(this.id).subscribe({
        next: (data:SocialEvent) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("nombre")?.setValue(data.name);
          this.myForm.get("imagen")?.setValue(data.image);
          this.myForm.get("locacion")?.setValue(data.location);       
          this.myForm.get("descripcion")?.setValue(data.description);       
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
        iddate:[""],
        idsv:["",[Validators.required, Validators.maxLength(60)]],
        datesv:["",[Validators.required, Validators.maxLength(50)]],
        inicio:["",[Validators.required]],
        fin:["",[Validators.required]]
    }
    );
    this.id = this.activatedRouter.snapshot.params["id"];
      if (this.id!=0 && this.id!=undefined) {
        this.EsInsertar = false;
        this.datesocialeventsService.getDateSocialEvent(this.id).subscribe({
          next: (data:DateSocialEvent) => { 
            this.myForm.get("iddate")?.setValue(data.id);
            this.myForm.get("idsv")?.setValue(data.idSocialEvent);
            this.myForm.get("datesv")?.setValue(data.date);
            this.myForm.get("inicio")?.setValue(data.startTime);
            this.myForm.get("fin")?.setValue(data.endTime);       
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
        idZone:[""],
        nameZone:["",[Validators.required, Validators.maxLength(60)]],
        priceZone:["",[Validators.required, Validators.maxLength(50)]],
        idDateSocialEvent:["",[Validators.required]],
        capacityZone:["",[Validators.required]]
    }
    );
    this.id = this.activatedRouter.snapshot.params["id"];
      if (this.id!=0 && this.id!=undefined) {
        this.EsInsertar = false;
        this.zoneeventsService.getZoneEvent(this.id).subscribe({
          next: (data:ZoneEvent) => { 
            this.myForm.get("idZone")?.setValue(data.id);
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
      name: this.myForm.get("name")!.value,
      image: this.myForm.get("image")!.value,
      location: this.myForm.get("location")!.value,
      description: this.myForm.get("description")!.value,
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
  }

  saveDateSocialEvent():void {

    for(let i:number=0;i<this.events.length;i++){
      const dateSocialEvent:DateSocialEvent = {
        id: parseInt(this.myForm.get("iddate")!.value),
        idSocialEvent: parseInt(this.myForm.get("idsv")!.value),
        date: this.events[i],
        startTime: this.myForm.get("inicio")!.value,
        endTime: this.myForm.get("fin")!.value
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

  saveZoneEvent():void {

    for(let i:number=0;i<this.events.length;i++){
      const zoneEvent:ZoneEvent = {
        id: parseInt(this.myForm.get("idZone")!.value),
        name: this.myForm.get("nameZone")!.value,
        price: parseInt(this.myForm.get("nameZone")!.value),
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
