import { UserCategoryService } from 'src/app/services/user-category.service';
import { userCategory } from 'src/app/models/userCategory';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { DtoUserCategorySummary } from 'src/app/models/dtoUserCategorySummary';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent {

  
  editUserForm1!:FormGroup;
  insert:boolean=true;
  categories!:Category[];
  auxUsers!:User[];
  idUser:number=this.activated.snapshot.params['id'];
  displayedColumns: string[]=['nameCategory'];
  dtoUserCategories!:DtoUserCategorySummary[];
  dataSource = new MatTableDataSource<DtoUserCategorySummary>();
  auxUser!:User;

  constructor(private FormBuilder:FormBuilder, private userService:UserServiceService, 
    private router: Router, private stardRouter: ActivatedRoute,private categoryService:CategoryService,
    private userCategoryService:UserCategoryService,private snack: MatSnackBar,private activated: ActivatedRoute){}
    
    ngOnInit():void{
      this.loadCatergories();
      this.reactiveForm();
      this.loadTable();
    }
    reactiveForm():void {
      this.editUserForm1 = this.FormBuilder.group({
          id:[""],
          name:["",[Validators.required]],
          lastname:["",[Validators.required]],
          email:["",[Validators.required]],
          password:["",[Validators.required]],
          typeDocument:["",[Validators.required]],
          numberDocument:["",[Validators.required]],
          phone:["",[Validators.required]],
          city:["",[Validators.required]],
          category:["",[Validators.required]],
          image:["",[Validators.required]]
      });

      this.userService.getUser(this.idUser).subscribe({
        next: (data:User) => {
          this.auxUser=data;
          this.editUserForm1.get("id")?.setValue(data.id);
          this.editUserForm1.get("name")?.setValue(data.name);
          this.editUserForm1.get("lastname")?.setValue(data.lastname);
          this.editUserForm1.get("email")?.setValue(data.email);
          this.editUserForm1.get("password")?.setValue(data.password);
          this.editUserForm1.get("typeDocument")?.setValue(data.typeDocument);
          this.editUserForm1.get("numberDocument")?.setValue(data.numberDocument);      
          this.editUserForm1.get("phone")?.setValue(data.phone);
          this.editUserForm1.get("city")?.setValue(data.city);
          this.editUserForm1.get('image')?.setValue(data.image);
        },
        error: (err) => {
          console.log(err);
        }
      });
  
    }

  loadCatergories(): void {
    this.categoryService.getCartegories().subscribe(
      (data: Category[]) => {
        this.categories = data;
    });
  }

  loadTable():void{
    this.userCategoryService.getUserCategoriesDTO(this.idUser).subscribe({
      next: (data)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dtoUserCategories=data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}
