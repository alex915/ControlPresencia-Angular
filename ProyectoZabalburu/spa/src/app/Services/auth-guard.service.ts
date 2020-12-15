import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthenticationService } from "./auth.service";
import { Observable } from "rxjs";
import { SigningService } from './signing.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.auth.isAuthenticated()) {
      if (
        route.data.roles &&
        route.data.roles.indexOf(this.auth.getUserProfile().roles[0]) === -1
      ) {
        this.router.navigate(["/"]);
        return false;
      }
      return true;
    }
    this.router.navigate(["/"]);
    return false;
  }
}
