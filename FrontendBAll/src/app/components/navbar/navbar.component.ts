import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  idUser:number = this.activated.snapshot.params['id'];
  constructor(private router: Router,private activated: ActivatedRoute){}

  changeEvent():void{
    this.router.navigate(["home/" + this.idUser]);

  }
  changeGroups():void{
    this.router.navigate(["groups/" + this.idUser]);
  }
  changeTickets():void{
    this.router.navigate(["home/" + this.idUser]);
  }
  changeProfile():void{
    this.router.navigate(["editProfile/" + this.idUser]);
  }
  changeHome():void{
    this.router.navigate(["home/" + this.idUser]);

  }


}
