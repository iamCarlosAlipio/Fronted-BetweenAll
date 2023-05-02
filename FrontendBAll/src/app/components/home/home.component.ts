import { SocialEventsService } from 'src/app/services/social-events.service';
import { SocialEvent } from 'src/app/models/socialevent';
import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild} from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  events: SocialEvent[] = [];
  constructor(private socialEventsService: SocialEventsService){

  }
  
  ngOnInit(){
    this.ListSocialEvents();
  }

  ListSocialEvents():void{
    this.socialEventsService.getList().subscribe({
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
