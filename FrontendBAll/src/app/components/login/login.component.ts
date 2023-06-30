import { User } from './../../models/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  idUser!:number;
  email!: string;
  password!: string;
  form!:FormGroup;
  mensaje = false;

  constructor(private FormBuilder:FormBuilder,private fb:FormBuilder,private user:UserServiceService, private router:Router,
    private snack: MatSnackBar){}
  
  ngOnInit():void{
    this.reactiveForm();
  }

  reactiveForm():void {
    
    this.form = this.FormBuilder.group({
        email:["",[Validators.required, Validators.maxLength(30)]],
        password:["",[Validators.required, Validators.maxLength(10)]],
    });
  }

  verificarUsuario(): void {

    this.mensaje = true;
    this.email = this.form.get('email')?.value;
    this.password = this.form.get('password')?.value;
    this.user.getUserPassword(this.password,this.email).subscribe({
      next: (data:User)  => {
        this.router.navigate(["home/" + data.id]);
      },
      error: (err) => {
        this.snack.open('El usuario no existe', 'OK', { duration: 5000 })

      }
    });
      
    this.mensaje = false;
  }
}
