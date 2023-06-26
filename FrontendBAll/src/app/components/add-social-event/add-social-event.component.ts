import { CategoryService } from './../../services/category.service';
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
import { Category } from 'src/app/models/category';

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
  categories!:Category[];
  socialevents!:SocialEvent[];
  datesocialevents!:DateSocialEvent[];
  constructor(private formBuilder:FormBuilder, private socialEventsService:SocialEventsService,
    private datesocialeventsService:DatesocialeventsService, private zoneeventsService:ZoneeventsService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar, private categoryService:CategoryService){}

  ngOnInit(){
      this.reactiveForm();
      this.reactiveForm2();
      this.reactiveForm3();
      this.loadCatergories();
      this.id = this.activatedRouter.snapshot.params["id"];  
  }
  
  //REACTIVE FORM PARA CREAR LOS DETALLES DEL EVENTO

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
        nameDetail:[""],
        imageDetail:[""],
        locationDetail:[""],
        descriptionDetail:[""],
        category:[""],
    });
     
  }

  //REACTIVE FORM PARA CREAR LAS FECHAS DEL EVENTO

  reactiveForm2():void {
    this.myForm2 = this.formBuilder.group({  
        startDate:[""],
        endDate:[""]
    }
    );  
  }
 
  //REACTIVE FORM PARA CREAR LAS ZONAS DEL EVENTO

  reactiveForm3():void {
    this.myForm3 = this.formBuilder.group({  
        nameZone:["",[Validators.maxLength(60)]],
        priceZone:["",[Validators.maxLength(50)]],
        capacityZone:[""]
    }
    );
  }
  

  loadCatergories(): void {
    
    this.categoryService.getCartegories().subscribe(
      (data: Category[]) => {
        this.categories = data;
    });
   
    /*this.socialEventsService.getSocialEvents().subscribe(
      (data: SocialEvent[])=>{
        this.socialevents=data;
        
      }
      );
    this.datesocialeventsService.getDateSocialEvents().subscribe(
      (data: DateSocialEvent[])=>{
        this.datesocialevents=data;
      });
      console.log(this.socialevents);
  */
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
      idCategory:this.myForm.get("category")!.value,
      idOrganizer: this.id
    }

    this.socialEventsService.addSocialEvent(socialEvent,socialEvent.idCategory,this.id).subscribe({
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
    
    for(let i:number=0;i<this.events.length;i++){
      const dateSocialEvent:DateSocialEvent = {
        id:0,
        idSocialEvent: this.socialEventsService.getSocialEvents.length+1,
        date: this.events[i],
        starTime: this.myForm2.get("startDate")!.value,
        endTime: this.myForm2.get("endDate")!.value,
      }
  
      this.datesocialeventsService.addDateSocialEvent(dateSocialEvent,dateSocialEvent.idSocialEvent).subscribe({
        next: (data)  => {
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
        idDateSocialEvent: 0,
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
    console.log(this.NumberZone.length);
  }
  
  deleteZone(id: number):void {
    this.NumberZone.splice(id,1);
    this.cargarZonas();
    
  }

  saveZoneEvent():void {

    for(let i:number=0;i<this.events.length;i++){
      for(let j:number=0;i<this.NumberZone.length;i++){
        const zoneEvent:ZoneEvent = {
          id: 0,
          name: this.NumberZone[j].name,
          price: this.NumberZone[j].price,
          idDateSocialEvent:this.datesocialeventsService.getDateSocialEvents.length+i+1,
          capacity: this.NumberZone[j].capacity
        }
    
        this.zoneeventsService.addZoneEvent(zoneEvent,zoneEvent.idDateSocialEvent).subscribe({
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

  


} 
