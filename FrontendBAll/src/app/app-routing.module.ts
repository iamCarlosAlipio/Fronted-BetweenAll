import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddSocialEventComponent } from './components/add-social-event/add-social-event.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AddEditGroupsComponent } from './components/add-edit-groups/add-edit-groups.component';
import { EventCreate1Component } from './components/event-create1/event-create1.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PayComponent } from './components/pay/pay.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home/:id', component:HomeComponent},
  {path:'insertUser',component:AddUserComponent},
  {path: 'addSocialEvent/:id', component:AddSocialEventComponent},
  {path: 'groups/:id', component:GroupsComponent},
  {path: 'addEditGroups/:id', component:AddEditGroupsComponent},
  {path: 'eventConfirm1', component:EventCreate1Component},
  {path: 'purchase/:id/user/:idUser', component:PurchaseComponent},
  {path: 'pay/:id', component:PayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
