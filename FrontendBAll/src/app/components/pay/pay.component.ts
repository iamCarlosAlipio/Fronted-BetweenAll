import { CardService } from './../../services/card.service';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {

  fromulario!: FormGroup;
  idUser:number=this.activated.snapshot.params['id'];
  insert:boolean=true;
  update:boolean=true;

  constructor(private FormBuilder:FormBuilder,private router: Router, 
    private stardRouter: ActivatedRoute,private snack: MatSnackBar, private cardservice: CardService,
    private activated: ActivatedRoute){}

    ngOnInit():void{
      this.reactiveForm();
    }

    reactiveForm():void {
      this.fromulario = this.FormBuilder.group({
          id:[""],
          number:["",[Validators.required, Validators.maxLength(60),Validators.pattern('^[a-zA-Z]+$')]],
          name:["",[Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z]+$')]],
          dueDate:["",[Validators.required, Validators.maxLength(30)]],
          cvv:["",[Validators.required, Validators.maxLength(7)]],
      });

      this.cardservice.getCardUser(this.idUser).subscribe({
        next:(data:Card)=>{
          this.insert=true;
          this.fromulario.get("id")?.setValue(data.id);
          this.fromulario.get("number")?.setValue(data.number);
          this.fromulario.get("name")?.setValue(data.name);
          this.fromulario.get("dueDate")?.setValue(data.dueDate);
          this.fromulario.get("cvv")?.setValue(data.cvv);
        },
        error: (err) => {
          this.update=true;
        }
      });
    }

    saveOrUpdateCard():void{

      const card:Card={
        id: parseInt(this.fromulario.get("id")!.value),
        name: this.fromulario.get("name")!.value,
        number: parseInt(this.fromulario.get("number")!.value),
        dueDate: this.fromulario.get("dueDate")!.value,
        cvv: this.fromulario.get("cvv")!.value,
        idUser:this.idUser,
        state:"Activo"
      }

      if(this.insert){
        this.cardservice.addCard(card,this.idUser).subscribe({
          next:()=>{
            this.router.navigate(["editProfile/" + this.idUser]);
          },
          error: (err) => {
          }
        });
      }else{
        this.cardservice.updateCard(card,this.idUser).subscribe({
          next:()=>{
            this.router.navigate(["editProfile/" + this.idUser]);
          },
          error: (err) => {
          }
        });
      }
    }

      
    

}
