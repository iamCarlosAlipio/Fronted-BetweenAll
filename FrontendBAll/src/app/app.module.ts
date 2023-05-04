import { SharedModule } from './shared/shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddSocialEventComponent } from './components/add-social-event/add-social-event.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AddEditGroupsComponent } from './components/add-edit-groups/add-edit-groups.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PayComponent } from './components/pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    AddUserComponent,
    AddSocialEventComponent,
    GroupsComponent,
    AddEditGroupsComponent,
    PurchaseComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
