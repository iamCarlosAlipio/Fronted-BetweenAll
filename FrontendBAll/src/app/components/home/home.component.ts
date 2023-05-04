import { SocialEventsService } from 'src/app/services/social-events.service';
import { SocialEvent } from 'src/app/models/socialevent';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  events!: SocialEvent[];
  filteredEvents!: SocialEvent[];
  constructor(private socialEventsService: SocialEventsService){

  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim().toLowerCase();
    this.filteredEvents = this.events.filter(event => event.name.toLowerCase().includes(filterValue));
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
