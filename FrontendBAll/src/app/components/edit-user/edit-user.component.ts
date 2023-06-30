import { UserServiceService } from './../../services/user-service.service';
import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { UserCategoryService } from 'src/app/services/user-category.service';
import { userCategory } from 'src/app/models/userCategory';
import { DtoUserCategorySummary } from 'src/app/models/dtoUserCategorySummary';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {


  editUserForm1!:FormGroup;
  insert:boolean=true;
  categories!:Category[];
  auxUsers!:User[];
  idUser:number=this.activated.snapshot.params['id'];
  displayedColumns: string[]=['nameCategory', 'action1'];
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
          name:["",[Validators.required,Validators.maxLength(10)]],
          lastname:["",[Validators.required, Validators.maxLength(7)]],
          email:["",[Validators.required, Validators.maxLength(10)]],
          password:["",[Validators.required, Validators.maxLength(10)]],
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


  saveUserCategory():void {
      
    const userCatg:userCategory = {
      id:0,
      idUser:this.idUser,
      idCategory: this.editUserForm1.get("category")!.value,
    }
    console.log(userCatg);

    this.userCategoryService.insertUserCategory(userCatg).subscribe({
      next: ()  => {
      },
      error: (err) => {
        console.log(err);
      }
    });
    
    this.ngOnInit();
    this.ngOnInit();
    this.ngOnInit();
    this.ngOnInit();

  }

  updateUser():void {

    const user:User = {
      id: this.idUser,
      name: this.editUserForm1.get("name")!.value,
      lastname: this.editUserForm1.get("lastname")!.value,
      email: this.editUserForm1.get("email")!.value,
      password: this.editUserForm1.get("password")!.value,
      phone: this.editUserForm1.get("phone")!.value,
      city: this.editUserForm1.get("city")!.value,
      numberDocument: parseInt(this.editUserForm1.get("numberDocument")!.value),
      typeDocument: this.editUserForm1.get("typeDocument")!.value,
      image:this.editUserForm1.get("image")!.value
    }

    console.log(user);

    this.userService.updateUser(user).subscribe({
      next: ()  => {
        this.router.navigate(["home/" + this.idUser]);
      },
      error: (err) => {
        console.log(err);
      }
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


  deleteUserCategory(id:number):void{

    this.userCategoryService.deleteUserCategory(id).subscribe({
      next: ()  => {
        this.snack.open('eliminado', 'OK', { duration: 5000 })
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.ngOnInit();
    this.ngOnInit();
    this.ngOnInit();
    this.ngOnInit();
  }

  change(event:MatSelectChange):void{

    let aux=this.dtoUserCategories.find(x=>x.idCategory==this.editUserForm1.get("category")!.value)

    if(aux){
      this.insert=true;
    }else{
      this.insert=false;
    }
  }


}
