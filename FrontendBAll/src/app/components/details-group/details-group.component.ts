import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsComponent } from '../groups/groups.component';
import { GroupsService } from './../../services/groups.service';
import { Group } from 'src/app/models/group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { DtoGroupParticipantsSummary } from 'src/app/models/dtoGroupParticipantsSummary';


@Component({
  selector: 'app-details-group',
  templateUrl: './details-group.component.html',
  styleUrls: ['./details-group.component.css']
})
export class DetailsGroupComponent implements OnInit {
  constructor(private formBuilder:FormBuilder, private groupService: GroupsService, private router: Router,
    private activatedRouter: ActivatedRoute,private categoryService:CategoryService,private snack: MatSnackBar, private UserServiceService: UserServiceService) {
  }

  group!: Group;
  detailsForm!:FormGroup;
  id!:number;
  TheGroup!: Group;

  categories!:Category[]
  idCatg!:number

  users!: User[];
  dtoGroupParticipantsSummaries!: DtoGroupParticipantsSummary[];
  dtoGroupParticipantsSummary!: DtoGroupParticipantsSummary;

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params["id"];
    this.reactiveForm();
    this.ListParticipants();
    //this.reactiveForm(this.id);
    //this.ListParticipants(this.id);
  }

  reactiveForm():void {
    this.detailsForm = this.formBuilder.group({
      id:[""],
      name:["",[Validators.required, Validators.maxLength(60)]],
      amountParticipants:["",[Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      description:["",[Validators.required, , Validators.maxLength(200)]],
      category:["",[Validators.required]],
      image:["",[Validators.required]]
    });

    this.id = this.activatedRouter.snapshot.params["id"];
    if (this.id!=0 && this.id!=undefined) {
      this.groupService.getGroup(this.id).subscribe({
        next: (data:Group) => {
          this.detailsForm.get("id")?.setValue(data.id);
          this.detailsForm.get("name")?.setValue(data.name);;
          this.detailsForm.get("amountParticipants")?.setValue(data.amountParticipants);;
          this.detailsForm.get("description")?.setValue(data.description);;
          this.detailsForm.get("image")?.setValue(data.image);;
          this.idCatg=data.id;;
          this.categoryService.getCategory(this.idCatg).subscribe({
            next: (dato:Category)=>{
              this.detailsForm.get("category")?.setValue(dato.name);;
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }


    this.id = this.activatedRouter.snapshot.params["id"];
    this.groupService.getGroup(this.id).subscribe(
    (group: Group) =>
    {this.TheGroup = group;});

  }

  ListParticipants():void{
    this.UserServiceService.getUsers().subscribe({
      next: (data:User[]) => {
        this.users=data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

    /*reactiveForm(id: number):void {
      this.detailsForm = this.formBuilder.group({
        //id:[""],
        name:["",[Validators.required, Validators.maxLength(60)]],
        amountParticipants:["",[Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
        description:["",[Validators.required, , Validators.maxLength(200)]],
        category:["",[Validators.required]]
        //image:["",[Validators.required]]
      });

      if (this.id!=0 && this.id!=undefined) {
        this.groupService.getGroupParticipantsSummary(id).subscribe({
          next: (data:DtoGroupParticipantsSummary) => {
            this.dtoGroupParticipantsSummary = data;

            this.detailsForm.get("name")?.setValue(data.nameGroup);;
            this.detailsForm.get("amountParticipants")?.setValue(data.amountParticipants);;
            this.detailsForm.get("description")?.setValue(data.descriptionGroup);;
            this.detailsForm.get("category")?.setValue(data.categoryGroup);;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }*/

    /*ListParticipants(id: number):void{
      this.groupService.getGroupParticipantsSummary(id).subscribe({
        next: (data:DtoGroupParticipantsSummary[]) => {
          this.dtoGroupParticipantsSummaries = data;

          data[0].userList.forEach((user) => {
            this.users.push(user);
          })
        },
        error: (err) => {
          console.log(err);
        }
      });
    }*/

    deleteGroup(id: number):void {
      this.groupService.deleteGroup(id).subscribe({
      });
    }
}
