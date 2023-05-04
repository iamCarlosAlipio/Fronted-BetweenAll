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

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  addUserForm1!:FormGroup;
  addUserForm2!:FormGroup;
  addUserForm3!:FormGroup;
  id!:number;
  fristPart:boolean=true;
  hide:boolean= true;
  categories!:Category[];
  //auxcCategories!:Category[];
  //dataSource = new MatTableDataSource<Category>();
  //displayedColumns: string[]=["name"];
  auxUsers!:User[];
  idUser!:number;
  idcategory!:number;
  insert:boolean=true;
  delete:boolean=true;
  
  constructor(private FormBuilder:FormBuilder, private userService:UserServiceService, 
    private router: Router, private stardRouter: ActivatedRoute,private categoryService:CategoryService,
    private userCategoryService:UserCategoryService,private snack: MatSnackBar){

    }

    ngOnInit():void{
      this.reactiveForm();
      this.loadCatergories();
    }

    reactiveForm():void {
    
      this.addUserForm1 = this.FormBuilder.group({
          id:[""],
          name:["",[Validators.required, Validators.maxLength(60)]],
          lastname:["",[Validators.required, Validators.maxLength(7)]],
          email:["",[Validators.required, Validators.maxLength(10)]],
          password:["",[Validators.required, Validators.maxLength(10)]],
      });

      this.addUserForm2 = this.FormBuilder.group({
        typeDocument:["",[Validators.required]],
        numberDocument:["",[Validators.required]],
        phone:["",[Validators.required]],
        city:["",[Validators.required]],
        category:["",[Validators.required]],
     });

     this.addUserForm3 = this.FormBuilder.group({
     });
     
     this.id=0;
    }

    saveUser():void {
      const user:User = {
        id: parseInt(this.addUserForm1.get("id")!.value),
        name: this.addUserForm1.get("name")!.value,
        lastname: this.addUserForm1.get("lastname")!.value,
        email: this.addUserForm1.get("email")!.value,
        password: this.addUserForm1.get("password")!.value,
        phone: this.addUserForm2.get("phone")!.value,
        city: this.addUserForm2.get("city")!.value,
        numberDocument: parseInt(this.addUserForm2.get("numberDocument")!.value),
        typeDocument: this.addUserForm2.get("typeDocument")!.value,
        image:"src/assets/img/PERFIL-VACIO.png"
      }
  
      this.userService.insertUser(user).subscribe({
        
        next: (data)  => {
          this.fristPart=true; 
          this.router.navigate(["/Login"]);
        },
        error: (err) => {
          console.log(err);
        }
  
      });
  
    }

    saveUserCategory():void {
      
      let auxCategory = this.categories.find(x => x.name == this.addUserForm2.get("category")!.value);
      if(auxCategory){
        this.idcategory=auxCategory.id
      }
      const userCatg:userCategory = {
        id: parseInt(this.addUserForm1.get("id")!.value),
        idUser:this.idUser,
        idCategory: this.idcategory
      }
      this.userCategoryService.insertUserCategory(userCatg).subscribe({
        next: (data)  => {
          this.insert=true;
          this.delete=false;
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

    /*listarCategyInTable(): void {

      let catg = this.categories.find(x=> x.id==this.idcategory)
      if(catg){
       this.auxcCategories.push(catg);
       console.log(this.auxcCategories);
       this.dataSource = new MatTableDataSource(this.auxcCategories); 
      }
      
    }*/

    changeScreen():void{
      
      this.userService.getUsers().subscribe(
        (data: User[]) => {
          this.auxUsers = data;
      });

      if(this.auxUsers.length>0){
        this.idUser=this.auxUsers[this.auxUsers.length-1].id+1;
      }
      if(this.auxUsers==undefined || this.auxUsers.length<=0){
        this.idUser=0;
      }
      this.fristPart=!this.fristPart;

    }

    changeToLogin():void{
      this.router.navigate(["/Login"]);
    }

    changeVisivility():void{
      this.hide=!this.hide;
    }

    changeButton(event:MatSelectChange):void{
      
      let auxCategory = this.categories.find(x => x.name == this.addUserForm2.get("category")!.value);
      if(auxCategory){
        let idCatg =auxCategory.id;
        this.userCategoryService.getUserCategories().subscribe({
        next: (data:userCategory[]) => {
          if(data.length!=0){
            for(let i = 0; i < data.length ; i++){
              if(data[i].idCategory== idCatg && data[i].idUser==this.idUser){
                this.snack.open('son iguales', 'OK', { duration: 5000 })
                this.insert=true;
                this.delete=false;
              }else{
                this.insert=false;
                this.delete=true;
              }
            }
          }else{
            this.insert=false;
            this.delete=true;
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
      }
    }
    
    deleteUserCategory():void{

      let auxCategory = this.categories.find(x => x.name == this.addUserForm2.get("category")!.value);
      if(auxCategory){
        let idCatg =auxCategory.id;
        this.userCategoryService.getUserCategories().subscribe({
          next: (data:userCategory[]) => {
            for(let i = 0; i < data.length ; i++){
              if(data[i].idCategory== idCatg && data[i].idUser==this.idUser){
                this.userCategoryService.deleteUserCategory(data[i].id).subscribe({
                  next: (data)  => {
                    this.snack.open('eliminado', 'OK', { duration: 5000 })
                    this.insert=false;
                    this.delete=true;
                  },
                  error: (err) => {
                    console.log(err);
                  }
                });
              }
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

    }

}
