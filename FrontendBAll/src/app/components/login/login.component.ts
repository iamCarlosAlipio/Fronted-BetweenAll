import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  form:FormGroup;
  constructor(private fb:FormBuilder){
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
  }
}
