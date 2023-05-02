import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HomeComponent } from './components/home/home.component';
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';
=======
import { AddSocialEventComponent } from './components/add-social-event/add-social-event.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AddEditGroupsComponent } from './components/add-edit-groups/add-edit-groups.component';
>>>>>>> 29f1b8097683491b71784e1a9eebe964ca906cb2

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'Home', component:HomeComponent},
  {path:'insertUser',component:AddUserComponent},
  {path: 'AddSocialEvent', component:AddSocialEventComponent},
  {path: 'grupos', component:GroupsComponent},
  {path: 'add-edit-groups', component:AddEditGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
