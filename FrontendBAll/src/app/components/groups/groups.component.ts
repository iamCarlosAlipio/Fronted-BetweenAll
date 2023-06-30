import { Group } from 'src/app/models/group';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GroupsService } from 'src/app/services/groups.service';
import { MatPaginator } from '@angular/material/paginator';
import{ ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DtoGroupParticipantsSummary } from 'src/app/models/dtoGroupParticipantsSummary';
import { DtoGroupsCreatedSummary } from 'src/app/models/dtoGroupsCreatedSummary';
import { DtoMyGroupUsersSummary } from 'src/app/models/dtoMyGroupUsersSummary';
import { GroupUserService } from 'src/app/services/group-user.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  dataSource = new MatTableDataSource<DtoGroupParticipantsSummary>();
  displayedColumns: string[]=["image","name","amountParticipants","description","category","actions"];

  dataSource3 = new MatTableDataSource<DtoGroupsCreatedSummary>();
  displayedColumns3: string[]=["image","name","amountParticipants","description","category","actions"];

  dataSource2=new MatTableDataSource<DtoMyGroupUsersSummary>();
  displayedColumns2:string[]=["image","name","amountParticipants","description","category","actions"];


  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('paginator2')
  paginator2!: MatPaginator;

  @ViewChild('paginator3')
  paginator3!: MatPaginator;

  id!: number;

  constructor(private groupService: GroupsService, private groupUserService: GroupUserService,private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.loadGroups();
    this.loadCreatedGroups();
    this.loadMyGroups();
  }

  filterGroups(event: Event) {
   let filtro = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filtro;
  }

  loadGroups(): void {

    this.groupService.getListGroupParticipantsSummary().subscribe({
      next: (data:DtoGroupParticipantsSummary[]) => {

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadCreatedGroups(): void {

    this.groupService.getGroupsByUserSummary(this.id).subscribe({
      next: (data:DtoGroupsCreatedSummary[]) => {

        this.dataSource3 = new MatTableDataSource(data);
        this.dataSource3.paginator = this.paginator3;

        console.log(data);
      }});
    }

  loadMyGroups(): void {

    this.groupUserService.getListMyGroupUsersSummary(this.id).subscribe({
      next: (data:DtoMyGroupUsersSummary[]) => {

        this.dataSource2 = new MatTableDataSource(data);
        this.dataSource2.paginator = this.paginator2;

        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteGroups(id: number):void {
    this.groupService.deleteGroup(id).subscribe({
      next: (data) => {
        this.loadGroups();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
