import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsComponent } from '../groups/groups.component';
import { GroupsService } from './../../services/groups.service';
import { Group } from 'src/app/models/group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/user-service.service';
import { DtoGroupParticipantsSummary } from 'src/app/models/dtoGroupParticipantsSummary';
import { User } from 'src/app/models/user';
import { GroupUserService } from 'src/app/services/group-user.service';

@Component({
  selector: 'app-details-mygroupcreated',
  templateUrl: './details-mygroupcreated.component.html',
  styleUrls: ['./details-mygroupcreated.component.css']
})
export class DetailsMygroupcreatedComponent {
  constructor(private formBuilder:FormBuilder, private groupService: GroupsService, private router: Router,
    private activatedRouter: ActivatedRoute,private snack: MatSnackBar, 
    private groupUserService: GroupUserService,private categoryService:CategoryService) {
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

    deleteUserByGroup():void{
      this.groupUserService.deleteGroupUserByUserAndGroup(this.idUser,this.id).subscribe({
        next:(data)=>{
          console.log("ELIMINA");
          this.router.navigate(["/details-mygroup/" + this.idUser+"/group/"+this.id]);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
}
