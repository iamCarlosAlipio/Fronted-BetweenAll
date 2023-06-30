import { CategoryService } from './../../services/category.service';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-edit-groups',
  templateUrl: './add-edit-groups.component.html',
  styleUrls: ['./add-edit-groups.component.css']
})
export class AddEditGroupsComponent {
  IsInsert: boolean = true;
  myForm!:FormGroup;
  id!:number;
  idGroup!:number;

  categories!: Category[];
  idcategory!:number;

  constructor(private formBuilder:FormBuilder, private groupService:GroupsService, private categoryService: CategoryService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private snackBar:MatSnackBar){}

  ngOnInit(){
      this.id = this.activatedRouter.snapshot.params["id"];
      this.idGroup = this.activatedRouter.snapshot.params["idGroup"];
      this.reactiveForm();
      this.loadCatergories();
  }

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
        id:[""],
        name:["",[Validators.required, Validators.maxLength(60)]],
        description:["",[Validators.required, Validators.maxLength(200)]],
        category:["",[Validators.required]],
        image:["",[Validators.required]]
    });


    if (this.idGroup!=0 && this.idGroup!=undefined) {
      this.IsInsert = false;
      this.groupService.getGroup(this.idGroup).subscribe({
        next: (data:Group) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("name")?.setValue(data.name);
          this.myForm.get("description")?.setValue(data.description);
          this.myForm.get("category")?.setValue(""); //Como hago para obtener el category y mostrarlo en caso de update
          this.myForm.get("image")?.setValue(data.image);
        },
        error: (err) => {
          console.log(err);
        }
      });

    } else {
      this.idGroup = 0;
      this.IsInsert = true;
    }

  }

  saveGroup():void {

    const group:Group = {
      id: parseInt(this.myForm.get("id")!.value),
      name: this.myForm.get("name")!.value,
      description: this.myForm.get("description")!.value,
      image: this.myForm.get("image")!.value
    }

    console.log(this.id);
    console.log(group);

    if (this.IsInsert) {
        this.groupService.addGroup(group, this.id,parseInt(this.myForm.get("category")!.value)).subscribe({
          next: (data)  => {
            //this.router.navigate(["/home"]);
            this.snackBar.open("El grupo se ingresó correctamente","OK",{duration:3000});
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
      this.groupService.updateGroup(group, this.id, parseInt(this.myForm.get("category")!.value), this.idGroup).subscribe({
        next: (data)  => {
          //this.router.navigate(["/groups"]);
          this.snackBar.open("El grupo se actualizó correctamente","OK",{duration:3000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }

  backGroups():void {
    this.router.navigate(["/groups/"+this.id]);
  }

  loadCatergories(): void {

    this.categoryService.getCartegories().subscribe(
      (data: Category[]) => {
        this.categories = data;
    });
  }


}
