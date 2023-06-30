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

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  user!:User;
  editUserForm1!:FormGroup;
  insert:boolean=true;
  delete:boolean=true;
  categories!:Category[];
  auxUsers!:User[];
  idUser:number=this.activated.snapshot.params['id'];
  idcategory!:number;


  constructor(private FormBuilder:FormBuilder, private userService:UserServiceService, 
    private router: Router, private stardRouter: ActivatedRoute,private categoryService:CategoryService,
    private userCategoryService:UserCategoryService,private snack: MatSnackBar,private activated: ActivatedRoute){}
    
    ngOnInit():void{
      this.loadCatergories();
      this.findUser()
      this.reactiveForm();
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
      });

      this.userService.getUser(this.idUser).subscribe({
        next: (data:User) => {
          this.editUserForm1.get("id")?.setValue(data.id);
          this.editUserForm1.get("name")?.setValue(data.name);
          this.editUserForm1.get("lastname")?.setValue(data.lastname);
          this.editUserForm1.get("email")?.setValue(data.email);
          this.editUserForm1.get("password")?.setValue(data.password);
          this.editUserForm1.get("typeDocument")?.setValue(data.typeDocument);
          this.editUserForm1.get("numberDocument")?.setValue(data.numberDocument);      
          this.editUserForm1.get("phone")?.setValue(data.phone);
          this.editUserForm1.get("city")?.setValue(data.city);             
        },
        error: (err) => {
          console.log(err);
        }
      });
  
    }

  changeButton(event:MatSelectChange):void{

    this.snack.open(this.editUserForm1.get("category")!.value, 'OK', { duration: 5000 })
    let auxCategory = this.categories.find(x => x.name == this.editUserForm1.get("category")!.value);
    if(auxCategory){
      this.snack.open('if', 'OK', { duration: 5000 })
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

  loadCatergories(): void {
    this.categoryService.getCartegories().subscribe(
      (data: Category[]) => {
        this.categories = data;
    });
  }
  
  deleteUserCategory():void{

    let auxCategory = this.categories.find(x => x.name == this.editUserForm1.get("category")!.value);
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

  saveUserCategory():void {
      
    let auxCategory = this.categories.find(x => x.name == this.editUserForm1.get("category")!.value);
    if(auxCategory){
      this.idcategory=auxCategory.id
    }
    const userCatg:userCategory = {
      id: parseInt(this.editUserForm1.get("id")!.value),
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

  findUser():void{
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        let auxUser = data.find(x => x.id == this.idUser);
        if (auxUser) {
          this.user=auxUser;
        }
    });
  }

  updateUser():void{
    
    const axuser:User = {
      id: this.idUser+1,
      name: this.editUserForm1.get("name")!.value,
      lastname: this.editUserForm1.get("lastname")!.value,
      email: this.editUserForm1.get("email")!.value,
      password: this.editUserForm1.get("password")!.value,
      phone: this.editUserForm1.get("phone")!.value,
      city: this.editUserForm1.get("city")!.value,
      numberDocument: parseInt(this.editUserForm1.get("numberDocument")!.value),
      typeDocument: this.editUserForm1.get("typeDocument")!.value,
      image:"./assets/img/PERFILVACIO.png"
    }
    
    this.userService.updateUser(axuser).subscribe({
      next: (data)  => {
        this.snack.open("El empleado se actualizó correctamente","OK",{duration:3000});
      },
      error: (err) => {
        console.log(err);
        this.snack.open("El no empleado se actualizó correctamente","OK",{duration:3000});
      }
    });
    
  }


}
