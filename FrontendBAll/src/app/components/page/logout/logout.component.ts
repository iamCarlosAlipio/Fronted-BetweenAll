import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  idUser:number = this.activated.snapshot.params['id'];
  constructor(private router: Router,private activated: ActivatedRoute){}
}
