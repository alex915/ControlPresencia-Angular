import { BrowserModule } from "@angular/platform-browser";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./modules/home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SearchBoxComponent } from "./components/searchbox/search-box.component";
import { SigningComponent } from "./modules/signing/signing.component";
import { RadioComponent } from "./components/radio/radio.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { TableMaterialComponent } from "./components/table-material/table-material.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { ClientsviewComponent } from "./modules/clientsview/clientsview.component";
import { MatInputModule } from "@angular/material/input";
import { CentersviewComponent } from "./modules/centersview/centersview.component";
import { SigningsviewComponent } from "./modules/signingsview/signingsview.component";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatStepperModule } from "@angular/material/stepper";
import { TableSigningComponent } from "./components/tables/table-signing.component";
import { AuthenticationService } from "./Services/auth.service";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TokenInterceptor } from "./core/interceptor/token.interceptor";
import { ClientComponent } from "./components/forms/client/client.component";
import { CenterComponent } from "./components/forms/center/center.component";
import { EmployeeComponent } from "./components/forms/employee/employee.component";
import { DeviceComponent } from "./components/forms/device/device.component";
import { ClientsComponent } from "./modules/forms/clients/clients.component";
import { CentersComponent } from "./modules/forms/centers/centers.component";
import { EmployeesComponent } from "./modules/forms/employees/employees.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipsModule } from "@angular/material/chips";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";
import { DateTimePickerComponent } from "./components/date-time-picker/date-time-picker.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { TableDevicesComponent } from "./components/tables/table-devices.component";
import { PopUpComponent } from "./components/pop-up/pop-up.component";
import { TableEmployeesComponent } from "./components/tables/table-employees.component";
import { SigningService } from "./Services/signing.service";
import { MatMenuModule } from "@angular/material/menu";
import { MainNavComponent } from "./core/main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatListModule } from "@angular/material/list";
import { SigningsComponent } from "./components/signings/signings.component";
import { SigningsviewallComponent } from "./modules/signingsviewall/signingsviewall.component";
import { EmployeesViewComponent } from "./modules/employees-view/employees-view.component";
import { ChartsModule } from "ng2-charts";
import { LineComponent } from "./components/chart/line/line.component";
import { BarComponent } from "./components/chart/bar/bar.component";
import { PieComponent } from "./components/chart/pie/pie.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatTooltipModule } from '@angular/material/tooltip';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BtnFicharComponent } from './components/btn-fichar/btn-fichar.component';
export function configureAuth(oidcConfigService: AuthenticationService) {
  //TODO conf endpoint
  return () =>
    oidcConfigService.initialize({
      instance: "https://login.microsoftonline.com/",
      tenant: "729d3718-8bf3-48c2-96ad-35e9eeeb2456",
      clientId: "7d12ade7-affb-4cf5-8117-8efc631144e6",
      navigateToLoginRequestUrl: false,
      redirectUri: window.location.origin,
      cacheLocation: "sessionStorage",
      postLogoutRedirectUri: window.location.origin + "/logout",
    });
}

export function onAppInit(
  service: SigningService,
  authService: AuthenticationService,
  spinner: NgxSpinnerService
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve) => {
      service
        .getUser(authService.getUserProfile().oid)
        .then((x) => {
          service.user = x;
          if (service.user.centro != undefined) {
            console.log(x);
            service.getCenter(service.user.centro.idCentro).then((y) => {
              console.log(y);
              service.center = y;
              service.getClient(x.centro.codCliente).then((z) => {
                service.client = z;
                console.log(z);
                resolve();
              });
            });
          }else{
            resolve();
          }
        })
        .catch(() => authService.signOut());
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBoxComponent,
    SigningComponent,
    RadioComponent,
    TableMaterialComponent,
    CentersviewComponent,
    ClientsviewComponent,
    SigningsviewComponent,
    SigningsviewComponent,
    TableSigningComponent,
    ClientComponent,
    CenterComponent,
    EmployeeComponent,
    DeviceComponent,
    ClientsComponent,
    CentersComponent,
    EmployeesComponent,
    DateTimePickerComponent,
    TableDevicesComponent,
    PopUpComponent,
    TableEmployeesComponent,
    SigningsComponent,
    SigningsviewallComponent,
    MainNavComponent,
    EmployeesViewComponent,
    LineComponent,
    BarComponent,
    PieComponent,
    BtnFicharComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatRadioModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatSidenavModule,
    MatMenuModule,
    LayoutModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    ChartsModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ScrollingModule,
    MatTooltipModule,
  ],

  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [AuthenticationService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      deps: [SigningService, AuthenticationService, NgxSpinnerService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
