import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  form:FormGroup;
  loading=false;
  constructor(private fb:FormBuilder,private _snackBar: MatSnackBar){
    this.form=this.fb.group({
      user:['',Validators.required],
      password:['',Validators.required],
    })
  }
  ngOnInit():void{

  }
  getIntoDash(){
    console.log(this.form);
    const userForm=this.form.value.user;
    const passwordForm=this.form.value.password;
    console.log(userForm);
    console.log(passwordForm);
    if(userForm=='adm' && passwordForm=='123'){
      this.fakeLoading();
    }else{
      this.error();
      this.form.reset();
    }
  }

  error(){
    this._snackBar.open('Usuario o contraseña ingresado son inválidos','',{
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }

  fakeLoading(){
    this.loading=true;
    setTimeout(()=>{
      this.loading=false;
    },1500)
  }
}
