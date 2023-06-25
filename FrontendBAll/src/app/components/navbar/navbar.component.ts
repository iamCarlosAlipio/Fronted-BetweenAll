import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { ActivatedRoute, Router } from '@angular/router';
=======
>>>>>>> Stashed changes

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

<<<<<<< Updated upstream
  idUser:number = this.activated.snapshot.params['id'];
  constructor(private router: Router,private activated: ActivatedRoute){}

  changeEvent():void{
    this.router.navigate(["eventsAssisted/" + this.idUser]);

  }
  changeGroups():void{
    this.router.navigate(["groups"]);
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


=======
>>>>>>> Stashed changes
}
