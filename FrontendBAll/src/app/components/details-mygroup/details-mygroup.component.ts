import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsComponent } from '../groups/groups.component';
import { GroupsService } from './../../services/groups.service';
import { Group } from 'src/app/models/group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-details-mygroup',
  templateUrl: './details-mygroup.component.html',
  styleUrls: ['./details-mygroup.component.css']
})
export class DetailsMygroupComponent implements OnInit {
  constructor(private formBuilder:FormBuilder, private groupService: GroupsService, private router: Router,
    private activatedRouter: ActivatedRoute) {
  }

  group!: Group;
  detailsForm!:FormGroup;
  id!:number;
  TheGroup!: Group;

  ngOnInit() {
    this.reactiveForm();
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
            this.detailsForm.get("category")?.setValue(data.idCategory);
            this.detailsForm.get("image")?.setValue(data.image);;
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

    deleteGroup(id: number):void {
      this.groupService.deleteGroup(id).subscribe({
      });
    }
}
