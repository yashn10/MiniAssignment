import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './country/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './state/staff.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },

  {
    path:'country',
    component:CustomerComponent
  },

  {
    path:'employee',
    component:EmployeeComponent
  },

  {
    path:'state',
    component:StaffComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
