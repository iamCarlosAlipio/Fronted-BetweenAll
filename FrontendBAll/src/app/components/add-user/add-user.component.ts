import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Category } from 'src/app/models/category';

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
  
  constructor(private FormBuilder:FormBuilder, private userService:UserServiceService, 
    private router: Router, private stardRouter: ActivatedRoute){

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
     });

     this.addUserForm2 = this.FormBuilder.group({
        typeDocument:["",[Validators.required]],
        numberDocument:["",[Validators.required]],
        phone:["",[Validators.required]],
        city:["",[Validators.required]],
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
        image:""
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

    changeScreen():void{
      this.fristPart=!this.fristPart;
    }

    changeToLogin():void{
      this.router.navigate(["/Login"]);
    }

    changeVisivility():void{
      this.hide=!this.hide;
    }

}
