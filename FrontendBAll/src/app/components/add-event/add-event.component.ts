import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import { Event } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})

export class AddEventComponent {
  EsInsertar: boolean = true;
  myForm!:FormGroup;
  id!:number;

  constructor(private formBuilder:FormBuilder, private eventsService:EventsService, 
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar){}

  ngOnInit(){
      this.reactiveForm();
  }

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
        id:[""],
        name:["",[Validators.required, Validators.maxLength(60)]],
        image:["",[Validators.required]],
        idOrganizer:["",[Validators.required]],
        idCategory:["",[Validators.required]],
        location:["",[Validators.required]],
        description:["",[Validators.required]],
        state:["",[Validators.required]]
    });

    //Obtener el Id que esta llegando por la ruta del browser en casos de Editar
    // Si (id = a  un numero ) entonces debo cargar los datos de ese empleado para editarlos y cambiar el EsInsertar a falso
    // sino 

    this.id = this.activatedRouter.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.EsInsertar = false;
      this.eventsService.getEvent(this.id).subscribe({
        next: (data:Event) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("name")?.setValue(data.name);
          this.myForm.get("image")?.setValue(data.image);
          this.myForm.get("idOrganizer")?.setValue(data.idOrganizer);       
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

  saveEmpleado():void {

    const empleado:Event = {
      id: parseInt(this.myForm.get("id")!.value),
      nombre: this.myForm.get("name")!.value,
      puesto: this.myForm.get("puesto")!.value,
      sueldo: parseFloat(this.myForm.get("sueldo")!.value)  
    }

    //Si EsInsertar entonces 
    if (this.EsInsertar) {
        //this.empleadoService.addEmpleado(empleado);
        this.eventsService.addEvent(event).subscribe({
          next: (data)  => {
            this.router.navigate(["/home"]);
            this.snackBar.open("El empleado se ingresó correctamente","OK",{duration:3000});
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
      //Hacer el codigo de actualizar
      this.eventsService.updateEvent(event).subscribe({
        next: (data)  => {
          this.router.navigate(["/home"]);
          this.snackBar.open("El empleado se actualizó correctamente","OK",{duration:3000});
        },
        error: (err) => {
          console.log(err);
        }
      });




    }

  }

  volverHome():void {
    this.router.navigate(["/home"]);
  }
}