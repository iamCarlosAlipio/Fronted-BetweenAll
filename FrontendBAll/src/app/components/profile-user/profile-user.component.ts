import { UserCategoryService } from 'src/app/services/user-category.service';
import { userCategory } from 'src/app/models/userCategory';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { DtoUserCategorySummary } from 'src/app/models/dtoUserCategorySummary';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent {

  dataSource = new MatTableDataSource<DtoUserCategorySummary>();

  form!: FormGroup;
  isEditMode: boolean = false;
  displayedColumns: string[] = ['nameCategory'];

  constructor(private userServiceService: UserServiceService, private usercategoryService: UserCategoryService, private formBuilder: FormBuilder, private activatedRoute:ActivatedRoute ) { }
  events!: userCategory[];
  idUser!: number;

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.params["id"];
    this.ListCategory(this.idUser);
  }

  reactiveForm():void {
    
    this.form = this.formBuilder.group({
        email:["",[Validators.required, Validators.maxLength(10)]],
        password:["",[Validators.required, Validators.maxLength(10)]],
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  ListCategory(id: number):void{
    this.usercategoryService.getUserCategoriesDTO(id).subscribe({
      next: (data:DtoUserCategorySummary[]) => {
        this.dataSource = new MatTableDataSource(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
