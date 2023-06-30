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
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

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
  idEvent!:number;
  EventEnd!: SocialEvent;
  DateEnd!: DateSocialEvent;
  ZoneData!: ZoneEvent;
  TheDate!: DateSocialEvent;
  
  categories!:Category[];
  SocialsEvents!: SocialEvent[];
  DatesSocialsEvents!:DateSocialEvent[];
  constructor(private formBuilder:FormBuilder, private socialEventsService:SocialEventsService,
    private datesocialeventsService:DatesocialeventsService, private zoneeventsService:ZoneeventsService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar, private categoryService:CategoryService){}

  ngOnInit(){
      this.id = this.activatedRouter.snapshot.params["id"];  
      this.reactiveForm();
      this.reactiveForm2();
      this.reactiveForm3();

      this.loadCatergories();
      this.LoadSocialEvents();
     
  }
  //------------------------------------------------
  selectedTabs: boolean[] = [true, false, true]; // Inicialmente todas las pestañas están habilitadas
  matTabGroup!:MatTabGroup;
  previousTabIndex: number = 0;

  onTabChange(event: MatTabChangeEvent) {
    const selectedIndex = event.index;

    if (this.selectedTabs[selectedIndex]) {
      this.matTabGroup.selectedIndex = this.previousTabIndex;
    } else {
      if(selectedIndex==1){
        this.selectedTabs[2] = false;
        this.selectedTabs[1] = true;
        this.previousTabIndex = selectedIndex;
      }
      else{
        this.selectedTabs[selectedIndex] = true;
        //this.selectedTabs[selectedIndex+1] = true;
        this.previousTabIndex = selectedIndex;
      }
      switch (selectedIndex) {
        case 0:
          this.LoadSocialEvents();
          break;
        case 1:
          this.LoadSocialEvents();
          this.saveSocialEvent();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          console.log(this.EventEnd);
          break;
        case 2: 
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          console.log(this.EventEnd);
          this.saveDateSocialEvent();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          this.LoadSocialEvents();
          console.log(this.DateEnd);
          break;
        // Agrega más casos según el número de pestañas que tengas
        default:
          break;
      }
    
    }
  }
  //_--------------------------------------------------
  
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
        this.categories = data;});
  }

  LoadSocialEvents():void{
    this.socialEventsService.getSocialEventEnd().subscribe(
      (data: SocialEvent) => 
        {this.EventEnd = data;});
    this.datesocialeventsService.getDateSocialEventEnd().subscribe(
      (data: DateSocialEvent) => 
        {this.DateEnd = data;});
  }

 
  //GUARDAR DETALLES DE EVENTO SOCIAL
  //GUARDAR DETALLES DE EVENTO SOCIAL
  //GUARDAR DETALLES DE EVENTO SOCIAL

  saveSocialEvent():void {
    //this.LoadSocialEvents();
    let eventData:number;
    const socialEvent:SocialEvent = {
      id: 0,
      name: this.myForm.get("nameDetail")!.value,
      image: this.myForm.get("imageDetail")!.value,
      location: this.myForm.get("locationDetail")!.value,
      description: this.myForm.get("descriptionDetail")!.value,
      idCategory:this.myForm.get("category")!.value,
      idOrganizer: this.id
    }

    this.socialEventsService.addSocialEvent(socialEvent,socialEvent.idCategory,socialEvent.idOrganizer).subscribe({
      next: (data)  => {
        this.snackBar.open("Ahora cree las fechas para su evento","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
        console.log("no llega");
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
        idSocialEvent: this.EventEnd.id,
        date: this.events[i],
        starTime: this.myForm2.get("startDate")!.value,
        endTime: this.myForm2.get("endDate")!.value,
      }
      
      this.datesocialeventsService.addDateSocialEvent(dateSocialEvent,dateSocialEvent.idSocialEvent).subscribe({
        next: (data)  => {
          this.snackBar.open("La fecha del evento se registró correctamente","OK",{duration:3000});

        },
        error: (err) => {
          console.log(err);
        }
      });
    }
 


    //console.log("el ultimo fecha es: "+this.TheDate.id);
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
        idDateSocialEvent: this.DateEnd.id,
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
    this.LoadSocialEvents();
    for(let i:number=0;i<this.events.length;i++){
      for(let j:number=0;i<this.NumberZone.length;i++){
        const zoneEvent:ZoneEvent = {
          id: 0,
          name: this.NumberZone[j].name,
          price: this.NumberZone[j].price,
          idDateSocialEvent:this.DateEnd.id+i,
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
