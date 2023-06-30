import { GroupUser } from './../../models/groupUser';
import { GroupUserService } from './../../services/group-user.service';
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
    private activatedRouter: ActivatedRoute,private categoryService:CategoryService,private snackBar: MatSnackBar, private UserServiceService: UserServiceService, private groupUserService: GroupUserService) {
  }

  group!: Group;
  detailsForm!:FormGroup;
  id!:number;
  idUser!:number;
  TheGroup!: DtoGroupParticipantsSummary;

  users!: User[];
  dtoGroupParticipantsSummary!: DtoGroupParticipantsSummary;

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.params["idGroup"];
    this.idUser = this.activatedRouter.snapshot.params["id"];
    this.reactiveForm(this.id);
    this.ListParticipants(this.id);
  }


    reactiveForm(id: number):void {
      this.detailsForm = this.formBuilder.group({
        //id:[""],
        name:["",[Validators.required, Validators.maxLength(60)]],
        amountParticipants:["",[Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
        description:["",[Validators.required, , Validators.maxLength(200)]],
        category:["",[Validators.required]],
        image:["",[Validators.required]]
      });

      if (this.id!=0 && this.id!=undefined) {
        this.groupService.getGroupParticipantsSummary(id).subscribe({
          next: (data:DtoGroupParticipantsSummary) => {
            this.dtoGroupParticipantsSummary = data;

            this.detailsForm.get("name")?.setValue(data.nameGroup);;
            this.detailsForm.get("amountParticipants")?.setValue(data.amountParticipants);;
            this.detailsForm.get("description")?.setValue(data.descriptionGroup);;
            this.detailsForm.get("category")?.setValue(data.categoryGroup);;
            this.detailsForm.get("image")?.setValue(data.imageGroup);;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

      this.groupService.getGroupParticipantsSummary(id).subscribe(
      (group: DtoGroupParticipantsSummary) =>
      {this.TheGroup = group;});
    }

    ListParticipants(id: number):void{
      this.groupService.getGroupParticipantsSummary(id).subscribe({
        next: (data:DtoGroupParticipantsSummary) => {
          this.dtoGroupParticipantsSummary = data;
          this.users = data.userList;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    deleteGroup(id: number):void {
      this.groupService.deleteGroup(id).subscribe({
      });
    }

    saveUserGroup():void{
      const groupUser: GroupUser = {
        id: 0,
        idUser: this.idUser,
        idGroup: this.id
      }

      this.groupUserService.insertGroupUser(groupUser, this.idUser, this.id).subscribe({
        next: (data)  => {
          this.snackBar.open("El usuario ingresó al grupo correctamente","OK",{duration:3000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
}
