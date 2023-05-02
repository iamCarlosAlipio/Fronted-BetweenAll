import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-groups',
  templateUrl: './add-edit-groups.component.html',
  styleUrls: ['./add-edit-groups.component.css']
})
export class AddEditGroupsComponent {
  IsInsert: boolean = true;
  myForm!:FormGroup;
  id!:number;

  category: string[] = ['Teatro','Musica','Arte','Rap'];

  constructor(private formBuilder:FormBuilder, private groupService:GroupsService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar){}

  ngOnInit(){
      this.reactiveForm();
  }

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
        id:[""],
        name:["",[Validators.required, Validators.maxLength(60)]],
        amountParticipants:["",[Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        description:["",[Validators.required, , Validators.maxLength(200)]],
        category:["",[Validators.required]],
        image:["",[Validators.required]]
    });

    //Obtener el Id que esta llegando por la ruta del browser en casos de Editar
    // Si (id = a  un numero ) entonces debo cargar los datos de ese empleado para editarlos y cambiar el IsInsert a falso
    // sino

    this.id = this.activatedRouter.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.IsInsert = false;
      this.groupService.getGroup(this.id).subscribe({
        next: (data:Group) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("name")?.setValue(data.name);
          this.myForm.get("amountParticipants")?.setValue(data.amountParticipants);
          this.myForm.get("description")?.setValue(data.description);
          this.myForm.get("category")?.setValue(data.category);
          this.myForm.get("image")?.setValue(data.image);
        },
        error: (err) => {
          console.log(err);
        }
      });

    } else {
      this.id = 0;
      this.IsInsert = true;
    }

  }

  saveGroup():void {

    const group:Group = {
      id: parseInt(this.myForm.get("id")!.value),
      name: this.myForm.get("name")!.value,
      amountParticipants: this.myForm.get("amountParticipants")!.value,
      description: this.myForm.get("description")!.value,
      category: this.myForm.get("category")!.value,
      image: this.myForm.get("image")!.value
    }

    //Si IsInsert entonces
    if (this.IsInsert) {
        //this.empleadoService.addEmpleado(empleado);
        this.groupService.addGroup(group).subscribe({
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
      this.groupService.updateGroup(group).subscribe({
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

  backHome():void {
    this.router.navigate(["/home"]);
  }
}
