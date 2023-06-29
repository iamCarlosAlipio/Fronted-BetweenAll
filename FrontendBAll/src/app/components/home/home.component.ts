import { SocialEventsService } from 'src/app/services/social-events.service';
import { SocialEvent } from 'src/app/models/socialevent';
import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild} from '@angular/core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private socialEventsService: SocialEventsService, private activatedRoute:ActivatedRoute){

  }
  events!: SocialEvent[];
  filteredEvents!: SocialEvent[];


  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim().toLowerCase();
    this.filteredEvents = this.events.filter(event => event.name.toLowerCase().includes(filterValue));
  }
  
  idUser!: number;
  
  ngOnInit(){
    this.idUser = this.activatedRoute.snapshot.params["id"];
    this.ListSocialEvents();
  }

  ListSocialEvents():void{
    this.socialEventsService.getSocialEvents().subscribe({
      next: (data:SocialEvent[]) => {
        this.events=data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
