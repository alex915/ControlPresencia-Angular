import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { SigningComponent } from './modules/signing/signing.component';
import { CentersviewComponent } from './modules/centersview/centersview.component';
import { SigningsviewComponent } from './modules/signingsview/signingsview.component';
import { ClientsviewComponent } from './modules/clientsview/clientsview.component';
import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';
import { SigningsviewallComponent } from './modules/signingsviewall/signingsviewall.component';
import { CentersComponent } from './modules/forms/centers/centers.component';
import { ClientsComponent } from './modules/forms/clients/clients.component';
import { EmployeesViewComponent } from './modules/employees-view/employees-view.component';
import { EmployeesComponent } from './modules/forms/employees/employees.component';


const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo: "home"},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard], data: { roles: ["User", "Super" ,"Admin"]}},
  {path: "signing", component: SigningComponent, canActivate: [AuthGuard], data: { roles: ["User","Admin" ]}},
  {path: "centers/new", component: CentersComponent, canActivate: [AuthGuard],  data:{ roles: ["Admin" ]}},
  {path: "centers", component: CentersviewComponent, canActivate: [AuthGuard],  data:{ roles: ["Admin" ]}},
  {path: "allsignings/:id", component: SigningsviewallComponent, canActivate: [AuthGuard], data:{ roles: ["Admin" ]}},
  {path: "allsignings", component: SigningsviewallComponent, canActivate: [AuthGuard], data:{ roles: ["Admin" ]}},
  {path: "signings", component: SigningsviewComponent, canActivate: [AuthGuard], data:{ roles: ["User","Admin" ]}},
  {path: "clients/new", component: ClientsComponent, canActivate: [AuthGuard], data: { roles: [ "Super"] } },
  {path: "clients", component: ClientsviewComponent , canActivate: [AuthGuard], data:{ roles: [ "Super" ]}},
  {path: "employees/new", component: EmployeesComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  {path: "employees", component: EmployeesViewComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } }
  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
