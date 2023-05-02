import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddSocialEventComponent } from './components/add-social-event/add-social-event.component';
const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'Home', component:HomeComponent},
  {path: 'AddSocialEvent', component:AddSocialEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
