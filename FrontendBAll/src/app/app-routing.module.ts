import { DtoEventsAssistedSumary } from './models/dtoEventsAssistedSummary';
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
import { ConfirmBuy1Component } from './components/page/confirm-buy1/confirm-buy1.component';
import { ConfirmEventComponent } from './components/page/confirm-event/confirm-event.component';
import { LogoutComponent } from './components/page/logout/logout.component';
import { DetailsGroupComponent } from './components/details-group/details-group.component';
import { DetailsMygroupComponent } from './components/details-mygroup/details-mygroup.component';
import { DetailsMygroupcreatedComponent } from './components/details-mygroupcreated/details-mygroupcreated.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { EventsAssistedComponent } from './components/events-assisted/events-assisted.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home/:id', component:HomeComponent},
  {path:'insertUser',component:AddUserComponent},
  {path: 'addSocialEvent/:id', component:AddSocialEventComponent},
  {path: 'addEditGroups/:id', component:AddEditGroupsComponent},
  {path: 'eventConfirm1', component:EventCreate1Component},
  {path: 'pay/:id', component:PayComponent},
  {path: 'confirmPage1', component:ConfirmBuy1Component},
  {path: 'confirmEvent', component:ConfirmEventComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'add-group', component:AddEditGroupsComponent},
  {path: 'edit-groups/:id', component:AddEditGroupsComponent},
  {path: 'details-group/:id', component: DetailsGroupComponent},
  {path: 'details-mygroup/:id', component: DetailsMygroupComponent},
  {path: 'details-mygroupcreated/:id', component: DetailsMygroupcreatedComponent},
  {path: 'editProfile/:id', component:EditUserComponent},
  {path: 'groups/:id', component:GroupsComponent},
  {path: 'addEditGroups/:id', component:AddEditGroupsComponent},
  {path: 'eventConfirm1', component:EventCreate1Component},
  {path: 'purchase/event/:idEvent/user/:idUser', component:PurchaseComponent},
  {path: 'profile/:id', component:ProfileUserComponent},
  {path: 'eventsAssisted/:id', component:EventsAssistedComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
