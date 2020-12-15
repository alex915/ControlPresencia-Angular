import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AuthenticationService } from "../../Services/auth.service";
import { SigningService } from "src/app/Services/signing.service";

@Component({
  selector: "app-main-nav",
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport="false"
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="'over'"
        [opened]="false"
      >
        <mat-toolbar class="toolbar-hello"
          >Hola {{ serviceS.user.nombre }}
        </mat-toolbar>
        <mat-nav-list class="toolbar-nav">
          <a
            mat-list-item
            routerLink="/home"
            routerLinkActive="active"
            (click)="drawer.toggle()"
            >Dashboard</a
          >
          <a
            *ngIf="this.service.getUserProfile().roles[0] === 'Super'"
            mat-list-item
            routerLink="/clients"
            routerLinkActive="active"
            (click)="drawer.toggle()"
            >Clientes</a
          >
          <a
            *ngIf="this.service.getUserProfile().roles[0] === 'Admin'"
            mat-list-item
            routerLink="/centers"
            routerLinkActive="active"
            (click)="drawer.toggle()"
            >Centros</a
          >
          <a
            *ngIf="this.service.getUserProfile().roles[0] === 'Admin'"
            mat-list-item
            routerLink="/allsignings"
            routerLinkActive="active"
            (click)="drawer.toggle()"
            >Fichajes</a
          >
          <a
            *ngIf="this.service.getUserProfile().roles[0] === 'Admin'"
            mat-list-item
            routerLink="/employees"
            routerLinkActive="active"
            (click)="drawer.toggle()"
            >Empleados</a
          >

          <a
          *ngIf="this.service.getUserProfile().roles[0] === 'Admin' ||this.service.getUserProfile().roles[0] === 'User'"
            mat-list-item
            routerLink="/signings"
            routerLinkActive="active"
            (click)="drawer.toggle()"
            >Mis Fichajes</a
          >
          <a
          *ngIf="this.service.getUserProfile().roles[0] === 'Admin' || this.service.getUserProfile().roles[0] === 'User'"
            mat-list-item
            routerLink="/signing"
            routerLinkActive="active"
            (click)="drawer.toggle()"
            >Fichar</a
          >
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            id="burger"
          >
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <span *ngIf="serviceS.client === undefined">Panel de Administración</span>
          <span *ngIf="serviceS.client !== undefined">{{ serviceS.client?.descripcion }}</span>

          <div id="buttons">
            <button mat-button routerLink="/home" routerLinkActive="active">
              Dashboard
            </button>
            <button
              *ngIf="this.service.getUserProfile().roles[0] === 'Super'"
              mat-button
              routerLink="/clients"
              routerLinkActive="active"
            >
              Clientes
            </button>
            <button
              *ngIf="this.service.getUserProfile().roles[0] === 'Admin'"
              mat-button
              routerLink="/centers"
            >
              Centros
            </button>
            <button
              *ngIf="this.service.getUserProfile().roles[0] === 'Admin'"
              mat-button
              routerLink="/allsignings"
            >
              Fichajes
            </button>
            <button
              *ngIf="this.service.getUserProfile().roles[0] === 'Admin'"
              mat-button
              routerLink="/employees"
            >
              Empleados
            </button>
            <button
              *ngIf="
                this.service.getUserProfile().roles[0] === 'Admin' ||
                this.service.getUserProfile().roles[0] === 'User'
              "
              mat-button
              routerLink="/signings"
            >
              Mis Fichajes
            </button>
            <button
              *ngIf="
                this.service.getUserProfile().roles[0] === 'Admin' ||
                this.service.getUserProfile().roles[0] === 'User'
              "
              mat-button
              routerLink="/signing"
            >
              Fichar
            </button>
          </div>
          <div class="spacer"></div>
          <button mat-stroked-button (click)="this.service.signOut()">
            Salir
          </button>
        </mat-toolbar>

        <div id="all-content">
          <router-outlet> </router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      #buttons {
        display: flex;
        justify-content: space-evenly;
        width: 45rem;
        margin-left: 1.5rem;
      }

      .mat-nav-list a.active {
        background: #303030;
      }

      .mat-nav-list {
        width: 70vw;
        position: fixed;
      }

      #all-content {
        height: 100%;
        z-index: 10;
      }
      @media (max-width: 900px) {
        .sidenav {
          height: 100vh;
          position: fixed;
        }
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 5;
      }

      @media (max-width: 900px) {
        .toolbar-hello {
          position: fixed;
        }
        .toolbar-nav {
          position: fixed;
          top: 50px;
        }
      }

      .spacer {
        flex: 1 1 auto;
      }

      .sidenav {
        width: 70vw;
      }

      @media (min-width: 900px) {
        .sidenav,
        #burger {
          display: none;
        }
      }
      @media (max-width: 900px) {
        #buttons {
          display: none;
        }
      }
    `,
  ],
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public name = "";
  constructor(
    public service: AuthenticationService,
    public serviceS: SigningService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.name = this.service.getUserProfile().name;
    console.log(this.service.getUserProfile());
  }
}
