import { userCategory } from './../../models/userCategory';
import { Category } from './../../models/category';
import { UserCategoryService } from './../../services/user-category.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { CategoryService } from 'src/app/services/category.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
import { DtoUserCategorySummary } from 'src/app/models/dtoUserCategorySummary';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  addUserForm1!:FormGroup;
  addUserForm2!:FormGroup;
  addUserForm3!:FormGroup;
  fristPart:boolean=true;
  hide:boolean= true;
  categories!:Category[];
  dataSource = new MatTableDataSource<DtoUserCategorySummary>();
  displayedColumns: string[]=['nameCategory', 'action1'];
  dtoUserCategories!:DtoUserCategorySummary[];
  insert:boolean=false;
  auxUser!:User;
  
  constructor(private FormBuilder:FormBuilder, private userService:UserServiceService, 
    private router: Router, private stardRouter: ActivatedRoute,private categoryService:CategoryService,
    private userCategoryService:UserCategoryService,private snack: MatSnackBar){

    }

    ngOnInit():void{
      this.reactiveForm();
      this.loadTable();
    }

    reactiveForm():void {
      this.addUserForm1 = this.FormBuilder.group({
          id:[""],
          name:["",[Validators.required, Validators.maxLength(60),Validators.pattern('^[a-zA-Z]+$')]],
          lastname:["",[Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z]+$')]],
          email:["",[Validators.required, Validators.maxLength(30),Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
          password:["",[Validators.required, Validators.maxLength(7)]],
      });

      this.addUserForm2 = this.FormBuilder.group({
        typeDocument:new FormControl("",[Validators.required]),
        numberDocument:new FormControl("",[Validators.required,Validators.pattern('^[0-9]+$')]),
        phone:new FormControl("",[Validators.required,Validators.maxLength(9),Validators.pattern('^[0-9]+$')]),
        city:new FormControl("",[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
     });
     this.addUserForm3 = this.FormBuilder.group({
      category:new FormControl(""),
   });
   
    }

    saveUser():void { 
      const user:User = {
        id: parseInt(this.addUserForm1.get("id")!.value),
        name: this.addUserForm1.get("name")!.value,
        lastname: this.addUserForm1.get("lastname")!.value,
        email: this.addUserForm1.get("email")!.value,
        password: this.addUserForm1.get("password")!.value,
        phone: "",
        city: "",
        numberDocument: 0,
        typeDocument: "",
        image:"./assets/img/PERFILVACIO.png"
      }
  
      this.userService.insertUser(user).subscribe({
        next: (data)  => {
          this.loadCatergories();      
          this.fristPart=false;
        },
        error: (err) => {
          console.log(err);
        }
  
      });
    }

    updateUser():void {

      const user:User = {
        id: this.auxUser.id,
        name: this.addUserForm1.get("name")!.value,
        lastname: this.addUserForm1.get("lastname")!.value,
        email: this.addUserForm1.get("email")!.value,
        password: this.addUserForm1.get("password")!.value,
        phone: this.addUserForm2.get("phone")!.value,
        city: this.addUserForm2.get("city")!.value,
        numberDocument: parseInt(this.addUserForm2.get("numberDocument")!.value),
        typeDocument: this.addUserForm2.get("typeDocument")!.value,
        image:"./assets/img/PERFILVACIO.png"
      }
      console.log("hola");
      console.log(user);
      this.userService.updateUser(user).subscribe({
        next: (data)  => {
          console.log(data);
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    saveUserCategory():void {
      
      const userCatg:userCategory = {
        id:0,
        idUser:this.auxUser.id,
        idCategory: this.addUserForm3.get("category")!.value,
      }
      console.log(userCatg);

      this.userCategoryService.insertUserCategory(userCatg).subscribe({
        next: ()  => {
        },
        error: (err) => {
          console.log(err);
        }
      });
      
      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();
      
    }

    loadCatergories(): void {

      this.categoryService.getCartegories().subscribe(
        (data: Category[]) => {
          this.categories = data;
      });

      this.userService.getLastUsers().subscribe({
        next: (data:User)  => {
          this.auxUser=data;
          console.log(this.auxUser.id);
        },
        error: (err) => {
          console.log(err);
        }
      });

    }

    changeScreen():void{
      this.fristPart=!this.fristPart;
    }

    changeToLogin():void{
      this.router.navigate(["/login"]);
    }

    changeVisivility():void{
      this.hide=!this.hide;
    }

    change(event:MatSelectChange):void{

      this.loadTable();
      this.loadTable();
      this.loadTable();
  
      let aux=this.dtoUserCategories.find(x=>x.idCategory==this.addUserForm3.get("category")!.value)
      console.log(aux);
  
      if(aux){
        this.insert=true;
      }else{
        this.insert=false;
      }
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

      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();
      this.loadTable();

    }
    deleteAll():void{

      this.userCategoryService.deleteUserCategoryByUser(this.auxUser.id).subscribe({
        next: ()=> {  
          this.snack.open('eliminados', 'OK', { duration: 5000 })
        },
        error: (err) => {
          console.log(err);
        }
      });
    
      this.userService.deleteUser(this.auxUser.id).subscribe({
        next: ()=> {
          this.snack.open('eliminado', 'OK', { duration: 5000 })
        },
        error: (err) => {
          console.log(err);
        }
      });

      this.changeToLogin();
    }

    loadTable(){
      this.userCategoryService.getUserCategoriesDTO(this.auxUser.id).subscribe({
        next: (data)  => {
          this.dataSource = new MatTableDataSource(data);
          this.dtoUserCategories=data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

}
