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


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  dataSource = new MatTableDataSource<DtoGroupParticipantsSummary>();
  dataSource2=new MatTableDataSource<DtoMyGroupUsersSummary>();
  displayedColumns: string[]=["image","name","amountParticipants","description","category","actions"];

  dataSource3 = new MatTableDataSource<DtoGroupsCreatedSummary>();
  displayedColumns3: string[]=["image","name","amountParticipants","description","category","actions"];

  displayedColumns2:string[]=["imageGroup","nameGroup","amountParticipants","descriptionGroup","nameCategory","actions"];
  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('paginator3')
  paginator3!: MatPaginator;

  id!: number;

  constructor(private groupService: GroupsService, private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.loadGroups();
    this.loadCreatedGroups();
    this.loadMyGroups(this.id);
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
  loadMyGroups(idUser:number): void {

    this.groupService.getListMyGroupUsersSummary(idUser).subscribe({
      next: (data2:DtoMyGroupUsersSummary[]) => {

        this.dataSource2 = new MatTableDataSource(data2);
        this.dataSource2.paginator = this.paginator;

        console.log(data2);
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
